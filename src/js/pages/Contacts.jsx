import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../context/AppContext.jsx";

export const Contacts = () => {
    const { store, dispatch } = useGlobalReducer();

    const deleteContact = (id) => {
        fetch(`${store.url}/agendas/${store.user}/contacts/${id}`, {
        method: "DELETE"
        })
        .then(response => {
            if (response.status === 204) {
                dispatch({type: "set-contacts", payload: store.contacts.filter(contact => contact.id !== id)});
            }
        });
    };
    return (
            <div className="container ">
                <ul className="contact-list">
                    {store.contacts.map((item) => (
                        <li className="d-flex align-items-center mx-auto w-50" key={item.id}>
                            <img src={`https://randomuser.me/api/portraits/men/${item.id}.jpg`} className="object-fit-contain border rounded" alt={item.name}/>
                            <div className="ms-2">
                                <p>{item.name}</p>
                                <p>{item.phone}</p>
                            </div>
                            <div className="ms-2">
                                <p>{item.email}</p>
                                <p>{item.address}</p>
                            </div>
                            <div className="d-flex m-3 justify-content-around">
                                <Link to="/" className="btn"onClick={() => {dispatch({ type: "set-contactInfo", payload: item });}}>Edit</Link>
                                <button href="#" className="btn" onClick={() => deleteContact(item.id)}>Delete</button>
                            </div>
                        </li>
                    ))}    
                </ul>
            </div>
    );
};