import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
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

  const [userData, setUserData] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  //Function to fetch jobs data
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/jobs");
      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  // Function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/company", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.company);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  // Function to get user Token and Insert user in DB

  const fetchUserToken = async () => {
    const { data } = await axios.post(backendUrl + "/api/users/check-user", {
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      image: user?.imageUrl,
    });
    if (data.success) {
      setUserToken(data.token);
      localStorage.setItem("userToken", data.token);
      if (localStorage.getItem("companyToken")) {
        localStorage.removeItem("companyToken");
      }
    } else {
      toast.error(data.message);
    }
  };

  // Funtion to get user Data
  const fetchUserData = async () => {
    try {
      if (userToken) {
        const { data } = await axios.get(backendUrl + "/api/users/user", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (data.success) {
          setUserData(data.user);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  // Function to fetch user's applied applications data
  const fetchUserApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/users/applications", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (data.success) {
        setUserApplications(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserToken();
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }

    const storedUserToken = localStorage.getItem("userToken");
    if (storedUserToken) {
      setUserToken(storedUserToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    userToken,
    setUserToken,
    fetchUserData,
    fetchUserApplications,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
