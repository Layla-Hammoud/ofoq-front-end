import jsonData from "./path.json";

export const fetchData = () => {
  // Simulate fetching data with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jsonData);
    }, 1000); // Simulate a 1-second delay
  });
};
