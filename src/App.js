import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Auth from "@aws-amplify/auth";

import { SET_ALL_ORDERS, SET_COG_USERID, SET_COMPLETED_FTU, SET_USER_INFO, SET_USER_TYPE } from "./redux";
import Printer from "./Components/Printer/Printer";
import Admin from "./Components/Admin/Admin";
import Customer from "./Components/Customer/Customer";
import { userTypes } from "./constants";

import "./Components/Common/Common.css";
import { getAllOrders, getUserInfo } from "./Service/queries";
import FTU from "./Components/FTU/FTU";

const UnknownPage = () => (
  <div>
    <h1>{"Oops, this ain't it :("}</h1>
    <p>Refresh the page and let us bring you back to the site</p>
  </div>
);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const cogUserId = await Auth.currentSession();
      dispatch({ type: SET_COG_USERID, payload: cogUserId?.idToken?.payload["cognito:username"] });
    })();

    (async () => {
      const allOrdersResp = await getAllOrders();
      dispatch({ type: SET_ALL_ORDERS, payload: allOrdersResp !== "ERROR" ? allOrdersResp : [] });
    })();

    (async () => {
      const userInfo = await getUserInfo();
      dispatch({ type: SET_COMPLETED_FTU, payload: !(userInfo.FirstName === "") });
      dispatch({ type: SET_USER_INFO, payload: userInfo });

      if (userInfo.AccessLevel === "customer") {
        dispatch({ type: SET_USER_TYPE, payload: userTypes.CUSTOMER });
      } else if (userInfo.AccessLevel === "printer") {
        dispatch({ type: SET_USER_TYPE, payload: userTypes.PRINTER });
      } else {
        dispatch({ type: SET_USER_TYPE, payload: userTypes.ADMIN });
      }

      if (userInfo.FirstName === "") {
        navigate("/ftu");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route index element={<Navigate to="/customer" />}></Route>
      <Route path="ftu" element={<FTU />}></Route>
      <Route path="customer/*" element={<Customer />}></Route>
      <Route path="admin/*" element={<Admin />}></Route>
      <Route path="printer/*" element={<Printer />}></Route>
      <Route path="*" element={<UnknownPage />}></Route>
    </Routes>
  );
}

export default withAuthenticator(App);
