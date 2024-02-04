import { FormData, Task } from "../../types/tasks";
import TaskCard from "./TaskCard";
import styles from "./styles.module.css";

interface IProps {
  tasks: Task[];
  fetchAllTasks: () => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdating: boolean;
}

const AllTasks: React.FC<IProps> = ({
  tasks,
  fetchAllTasks,
  setFormData,
  setIsUpdating,
  isUpdating,
}) => {
  if (tasks.length === 0)
    return <p className={styles.task_noData}>No tasks found!</p>;

  return (
    <div className={styles.task}>
      {tasks.map((task) => {
        return (
          <TaskCard
            key={task._id}
            task={task}
            fetchAllTasks={fetchAllTasks}
            setFormData={setFormData}
            setIsUpdating={setIsUpdating}
            isUpdating={isUpdating}
          />
        );
      })}
    </div>
  );
};

export default AllTasks;
