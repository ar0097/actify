import React from "react";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";
import { FaList } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import Addnewdata from "./components/Addnewdata";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <div className="tabs">
          <div className="tabs-contact">
            <FaList />

            <p>Contact</p>
          </div>
          <div className="tabs-create">
            <MdCreate />

            <p>Create</p>
          </div>
        </div>
        <Table />
        <Addnewdata />
      </div>
    </div>
  );
}

export default App;
