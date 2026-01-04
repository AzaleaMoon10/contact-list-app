export const initialStore = () => {
  return {
    url: "https://playground.4geeks.com/contact",
    user: "myAgenda",
    error:"",
    contactInfo: null,
    contacts: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case "set-contactInfo":
      return { ...store, contactInfo: action.payload };
    case "set-contacts":
      return { ...store, contacts: action.payload };
    case "set-error":
      return { ...store, error: action.payload };
    default:
      return store;
  }
}