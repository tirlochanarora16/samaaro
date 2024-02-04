import { FormData } from "./types/tasks";

export const CONSTANTS = {
  API_URL: "http://localhost:3000",
  NEW_TASK: "tasks/new",
  ALL_TAKSS: "tasks",
  UPDATE_TASK: "tasks/update",
  DELETE_TASK: "tasks/delete",
};

export const initialFormData: FormData = {
  author: "",
  title: "",
  status: "incomplete",
};
