// External Imports
import { format } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "PP. p")
};