// src/helpers/utils.js

exports.isValidDateAndConvert = (value) => {
  const regex = /^([0-2][0-9]|(3)[0-1])\/(((0)[0-9])|((1)[0-2]))\/\d{4}$/;

  if (!regex.test(value)) {
    throw new Error('foundedDate must be in the format "dd/mm/YYYY"');
  }

  const [day, month, year] = value.split("/").map((num) => parseInt(num, 10));
  const dateObj = new Date(year, month - 1, day);

  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() + 1 !== month ||
    dateObj.getDate() !== day
  ) {
    throw new Error("Invalid date");
  }

  return dateObj;
};
