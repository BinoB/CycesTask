import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/login/Login";
import ListPage from "./components/pages/listPage/ListPage";
import AttractionDetail from "./components/pages/listPage/AttractionDetail";
import UserSearch from "./components/user/UserSearch";
import Dashboard from "./components/dashboard/Dashboard";
import CreateAttraction from "./components/pages/listPage/CreateAttraction";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/listpage" element={<ListPage />} />
          <Route path="/createattration" element={<CreateAttraction />} />

          
          <Route exact path="/attractions/:id" element={<AttractionDetail />} />


          <Route path="usersearch" element={<UserSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
