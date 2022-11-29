import "./App.css";
import { Outlet } from "react-router-dom";
import RequestTable from "./components/RequestTable";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./components/Home";
import SongPage from "./components/Song";
import ManageSong from "./components/List";
// import Table from './components/Table';

const route = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "request/:page",
    element: <RequestTable />,
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "register",
    element: <RegisterForm />,
  },
  {
    path: "music",
    element: <></>,
    path: "addSong",
    element: <SongPage />,
  },
  {
    path: "manageSong",
    element: <ManageSong />,
  },
];

function App() {
  return (
    <>
      <Header></Header>
      <div className="mt-28 flex items-center flex-col text-white">
        <Outlet />
      </div>
    </>
  );
}

export default App;

export { route };
