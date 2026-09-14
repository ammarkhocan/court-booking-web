import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout-main.tsx", [
    index("routes/home.tsx"),
    route("/courts", "routes/courts.tsx"),
    route("/courts/{:id}", "routes/courts-id.tsx"),
    route("/register", "routes/register.tsx"),
    route("/login", "routes/login.tsx"),
    route("/dashboard", "routes/dashboard.tsx"),

    // route("/court", "routes/court.tsx"),
  ]),
] satisfies RouteConfig;
