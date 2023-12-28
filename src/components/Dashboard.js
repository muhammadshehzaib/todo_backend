import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar/Navbar";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [summary, setSummary] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `https://dictionary-application-with-image-uploader-axw8u8mmp.vercel.app/get-summary`,

          {
            method: "GET",
          }
        );
        const data = await response.json();

        setSummary(data);
        // console.log(data);
        setIsLoading(false); // Hide loading screen
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();
  }, []);
  return (
    <div className="min-h-screen text-slate-900 dark:bg-slate-900 dark:text-slate-200 w-full max-h-max h-full">
      <Navbar SignIn="SignIn" Logout="Logout" />

      <div className="container mx-auto mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4">Welcome, !</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Total Tasks */}
          <div className="bg-blue-200 dark:bg-blue-800 p-4 rounded-md">
            <p className="text-xl font-semibold text-blue-800 dark:text-blue-200">
              Total Tasks
            </p>
            <p className="text-2xl">{summary.totalTasks}</p>
          </div>

          {/* Card 2: Completed Tasks */}
          <div className="bg-green-200 dark:bg-green-800 p-4 rounded-md">
            <p className="text-xl font-semibold text-green-800 dark:text-green-200">
              Completed Tasks
            </p>
            <p className="text-2xl">{summary.completedTasks}</p>
          </div>

          {/* Card 3: Pending Tasks */}
          <div className="bg-yellow-200 dark:bg-yellow-800 p-4 rounded-md">
            <p className="text-xl font-semibold text-yellow-800 dark:text-yellow-200">
              Pending Tasks
            </p>
            <p className="text-2xl">{summary.pendingTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
