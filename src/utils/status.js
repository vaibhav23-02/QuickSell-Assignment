import { Backlog, Done, InProgress } from "./Svgs";

export const statusOf = [InProgress, Done, Backlog];

export const getStatus = () => {
  return statusOf[Math.floor(Math.random() * statusOf.length)];
};
