import type { Courts } from "~/modules/court/type";
import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";

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

export default function Home({ loaderData }: Route.ComponentProps) {
  const { courts } = loaderData;
  return (
    <div>
      <h1>Court Booking website</h1>

      <ul className="grid grid-cols-3">
        {courts.map((court) => {
          return (
            <li key={court.id}>
              <img src={court.imageUrl} alt={court.name} className="size-60" />
              <h2>{court.name}</h2>
              <Button>clickme</Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
