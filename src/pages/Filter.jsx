import React from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";

const Filter = () => {
  useUser();
  return <Dashboard activeMenu="Filter">Filter</Dashboard>;
};

export default Filter;
