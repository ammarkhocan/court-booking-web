import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { formatPrice } from "~/lib/format";
import type { Courts } from "~/modules/court/type";

export function CourtsGrid({ courts }: { courts: Courts }) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courts.map((court) => (
        <li key={court.id}>
          <Card className="overflow-hidden">
            <Link
              to={`/courts/${court.id}`}
              className="block transition-opacity hover:opacity-95"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={court.imageUrl}
                  alt={court.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">
                    {court.sportType}
                  </span>

                  <span className="text-sm font-medium">
                    {formatPrice(court.pricePerHour)}/jam
                  </span>
                </div>

                <h2 className="text-xl font-semibold">{court.name}</h2>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {court.location}
                </p>

                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {court.description}
                </p>
              </CardContent>
            </Link>

            <CardFooter>
              <Link
                to={`/courts/${court.id}`}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Lihat Detail
              </Link>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
