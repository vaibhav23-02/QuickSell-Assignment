import { UrgentPriority, HighPriority, MediumPriority, LowPriority, NoPriority } from "./Svgs";

export const priorityIcons = {
  4: UrgentPriority,    // Urgent
  3: HighPriority,      // High
  2: MediumPriority,    // Medium
  1: LowPriority,       // Low
  0: NoPriority        // No Priority
};

export const getPriorityIcon = (priority) => {
  return priorityIcons[priority] || NoPriority;
};