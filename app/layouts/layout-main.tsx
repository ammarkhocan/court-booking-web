import { Outlet } from "react-router";

export default function LayoutMain() {
  const year = new Date().getFullYear();

  return (
    <div>
      <nav>
        <h1>
          NAVBAR
          <img src="" alt="" />
        </h1>
      </nav>

      <Outlet />

      <footer>
        <p>&copy; {year} Court Booking</p>
      </footer>
    </div>
  );
}
