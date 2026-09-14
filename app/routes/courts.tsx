import type { Courts } from "~/modules/court/type";
import type { Route } from "./+types/courts";
import { CourtsGrid } from "~/modules/court/components/courts-grid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Courts | Courtly" },
    {
      name: "description",
      content: "Find and book your favorite sports court.",
    },
  ];
}

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/courts`,
  );

  if (!response.ok) {
    throw new Response("Failed to fetch courts", {
      status: response.status,
    });
  }

  const courts: Courts = await response.json();

  return { courts };
}

export default function CourtsRoute({ loaderData }: Route.ComponentProps) {
  const { courts } = loaderData;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Explore Courts
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Find your next court
          </h1>

          <p className="text-muted-foreground">
            Browse available sports courts and find the right place for your
            next game.
          </p>
        </div>

        {courts.length > 0 ? (
          <CourtsGrid courts={courts} />
        ) : (
          <div className="rounded-xl border border-dashed px-6 py-16 text-center">
            <h2 className="font-semibold">No courts available</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              There are currently no courts available to book.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
