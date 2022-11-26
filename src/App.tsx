import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import RequestTable from "./components/RequestTable";
import Header from "./components/Header";
// import Table from './components/Table';

const route = [
  {
    path: "a",
    element: <div>Hello</div>,
  },
  {
    path: "request/:page",
    element: <RequestTable />,
  },
];

function App() {
  const [count, setCount] = useState(0);

  const headers = ["Creator ID", "Subscriber ID", "Status"];
  const data = [
    ["1", "5", "PENDING"],
    ["2", "7", "ACCEPTED"],
    ["3", "9", "REJECTED"],
  ];

  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
}

export default App;

export { route };
