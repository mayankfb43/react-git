import { redirect } from "react-router";
import type { Route } from "./+types/destroyContact";

import { deleteContact } from "../data";

export async function action({ params }: Route.ActionArgs) {
  await deleteContact(params.contactId);
  return redirect("/contacts");
}
