import moment from "moment";

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
    .toISOString()
    .slice(0, 10);
}

export const getFormattedDate = (date) => {
  if (date.toISOString) return date.toISOString().slice(0, 10);
  return date;
};

const DateFormatter = (props) => {
  const { date } = props;
  const formattedDate = moment(date).format("dddd- MMMM Do YYYY");

  return formattedDate;
};

export default DateFormatter;
