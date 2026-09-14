import { Link } from "react-router";

import type { Courts } from "~/modules/court/type";
import type { Route } from "./+types/home";
import { CourtsGrid } from "~/modules/court/components/courts-grid";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Court Booking" },
    {
      name: "description",
      content: "Book your favorite sports court quickly and easily.",
    },
  ];
}

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/courts`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch courts");
  }

  const courts: Courts = await response.json();

  return { courts };
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  const { courts } = loaderData;

  const featuredCourts = courts.slice(0, 3);

  return (
    <div>
      <section className="border-b">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-medium text-muted-foreground">
              Court Booking
            </p>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Booking lapangan jadi lebih mudah dan cepat.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Temukan lapangan favoritmu, cek ketersediaan jadwal, dan lakukan
              booking dengan mudah dalam satu tempat.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg">
                <Link to="/courts">Lihat Lapangan</Link>
              </Button>

              <Button size="lg" variant="outline">
                <Link to="/bookings">My Bookings</Link>
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden p-0">
            <CardContent className="p-0">
              <img
                src={
                  "https://lre3izfqrx.ucarecd.net/c21d7cb1-602f-4387-b23c-84fa93c719cf/-/preview/1000x955/"
                }
                alt={featuredCourts[0]?.name ?? "Sports court"}
                className="aspect-4/3 h-full w-full object-cover"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Pilihan Lapangan
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Lapangan yang tersedia
            </h2>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Pilih lapangan yang sesuai dengan kebutuhanmu dan cek jadwal yang
              tersedia.
            </p>
          </div>

          <Button variant="outline">
            <Link to="/courts">Lihat Semua</Link>
          </Button>
        </div>

        {featuredCourts.length > 0 ? (
          <CourtsGrid courts={featuredCourts} />
        ) : (
          <div className="rounded-lg border p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Belum ada lapangan tersedia.
            </p>
          </div>
        )}
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Langkah 1</p>

                <h3 className="mt-2 text-lg font-semibold">Pilih Lapangan</h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Lihat daftar lapangan dan pilih yang paling sesuai dengan
                  kebutuhanmu.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Langkah 2</p>

                <h3 className="mt-2 text-lg font-semibold">Cek Jadwal</h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Pilih tanggal dan cek waktu yang sudah dipesan sebelum membuat
                  booking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Langkah 3</p>

                <h3 className="mt-2 text-lg font-semibold">Booking</h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Login, pilih waktu mulai dan selesai, lalu konfirmasi booking
                  lapanganmu.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
