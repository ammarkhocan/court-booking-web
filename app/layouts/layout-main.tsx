import Cookies from "js-cookie";
import { CircleUserRound, LayoutDashboard, LogOut } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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
              <Link to="/" className="text-2xl font-bold tracking-tight">
                Courtly
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Beranda
              </Link>
            </li>

            <li>
              <Link
                to="/courts"
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Lapangan
              </Link>
            </li>

            <li className="ml-auto flex items-center gap-3">
              {isLoggedIn && (
                <Link
                  to="/bookings"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Booking Saya
                </Link>
              )}

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-11 rounded-full"
                    >
                      <CircleUserRound className="size-6" />

                      <span className="sr-only">Buka menu pengguna</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem>
                      <Link to="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="size-4" />
                        Dasbor
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="size-4" />
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button>
                  <Link to="/login">Masuk</Link>
                </Button>
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
