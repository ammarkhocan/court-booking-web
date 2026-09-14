import { Link } from "react-router";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { formatPrice } from "~/lib/format";
import type { Courts } from "~/modules/court/type";

export function CourtsGrid({ courts }: { courts: Courts }) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courts.map((court) => (
        <li key={court.id}>
          <Card className="group h-full overflow-hidden p-0 transition-shadow hover:shadow-md">
            <Link to={`/courts/${court.id}`} className="block h-full">
              <div className="aspect-16/10 overflow-hidden bg-muted">
                <img
                  src={court.imageUrl}
                  alt={court.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <CardHeader className="space-y-3 p-5 pb-0">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">
                    {court.sportType}
                  </span>

                  <span className="text-sm font-semibold">
                    {formatPrice(court.pricePerHour)}
                    <span className="font-normal text-muted-foreground">
                      /jam
                    </span>
                  </span>
                </div>

                <h2 className="text-xl font-semibold tracking-tight">
                  {court.name}
                </h2>
              </CardHeader>

              <CardContent className="space-y-2 p-5">
                <p className="text-sm font-medium">{court.location}</p>

                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {court.description}
                </p>
              </CardContent>
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  );
}
