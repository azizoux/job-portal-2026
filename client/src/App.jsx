import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";

import { AppContext } from "./context/AppContext";

const App = () => {
  const { searchFilter } = useContext(AppContext);
  console.log({ searchFilter });

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </div>
  );
};

export default App;
