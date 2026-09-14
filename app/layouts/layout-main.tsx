import Cookies from "js-cookie";
import { Link, Outlet, useNavigate } from "react-router";

export default function LayoutMain() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const isLoggedIn = Boolean(token);

  function handleLogout() {
    Cookies.remove("token");
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <nav className="border-b bg-background">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <ul className="flex w-full items-center gap-8">
            <li className="mr-4">
              <Link to="/" className="text-xl font-bold tracking-tight">
                Courtly
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/courts"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Court
              </Link>
            </li>

            {isLoggedIn && (
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
              </li>
            )}

            <li className="ml-auto">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Logged in
                  </span>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-16 border-t">
        <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            &copy; {year} Court Booking
          </p>
        </div>
      </footer>
    </div>
  );
}
