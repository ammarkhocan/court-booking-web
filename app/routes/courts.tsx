import type { Courts } from "~/modules/court/type";
import type { Route } from "./+types/courts";
import { CourtsGrid } from "~/modules/court/components/courts-grid";

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
  const courts: Courts = await response.json();
  return { courts };
}

export default function CourtsRoute({ loaderData }: Route.ComponentProps) {
  const { courts } = loaderData;
  return (
    <div>
      <section>
        <CourtsGrid courts={courts} />
      </section>
    </div>
  );
}
