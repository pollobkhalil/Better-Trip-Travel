
const baseURL = 'https://dev.triumphdigital.co.th/btt/wp-json/custom/v1/tours';

export const fetchTours = async (page = 1) => {
  try {
    const response = await fetch(`${baseURL}?page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw Error(error.message);
  }
};
