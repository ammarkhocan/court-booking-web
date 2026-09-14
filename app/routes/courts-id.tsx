import { Form } from "react-router";
import { formatPrice, formatTime } from "~/lib/format";
import {
  getCourtAvailability,
  getCourtById,
} from "~/modules/court/services/court-service";
import type { CourtAvailability } from "~/modules/court/type";
import type { Route } from "./+types/courts-id";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Court Details" },
    {
      name: "description",
      content: "Book your favorite sports court quickly and easily.",
    },
  ];
}

export async function clientLoader({
  params,
  request,
}: Route.ClientLoaderArgs) {
  const id = params.id;

  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  const court = await getCourtById(id);

  let availability: CourtAvailability | null = null;

  if (date) {
    availability = await getCourtAvailability(id, date);
  }

  return {
    court,
    availability,
    selectedDate: date,
  };
}

export default function CourtsRoute({ loaderData }: Route.ComponentProps) {
  const { court, availability, selectedDate } = loaderData;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-muted">
          <img
            src={court.imageUrl}
            alt={court.name}
            className="aspect-4/3 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {court.sportType}
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {court.name}
              </h1>

              <p className="text-muted-foreground">{court.location}</p>
            </div>

            <p className="text-2xl font-semibold">
              {formatPrice(court.pricePerHour)}

              <span className="ml-1 text-base font-normal text-muted-foreground">
                /jam
              </span>
            </p>

            <div className="border-t pt-6">
              <h2 className="mb-2 text-lg font-semibold">Deskripsi</h2>

              <p className="leading-relaxed text-muted-foreground">
                {court.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 border-t pt-10">
        <div className="max-w-2xl">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Cek Ketersediaan
            </h2>

            <p className="text-sm text-muted-foreground">
              Pilih tanggal untuk melihat jadwal lapangan.
            </p>
          </div>

          <Form method="get" className="mt-6 flex items-end gap-3">
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="date" className="text-sm font-medium">
                Tanggal
              </label>

              <input
                id="date"
                name="date"
                type="date"
                defaultValue={selectedDate ?? ""}
                className="h-10 rounded-md border bg-background px-3 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              Cek Jadwal
            </button>
          </Form>

          {availability && (
            <div className="mt-8">
              <h3 className="font-semibold">Jadwal yang sudah dipesan</h3>

              {availability.bookedSlots.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {availability.bookedSlots.map((slot) => (
                    <li
                      key={`${slot.startTime}-${slot.endTime}`}
                      className="flex items-center justify-between rounded-lg border px-4 py-3"
                    >
                      <span className="text-sm">
                        {formatTime(slot.startTime)}
                        {" - "}
                        {formatTime(slot.endTime)}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        Sudah dipesan
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  Belum ada booking pada tanggal ini.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
