import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { jobsData } from "../assets/assets";

export const AppContextProvider = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  //Function to fetch jobs data
  const fetchJobs = async () => {
    setJobs(jobsData);
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
