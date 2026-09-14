import Cookies from "js-cookie";
import { Link, redirect } from "react-router";
import type { Route } from "./+types/bookings";
import { getBookings } from "~/modules/booking/service";
import { formatPrice, formatTime } from "~/lib/format";

export function meta({}: Route.MetaArgs) {
  return [{ title: "My Bookings" }];
}

export async function clientLoader() {
  const token = Cookies.get("token");

  if (!token) {
    return redirect("/login");
  }

  const bookings = await getBookings();

  return { bookings };
}

export default function BookingsRoute({ loaderData }: Route.ComponentProps) {
  const { bookings } = loaderData;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>

        <p className="mt-2 text-muted-foreground">
          Riwayat booking lapangan kamu.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-lg border p-6">
          <p className="text-sm text-muted-foreground">Belum ada booking.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="rounded-lg border p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <p className="font-semibold">Booking #{booking.id}</p>

                  <p className="text-sm text-muted-foreground">
                    {new Date(booking.startTime).toLocaleDateString("id-ID")}
                  </p>

                  <p className="text-sm">
                    {formatTime(booking.startTime)}
                    {" - "}
                    {formatTime(booking.endTime)}
                  </p>

                  <p className="text-sm font-medium">
                    {formatPrice(booking.totalPrice)}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium">{booking.status}</span>
                  <Link
                    to={`/bookings/${booking.id}`}
                    className="inline-flex h-9 items-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
