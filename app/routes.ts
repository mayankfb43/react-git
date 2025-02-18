import { type RouteConfig, index } from "@react-router/dev/routes";
import { route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/home.tsx", [
    layout("components/sidebar.tsx", [
      index("routes/welcome.tsx"),
      route("contact", "components/contactForm.tsx"),
      route("contacts/:contactId/edit", "components/editContact.tsx", [
        route("r1", "components/editContactP1.tsx"),
        route("r2", "components/editContactP2.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
