import React, { useState, useEffect } from "react";
import updateTask from ".././images/pencil-svgrepo-com.svg";
import removeTask from ".././images/recycle-bin-svgrepo-com.svg";
import Priority from "./Priority";

export default function Todo({
  todo,
  toggleTodo,
  handleDeleteTodos,
  handleupdateTodos,
  handleCheckboxChange,
  handlePriorityChange,
  tasks,
}) {
  const [sortedTasks, setSortedTasks] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");
  useEffect(() => {
    setSortedTasks([todo]);
  }, [todo]);

  useEffect(() => {
    setSelectedPriority(todo.Priority);
  }, [todo.Priority]);
  const handleLocalPriorityChange = (taskId, newPriority) => {
    setSelectedPriority(newPriority);
    handlePriorityChange(taskId, newPriority);
  };
  const handleDueDateChange = async (taskId, newDueDate) => {
    try {
      const updatedTasks = sortedTasks.map((task) =>
        task._id === taskId ? { ...task, dueDate: newDueDate } : task
      );

      setSortedTasks(updatedTasks);

      const response = await fetch(
        `https://dictionary-application-with-image-uploader.vercel.app/updatenotes/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dueDate: newDueDate }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Due date updated successfully");
    } catch (error) {
      console.error("Error updating due date:", error);
    }
  };

  const handleReminderChange = async (taskId, newReminder) => {
    try {
      const updatedTasks = sortedTasks.map((task) =>
        task._id === taskId ? { ...task, reminder: newReminder } : task
      );

      setSortedTasks(updatedTasks);

      const response = await fetch(
        `https://dictionary-application-with-image-uploader.vercel.app/updatenotes/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reminder: newReminder }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Reminder updated successfully");
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

  function formatDate(date) {
    return date ? date.split("T")[0] : "";
  }

  function formatDateTime(dateTime) {
    return dateTime ? dateTime.split("Z")[0] : "";
  }
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-blue-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-gray-300 dark:border-gray-700 rounded-md overflow-hidden shadow-md">
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 flex-col md:flex-row gap-3">
          <div className="ml-3 text-lg font-semibold">{todo.name}</div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(todo._id, !todo.Completed)}
              className="text-green-500"
            />
            <img
              src={updateTask}
              alt=""
              onClick={() => handleupdateTodos(todo._id)}
              className="cursor-pointer"
            />
            <img
              src={removeTask}
              alt=""
              onClick={() => handleDeleteTodos(todo._id)}
              className="cursor-pointer"
            />
          </div>
          <Priority
            taskId={todo._id}
            currentPriority={todo.Priority}
            handlePriorityChange={handleLocalPriorityChange}
          />
        </div>
      </div>

      <span
        className={`text-white text-sm py-1 px-3 rounded-full w-[50%] md:w-[25%]  flex items-center justify-center ${getPriorityColor(
          selectedPriority
        )}`}
      >
        {selectedPriority}
      </span>
      <div className="flex flex-col md:flex-row gap-8 p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
        <div className="relative">
          <label
            htmlFor="dueDate"
            className="text-gray-600 dark:text-gray-400 text-sm"
          >
            Due Date
          </label>
          <input
            id="dueDate"
            className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="date"
            value={formatDate(todo.dueDate)}
            onChange={(e) => handleDueDateChange(todo._id, e.target.value)}
          />
        </div>
        <div className="relative">
          <label
            htmlFor="reminder"
            className="text-gray-600 dark:text-gray-400 text-sm"
          >
            Reminder
          </label>
          <input
            id="reminder"
            className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="datetime-local"
            value={formatDateTime(todo.reminder)}
            onChange={(e) => handleReminderChange(todo._id, e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          Due Date: {formatDate(todo.dueDate)}
        </span>
        <span className="text-gray-600 dark:text-gray-400 text-sm mb-8">
          Reminder: {formatDateTime(todo.reminder)}
        </span>
      </div>
    </div>
  );
}
