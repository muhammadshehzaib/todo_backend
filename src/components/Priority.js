import React, { useState, useEffect } from "react";
export default function Priority() {
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortedTasks, setSortedTasks] = useState([]);

  useEffect(() => {
    fetch(
      "https://dictionary-application-with-image-uploader.vercel.app/get-all-notes"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSortedTasks(data.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handlePriorityChange = (e) => {
    const selectedPriority = e.target.value;
    const selectedTaskId = sortedTasks[0]._id;
    setPriorityFilter(selectedPriority);

    const updatedTasks = sortedTasks.map((task) =>
      task._id === selectedTaskId
        ? { ...task, Priority: selectedPriority }
        : task
    );
    setSortedTasks(updatedTasks);

    fetch(
      `https://dictionary-application-with-image-uploader.vercel.app/updatenotes/${selectedTaskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Priority: selectedPriority }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Priority updated successfully");
      })
      .catch((error) => console.error("Error updating priority:", error));
  };

  return (
    <div className="flex flex-col dark:text-black">
      <select
        id="priorityFilter"
        name="priorityFilter"
        value={priorityFilter}
        onChange={handlePriorityChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
