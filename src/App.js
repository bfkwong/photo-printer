import { useEffect, useState } from "react";
import { getUserType } from "./Service/queries";
import { Routes, Route, useNavigate } from "react-router-dom";

import Printer from "./Components/Printer/Printer";
import Admin from "./Components/Admin/Admin";
import Customer from "./Components/Customer/Customer";

const UnknownPage = () => (
  <div>
    <h1>{"Oops, this ain't it :("}</h1>
    <p>Refresh the page and let us bring you back to the site</p>
  </div>
);

function App() {
  const [userType, setUserType] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userTypeResp = await getUserType();
      setUserType(userTypeResp);
    })();
  }, []);

  useEffect(() => {
    navigate(`/${userType}`);
  }, [userType, navigate]);

  return (
    <Routes>
      <Route path="customer/*" element={<Customer />}></Route>
      <Route path="admin/*" element={<Admin />}></Route>
      <Route path="printer/*" element={<Printer />}></Route>
      <Route path="*" element={<UnknownPage />}></Route>
    </Routes>
  );
}

export default App;
