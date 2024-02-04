import React, { useState } from "react";
import { FormData, Task } from "../../types/tasks";

import axios from "axios";
import { CONSTANTS, initialFormData } from "../../constants";
import styles from "./styles.module.css";

interface IProps {
  task: Task;
  fetchAllTasks: () => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdating: boolean;
}

const TaskCard: React.FC<IProps> = ({
  task,
  fetchAllTasks,
  setFormData,
  setIsUpdating,
  isUpdating,
}) => {
  const [editId, setEditId] = useState<string>("");

  const deleteTaskHandler = async () => {
    try {
      const response = await axios.delete(
        `${CONSTANTS.API_URL}/${CONSTANTS.DELETE_TASK}?_id=${task._id}`
      );

      if (response.status === 200) {
        fetchAllTasks();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const updateTaskHandler = () => {
    if (!isUpdating) {
      setFormData({
        author: task.author,
        title: task.title,
        status: task.status,
      });
      setEditId(task._id);
      localStorage.setItem("update_id", task._id);
      setIsUpdating(true);
    } else {
      localStorage.removeItem("update_id");
      setFormData(initialFormData);
      setIsUpdating(false);
      setEditId("");
    }
  };

  return (
    <div className={styles.task_item}>
      <h2>{task.title}</h2>
      <div className={styles.task_meta}>
        <div className={styles.task_info}>
          <p>
            <span>Status:</span>{" "}
            {task.status.slice(0, 1).toUpperCase() + task.status.slice(1)}
          </p>
          <p>
            <span>Author:</span> {task.author}
          </p>
          <p>
            <span>Created At:</span> {new Date(task.createdAt).toDateString()}
          </p>
        </div>
        <div className={styles.task_buttons}>
          <button type="button" onClick={updateTaskHandler}>
            {isUpdating && task._id === editId ? "Cancel" : "Update"}
          </button>
          <button type="button" onClick={deleteTaskHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
