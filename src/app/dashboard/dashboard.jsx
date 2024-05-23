import React from "react";
import Cards from "./Cards";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col justify-evenly">
        <h2 className="font-bold">Dashboard</h2>
        <Cards />
      </div>
    </>
  );
};

export default Dashboard;
