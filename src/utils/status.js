import { Backlog, Done, InProgress, Todo, Cancelled } from "./Svgs";

export const statusIcons = {
  todo: Todo,
  inprogress: InProgress,
  backlog: Backlog,
  done: Done,
  cancelled: Cancelled,
};

export const getStatus = (status) => {
  const normalizedStatus = status === "In progress" ? "inprogress" : status.toLowerCase();
  return statusIcons[normalizedStatus] || null;
};