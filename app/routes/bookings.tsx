import Cookies from "js-cookie";
import { Link, redirect } from "react-router";
import type { Route } from "./+types/bookings";
import { getBookings } from "~/modules/booking/service";
import { formatPrice, formatTime } from "~/lib/format";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Booking Saya" }];
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
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-muted-foreground">
          Riwayat Booking
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">Booking Saya</h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          Lihat semua riwayat booking lapangan yang pernah kamu buat.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="font-medium">Belum ada booking</p>

          <p className="mt-2 text-sm text-muted-foreground">
            Booking lapangan yang kamu buat akan muncul di halaman ini.
          </p>

          <Link
            to="/courts"
            className="mt-5 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Cari Lapangan
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-sm sm:p-6"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">Booking ID</p>

                    <p className="mt-1 truncate text-sm font-medium">
                      {booking.id}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Tanggal</p>

                      <p className="mt-1 font-medium">
                        {new Date(booking.startTime).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Waktu</p>

                      <p className="mt-1 font-medium">
                        {formatTime(booking.startTime)}
                        {" - "}
                        {formatTime(booking.endTime)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>

                      <p className="mt-1 font-medium">
                        {formatPrice(booking.totalPrice)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-t pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
                  <span className="text-sm font-semibold">
                    {booking.status}
                  </span>

                  <Link
                    to={`/bookings/${booking.id}`}
                    className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-muted"
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
