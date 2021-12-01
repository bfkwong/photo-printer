import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { SET_USER_TYPE } from "./redux";
import Printer from "./Components/Printer/Printer";
import Admin from "./Components/Admin/Admin";
import Customer from "./Components/Customer/Customer";
import { userTypes } from "./constants";

import "./Components/Common/Common.css";

const UnknownPage = () => (
  <div>
    <h1>{"Oops, this ain't it :("}</h1>
    <p>Refresh the page and let us bring you back to the site</p>
  </div>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_USER_TYPE, payload: userTypes.PRINTER });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="customer/*" element={<Customer />}></Route>
      <Route path="admin/*" element={<Admin />}></Route>
      <Route path="printer/*" element={<Printer />}></Route>
      <Route path="*" element={<UnknownPage />}></Route>
    </Routes>
  );
}

export default withAuthenticator(App);
