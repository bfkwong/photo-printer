import { useEffect, useState } from "react";
import { getUserType } from "./Service/queries";
import { Routes, Route, useNavigate } from "react-router-dom";

const UnknownPage = () => (
  <div>
    <h1>{"Oops, this ain't it :("}</h1>
    <p>Refresh the page and let us bring you back to the site</p>
  </div>
);

const PageElement = () => <div>Hello world</div>;

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
      <Route path="customer" element={<PageElement />}></Route>
      <Route path="admin" element={<PageElement />}></Route>
      <Route path="printer" element={<PageElement />}></Route>
      <Route path="*" element={<UnknownPage />}></Route>
    </Routes>
  );
}

export default App;
