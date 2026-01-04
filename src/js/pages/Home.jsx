import useGlobalReducer from "../context/AppContext.jsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Contacts } from "./Contacts.jsx";

const placeHolders = [
    {
      name: "pepo",
      phone: "75675675675",
      email: "asdasdasd@hgfadf",
      address: "calle pope",
      id: 0
    },
    {
      name: "pope",
      phone: "234234234234",
      email: "asdasdasd@asdasd",
      address: "calle pepo",
      id: 1
    }
];

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchContacts = async () => {
        const response = await fetch(`${store.url}/agendas/${store.user}`);
        if (response.ok) {
          const data = await response.json();
          if (data.contacts.length !== 0) {
            dispatch({ type: "set-contacts", payload: data.contacts });
            console.log("+++++++++++++++++")
          } else {;
            console.log("--------")
            await placeHolders.map(item => 
              fetch(`${store.url}/agendas/${store.user}/contacts/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item)
              }) 
            )
          }
        } else if (response.status === 404) {
          await fetch(`${store.url}/agendas/${store.user}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
        }
      };
    fetchContacts();
    }, []);

  const addContact = () => {
    fetch( {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
            })
        })
        .then(response => response.json())
        .then(result => {
        });
}

  return (
    <div>
      <div className="container mt-5">
        <div className="container text-center">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalContact">Add new Contact</button>
          <div class="modal fade" id="modalContact" tabindex="-1" aria-labelledby="modalContactLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="modalContactLabel">Modal title</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form action="">
                    <div class="mb-3">
                      <label for="Add-contact-form" class="form-label">Name</label>
                      <input type="text" class="form-control" id="name" placeholder="Their name" />
                    </div>
                    <div class="mb-3">
                      <label for="Add-contact-form" class="form-label">Email address</label>
                      <input type="email" class="form-control" id="email" placeholder="Their email" />
                    </div>
                    <div class="mb-3">
                      <label for="Add-contact-form" class="form-label">Phone number</label>
                      <input type="text" class="form-control" id="phone" placeholder="Their phone" />
                    </div>
                    <div class="mb-3">
                      <label for="Add-contact-form" class="form-label">Address</label>
                      <input type="text" class="form-control" id="Address" placeholder="Their address"/>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" onClick={(() => addContact())}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <div className="row">
          <Contacts />
        </div>
      </div>
    </div>
  );
};