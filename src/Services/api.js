
const baseURL = 'https://dev.triumphdigital.co.th/btt/wp-json/custom/v1';

export const fetchTours = async () => {
  try {
    const response = await fetch(`${baseURL}/tours`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw Error(error.message);
  }
};
