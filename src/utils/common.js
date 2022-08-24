//Utils: contain functions used throughout project
import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format("LLL");
};
