import { Form, Outlet, redirect } from "react-router";
import type { Route } from "../components/+types/editContact";

import { getContact, updateContact } from "../data";

export async function action({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}/edit/r2`);
}

export async function loader({ params }: Route.LoaderArgs) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return { contact };
}

export default function EditContact({ loaderData }: Route.ComponentProps) {
  const { contact } = loaderData;

  return (
    <>
      <Form key={contact.id} id="contact-form" method="post">
        <p>
          <span>Name</span>
          <input
            aria-label="First name"
            defaultValue={contact.first}
            name="first"
            placeholder="First"
            type="text"
          />
          <input
            aria-label="Last name"
            defaultValue={contact.last}
            name="last"
            placeholder="Last"
            type="text"
            className="form-control"
          />
        </p>
        <label>
          <span>Twitter</span>
          <input
            defaultValue={contact.twitter}
            name="twitter"
            placeholder="@jack"
            type="text"
            className="form-control"
          />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            aria-label="Avatar URL"
            defaultValue={contact.avatar}
            name="avatar"
            placeholder="https://example.com/avatar.jpg"
            type="text"
            className="form-control"
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea
            defaultValue={contact.notes}
            name="notes"
            rows={6}
            className="form-control"
          />
        </label>
        <p>
          <button type="submit" className="form-control">
            Save
          </button>
          <button type="button" className="form-control">
            Cancel
          </button>
        </p>
      </Form>
      <Outlet />
    </>
  );
}
