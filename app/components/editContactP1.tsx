import { Form, Outlet } from "react-router";
import type { Route } from "../components/+types/editContact";

import { getContact } from "../data";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return { contact };
}

export default function EditContact({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>P1</h1>
    </>
  );
}
