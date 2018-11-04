export const germanTimeFormat = date => {
  var currentDate = new Date(date);
  var dd = currentDate.getDate();
  var mm = currentDate.getMonth() + 1;
  var yyyy = currentDate.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "." + mm + "." + yyyy;
};
