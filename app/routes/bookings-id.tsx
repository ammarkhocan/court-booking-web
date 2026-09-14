import Cookies from "js-cookie";
import { Form, Link, redirect, useActionData } from "react-router";

import type { Route } from "./+types/bookings-id";
import { cancelBooking, getBookingById } from "~/modules/booking/service";
import { formatPrice, formatTime } from "~/lib/format";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Booking Detail" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = Cookies.get("token");

  if (!token) {
    return redirect("/login");
  }

  const booking = await getBookingById(params.id);

  return { booking };
}

export default function BookingDetailRoute({
  loaderData,
}: Route.ComponentProps) {
  const { booking } = loaderData;

  const actionData = useActionData<typeof clientAction>();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          to="/bookings"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Kembali ke My Bookings
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Booking Detail
        </h1>
      </div>

      <div className="rounded-xl border p-6">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Booking ID</p>

            <p className="mt-1 font-medium">{booking.id}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Tanggal</p>

              <p className="mt-1 font-medium">
                {new Date(booking.startTime).toLocaleDateString("id-ID")}
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
              <p className="text-sm text-muted-foreground">Total Harga</p>

              <p className="mt-1 font-medium">
                {formatPrice(booking.totalPrice)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Status</p>

              <p className="mt-1 font-medium">{booking.status}</p>
            </div>
          </div>

          {actionData?.error && (
            <p className="text-sm text-destructive">{actionData.error}</p>
          )}

          {booking.status === "CONFIRMED" && (
            <div className="border-t pt-6">
              <Form method="post">
                <input type="hidden" name="bookingId" value={booking.id} />

                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 text-sm font-medium text-white transition-colors hover:bg-destructive/90"
                >
                  Batalkan Booking
                </button>
              </Form>
            </div>
          )}

          {booking.status === "CANCELLED" && (
            <div className="border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Booking ini sudah dibatalkan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const token = Cookies.get("token");

  if (!token) {
    return redirect("/login");
  }

  const formData = await request.formData();

  const bookingId = formData.get("bookingId")?.toString();

  if (!bookingId) {
    return {
      error: "Booking ID tidak ditemukan.",
    };
  }

  try {
    await cancelBooking(bookingId);

    return redirect(`/bookings/${bookingId}`);
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Gagal membatalkan booking.",
    };
  }
}
