import { type RouteConfig, index } from "@react-router/dev/routes";
import { route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/home.tsx", [
    route("/", "components/sidebar.tsx", [
      index("routes/welcome.tsx"),
      route("contacts", "components/contactForm.tsx"),
      route("contacts/:contactId", "components/contactViewForm.tsx"),
      route("contacts/:contactId/destroy", "components/destroyContact.tsx"),
      route("contacts/:contactId/edit", "components/editContact.tsx", [
        index("components/editContactP1.tsx"),
        route("r2", "components/editContactP2.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
