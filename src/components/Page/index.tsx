import axios from "axios";
import { CONSTANTS, initialFormData } from "../../constants";
import Form from "../Form";
import AllTasks from "../Tasks";
import styles from "./styles.module.css";

import { useEffect, useState } from "react";
import { FormData, Task } from "../../types/tasks";

const Page = () => {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const fetchAllTasks = async (filters: string = "") => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_URL}/${CONSTANTS.ALL_TAKSS}${filters}`
      );

      setTasksList(response.data?.tasks as Task[]);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.page_form}>
        <Form
          fetchAllTasks={fetchAllTasks}
          formData={formData}
          setFormData={setFormData}
          initialFormData={initialFormData}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
        />
      </div>
      <div className={styles.page_filters}>
        <p>Filter By:</p>
        <div className={styles.page_filter}>
          <label htmlFor="status_filter">Status</label>
          <select
            id="status_filter"
            onChange={(e) => fetchAllTasks(`?status=${e.target.value}`)}
          >
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      <div className={styles.page_tasks}>
        <AllTasks
          tasks={tasksList}
          fetchAllTasks={fetchAllTasks}
          setFormData={setFormData}
          setIsUpdating={setIsUpdating}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
};

export default Page;
