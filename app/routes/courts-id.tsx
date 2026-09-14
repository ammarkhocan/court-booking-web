import type { Court } from "~/modules/court/type";
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

export async function clientLoader({ params }: Route.ClientActionArgs) {
  const id = params.id;

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/courts/${id}`,
  );
  const court: Court = await response.json();
  return { court };
}

export default function CourtsRoute({ loaderData }: Route.ComponentProps) {
  const { court } = loaderData;
  return (
    <div>
      <section>
        <pre>{JSON.stringify(court, null, 2)}</pre>
      </section>
    </div>
  );
}
