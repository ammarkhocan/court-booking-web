import Cookies from "js-cookie";
import { redirect } from "react-router";

import type { Route } from "./+types/dashboard";
import type { MeResponse } from "~/modules/user/type";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export async function clientLoader() {
  const token = Cookies.get("token");

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    Cookies.remove("token");
    return redirect("/login");
  }

  const meResponse: MeResponse = await response.json();

  return { meResponse };
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  const { meResponse } = loaderData;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10">
        <p className="text-sm font-medium text-muted-foreground">Dashboard</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Selamat datang, {meResponse.fullName}
        </h1>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Informasi Akun</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Nama Lengkap</p>

                <p className="mt-1 font-medium">{meResponse.fullName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Username</p>

                <p className="mt-1 font-medium">@{meResponse.username}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>

                <p className="mt-1 font-medium">{meResponse.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Bergabung Sejak</p>

                <p className="mt-1 font-medium">
                  {new Date(meResponse.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
