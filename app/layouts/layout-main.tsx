import { Link, Outlet } from "react-router";

export default function LayoutMain() {
  const year = new Date().getFullYear();

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

            <li>
              <Link
                to="/booking"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Booking
              </Link>
            </li>

            <li className="ml-auto">
              <Link
                to="/login"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Login
              </Link>
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
