import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Components/Home/Home";
import AddContacts from "../Pages/AddContacts/AddContacts";
import AllContacts from "../Pages/AllContacts/AllContacts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/AddContacts", element: <AddContacts /> },
      { path: "/AllContacts", element: <AllContacts /> },
    ],
  },
]);
