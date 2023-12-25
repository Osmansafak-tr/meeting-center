const formatDate = (date: Date, type: "date" | "time" | "dateAndTime") => {
  let format = "";
  const formatValue = new Date(date);
  switch (type) {
    case "date":
      format = new Intl.DateTimeFormat("tr", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(formatValue);
      break;

    case "time":
      format = new Intl.DateTimeFormat("tr", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(formatValue);
      break;

    case "dateAndTime":
      const format1 = formatDate(date, "date");
      const format2 = formatDate(date, "time");
      format = format1 + " - " + format2;
      break;
  }

  return format;
};

const coreFunctions = {
  formatDate: (date: Date, type: "date" | "time" | "dateAndTime") =>
    formatDate(date, type),
};

export default coreFunctions;
