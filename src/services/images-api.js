import axios from 'axios';

const fetchImages = (name, page) => {
  return axios.get(
    `https://pixabay.com/api/?key=27054776-3e5a81105acc5c75db8ad5ce6&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
};

const api = {
  fetchImages,
};

export default api;
