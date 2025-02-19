import { Form, Link, NavLink, Outlet, useNavigation } from "react-router";
import { getContacts } from "../data";
import type { Route } from "../components/+types/sidebar";
import { fetchContacts } from "~/features/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store"; // Adjust path to your store
import { useEffect } from "react";
import { store } from "../store/index";

export async function clientLoader() {
  let contacts = await store.dispatch(fetchContacts()).unwrap(); // Dispatch action manually
  return { contacts };
}

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const { contacts } = loaderData;

  //const { contacts } = loaderData;
  return (
    <div style={{ display: "flex", backgroundColor: "green" }}>
      <div id="sidebar">
        <h1>
          <Link to="about">React Router Contacts</Link>
        </h1>
        <div>
          <Form id="search-form" role="search">
            <input
              aria-label="Search contacts"
              id="q"
              name="q"
              placeholder="Search"
              type="search"
            />
            <div aria-hidden hidden={true} id="search-spinner" />
          </Form>
          <Form method="post" id="new-contact-form">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts && contacts.length ? (
            <ul>
              {contacts.map((contact: any) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    style={{ color: "black" }}
                  >
                    {contact.name ? (
                      <>
                        <p>{contact.name}</p>
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite ? <span>★</span> : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </div>
  );
}
