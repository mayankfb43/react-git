import { Form, Outlet, redirect } from "react-router";
import type { Route } from "./+types/editContact";
import { store } from "~/store";
import { updateContact } from "../data";
import { fetchContact, saveContact } from "~/features/contactSlice";

export async function clientAction({ params, request }: Route.ActionArgs) {
  await store
    .dispatch(
      saveContact({
        id: params.contactId,
        payload: {
          id: 1,
          name: "Leanne Graham 222",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
        },
      })
    )
    .unwrap(); // Dispatch action manually
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
            name="first"
            placeholder="First"
            type="text"
            className="form-control"
          />
        </p>
        <label>
          <span>Twitter</span>
          <input
            defaultValue={contact.phone}
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
            defaultValue={contact.email}
            name="avatar"
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
