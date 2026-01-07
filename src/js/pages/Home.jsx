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

  return (
    <div>
      <div className="container mt-5">
        <div className="container text-center">
          <Link to="/Update" className="btn link-home add-contact">Añadir nuevo contacto</Link>
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