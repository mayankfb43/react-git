import { Form } from "react-router";
import { getContact } from "../data";
import type { Route } from "./+types/contactViewForm";
import { store } from "~/store";
import type { ContactRecord } from "../data";
import { fetchContact } from "~/features/contactSlice";

export async function clientLoader({ params }: Route.LoaderArgs) {
  let contact = await store
    .dispatch(fetchContact({ id: params.contactId }))
    .unwrap(); // Dispatch action manually
  return { contact };
}

export default function Contact({ loaderData }: Route.ComponentProps) {
  const { contact } = loaderData;

  return (
    <div id="contact">
      <div></div>

      <div>
        <h1>
          <>{contact.name}</>
        </h1>

        {contact.notes ? <p>{contact.email}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: Pick<ContactRecord, "favorite"> }) {
  const favorite = contact.favorite;

  return (
    <Form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
