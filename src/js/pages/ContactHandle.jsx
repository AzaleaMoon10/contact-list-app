import React, { useState, useEffect} from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import useGlobalReducer from "../context/AppContext.jsx"


export const UpdateContact = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [titleName, setTitleName] = useState("");

    const createContact = (payload) => {
        fetch(`${store.url}/agendas/${store.user}/contacts/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
            .then((resp) => resp.json())
            .then((data) => {
                dispatch({type: "set-contacts", payload: [...store.contacts, payload]})
            })
            .catch((error) => console.log(error));
    }

    const editContact = (id, contact) => {
        fetch(`${store.url}/agendas/${store.user}/contacts/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((data) => {
            if (data) {
                dispatch({ type: "set-contactInfo", payload: store.contacts.map(contact =>
                contact.id === data.id ? { ...contact, ...data } : contact)});
            }
        })
        .catch((error) => console.log(error));
    }

    const saveContact = (e) => {
        e.preventDefault()
        if (name.trim() === "" || phone.trim() === "" || email.trim() === "" || address.trim() === "") {
            alert("Empty fields")
            return null
        }

        const payload = {
            name: name,
            phone: phone,
            email: email,
            address: address
        };

        if (!id) {
            createContact(payload);
        } else {
            console.log(id);
            editContact(id, payload);
        }

        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        alert("Contact saved");
        navigate("/index")
    }

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const thisContact = store.contacts.find(item => item.id == id);
            setName(thisContact.name);
            setPhone(thisContact.phone);
            setEmail(thisContact.email);
            setAddress(thisContact.address);  
        }
        if(!titleName.length > 0) {
            setTitleName(name);
        }

    }, [id, store.contacts])


    return (
        <div className="container contact-form">
            <h1 className="text-center">{!id ? "Add a New Contact" : `Editing Contact: ${titleName}`}</h1>
            <form className="container" onSubmit={saveContact}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Full name" onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" placeholder="Enter phone" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput4" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter address" onChange={(e) => setAddress(e.target.value)} value={address} required />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn link-home save" >Save</button>
                </div>
            </form>
            <Link className="btn link-home"to="/index">Back to Contacts</Link>
        </div>
    );
};
