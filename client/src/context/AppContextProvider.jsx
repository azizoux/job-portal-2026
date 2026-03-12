import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { jobsData } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  //Function to fetch jobs data
  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  // Function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/company", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.company);
        console.log("CompanyData: ", data.company);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const checkAndAddUser = async () => {
    const response = await axios.post(backendUrl + "/api/users/check-user", {
      name: user.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      image: user?.imageUrl,
    });
    console.log("data:", response.data);
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress && user.fullName) {
      console.log({
        name: user.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        image: user?.imageUrl,
      });
      checkAndAddUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyToken]);

  const value = {
    backendUrl,
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
