import { type RouteConfig, index } from "@react-router/dev/routes";

import { route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/home.tsx", [
    index("routes/welcome.tsx"),
    route("contact", "routes/contactForm.tsx"),
    route("sidebar", "routes/sidebar.tsx"),
  ]),
] satisfies RouteConfig;
