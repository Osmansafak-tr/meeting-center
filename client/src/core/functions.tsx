const formatDate = (
  date: Date,
  type: "date" | "time" | "dateAndTime" | "htmlDate"
) => {
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
      }).format(formatValue);
      break;

    case "dateAndTime":
      const format1 = formatDate(date, "date");
      const format2 = formatDate(date, "time");
      format = format1 + " - " + format2;
      break;

    case "htmlDate":
      const formatHtmlYear = new Intl.DateTimeFormat("tr", {
        year: "numeric",
      }).format(formatValue);
      const formatHtmlMonth = new Intl.DateTimeFormat("tr", {
        month: "2-digit",
      }).format(formatValue);
      const formatHtmlDay = new Intl.DateTimeFormat("tr", {
        day: "2-digit",
      }).format(formatValue);
      const formatHtmlDate =
        formatHtmlYear + "-" + formatHtmlMonth + "-" + formatHtmlDay;
      const formatHtmlTime = new Intl.DateTimeFormat("tr", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(formatValue);
      format = formatHtmlDate + "T" + formatHtmlTime;
      break;
  }

  return format;
};

const coreFunctions = {
  formatDate: (
    date: Date,
    type: "date" | "time" | "dateAndTime" | "htmlDate"
  ) => formatDate(date, type),
};

export default coreFunctions;
