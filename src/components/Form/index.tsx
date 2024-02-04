import axios, { AxiosResponse } from "axios";
import { CONSTANTS } from "../../constants";
import styles from "./styles.module.css";
import { FormData } from "../../types/tasks";

interface IProps {
  fetchAllTasks: () => Promise<void>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  initialFormData: FormData;
  isUpdating: boolean;
}

const Form: React.FC<IProps> = ({
  fetchAllTasks,
  formData,
  setFormData,
  initialFormData,
  isUpdating,
  setIsUpdating,
}) => {
  const formChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (isUpdating) {
        const response = await axios.patch(
          `${CONSTANTS.API_URL}/${
            CONSTANTS.UPDATE_TASK
          }?_id=${localStorage.getItem("update_id")}`,
          formData
        );

        if (response.status === 200) {
          alert("Tasks updated successfully");
          setFormData(initialFormData);
          fetchAllTasks();
          setIsUpdating(false);
          localStorage.removeItem("update_id");
          return;
        }
      }

      const response = await axios.post(
        `${CONSTANTS.API_URL}/${CONSTANTS.NEW_TASK}`,
        formData
      );

      if (response.status == 201) {
        alert("New Tasks added successfully");
        setFormData(initialFormData);
        fetchAllTasks();
        return;
      }
    } catch (err: any) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className={styles.form}>
      <h2>Add New Task (MERN CRUD app)</h2>
      <form onSubmit={formSubmitHandler} className={styles.form_container}>
        <input
          className={styles.form_input}
          type="text"
          id="author"
          placeholder="Author"
          value={formData.author}
          onChange={formChangeHandler}
          required
        />
        <input
          className={styles.form_input}
          type="text"
          id="title"
          placeholder="Title"
          value={formData.title}
          onChange={formChangeHandler}
          required
        />
        <div className={styles.form_select}>
          <label htmlFor="status">Status</label>
          <select
            onChange={formChangeHandler}
            value={formData.status}
            id="status"
            name="cars"
          >
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <button type="submit" className={styles.form_btn}>
          {isUpdating ? "Update" : "Add"} Task
        </button>
      </form>
    </div>
  );
};

export default Form;
