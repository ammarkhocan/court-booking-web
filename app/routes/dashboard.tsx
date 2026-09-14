import Cookies from "js-cookie";

import type { Route } from "./+types/dashboard";
import type { MeResponse } from "~/modules/user/type";
import { redirect } from "react-router";

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
    { headers: { Authorization: `Bearer ${token}` } },
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
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(meResponse, null, 2)}</pre>
    </div>
  );
}
