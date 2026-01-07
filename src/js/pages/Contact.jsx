import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../context/AppContext.jsx";

export const SingleContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();

  const singleContact = store.contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  if (!singleContact) {
    return (
      <div className="container text-center mt-5">
        <h2>Your contact does no exist</h2>
        <Link to="/" className="btn m-3">Back to Contacts</Link>
      </div>
    );
  }

  return (
      <div className="container d-flex justify-content-center mt-5 mb-5">
        <div className="card">
          <img
            src={`https://randomuser.me/api/portraits/men/${singleContact.id}.jpg`}
            className="card-img"
            alt={singleContact.name}
          />

          <div className="card-body text-center">
            <h2 className="card-title display-6">{singleContact.name}</h2>
            <p className="card-text mt-3 fs-4">
            {singleContact.email}
              <br />
            {singleContact.phone}
              <br />
            {singleContact.address}
            </p>
            <div className="d-flex justify-content-around gap-2">
              <Link to={`/update/${singleContact.id}`} className="btn link-home" onClick={() => 
                { dispatch({ type: "set-contactInfo", payload: singleContact});}}>
                    Edit
              </Link>
            </div>
            <div className="d-flex justify-content-center gap-2 ">
              <Link to="/index" className="btn link-home">Back to Contacts</Link>
            </div>
          </div>
        </div>
      </div>
  );
};