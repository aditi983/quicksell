import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export { fetchData };
