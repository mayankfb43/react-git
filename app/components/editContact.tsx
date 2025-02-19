import { Form, Outlet, redirect } from "react-router";
import type { Route } from "./+types/editContact";
import { store } from "~/store";
import { updateContact } from "../data";
import { fetchContact, saveContact } from "~/features/contactSlice";

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs | Route.ActionArgs) {
  let formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  let phone = formData.get("phone");
  let catchPhrase = formData.get("notes");
  let contact = await store
    .dispatch(fetchContact({ id: params.contactId }))
    .unwrap();

  await store
    .dispatch(
      saveContact({
        id: params.contactId,
        payload: {
          ...contact,
          name,
          email,
          phone,
          company: {
            ...contact.company,
            catchPhrase: catchPhrase,
          },
        },
      })
    )
    .unwrap();
  return redirect(`/contacts/${params.contactId}`);
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  let contact = await store
    .dispatch(fetchContact({ id: params.contactId }))
    .unwrap(); // Dispatch action manually
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
            defaultValue={contact.name}
            name="name"
            placeholder="First"
            type="text"
            className="form-control"
          />
        </p>
        <label>
          <span>Twitter</span>
          <input
            defaultValue={contact.phone}
            name="email"
            placeholder="@jack"
            type="text"
            className="form-control"
          />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            aria-label="Avatar URL"
            defaultValue={contact.email}
            name="phone"
            placeholder="https://example.com/avatar.jpg"
            type="text"
            className="form-control"
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea
            defaultValue={contact.company.catchPhrase}
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
