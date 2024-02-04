export type FormData = {
  author: string;
  title: string;
  status: string;
};

export type Task = FormData & {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
};
