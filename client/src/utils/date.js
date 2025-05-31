export const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleString("default", { month: "long" })} ${String(
      date.getDate()
    ).padStart(2, "0")}, ${date.getFullYear()}`;
  };
export const getFormattedDateWithTime = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date))
};