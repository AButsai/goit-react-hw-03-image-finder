import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '27054776-3e5a81105acc5c75db8ad5ce6';
const PER_PAGE = 12;
const PARAM = 'image_type=photo&orientation=horizontal';

const fetchImages = (name, page) => {
  try {
    return axios
      .get(
        `${BASE_URL}?q=${name}&page=${page}&key=${KEY_API}&${PARAM}&per_page=${PER_PAGE}`
      )
      .then(response => {
        if (response.data.total !== 0) {
          return response.data;
        }
        return Promise.reject(new Error(`${name}`));
      });
  } catch (error) {
    console.error(error);
  }
};

const api = {
  fetchImages,
};

export default api;
