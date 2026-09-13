import { Link, Outlet } from "react-router";

export default function LayoutMain() {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col">
      <nav>
        <ul className="flex gap-10 items-center">
          <li>
            <h1>LOGO</h1>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courts">Court</Link>
          </li>
          <li>
            <Link to="/booking">Booking</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
        </ul>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer>
        <p>&copy; {year} Court Booking</p>
      </footer>
    </div>
  );
}
