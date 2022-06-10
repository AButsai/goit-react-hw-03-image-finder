import axios from 'axios';

const getImages = axios.create({
  baseURL: 'https://pixabay.com/api/',

  params: {
    key: '27054776-3e5a81105acc5c75db8ad5ce6',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

const fetchImages = async (name, page = 1) => {
  try {
    const { data } = await getImages('', {
      params: { q: name, page },
    });

    return data.total !== 0 ? data : Promise.reject(new Error(`${name}`));
  } catch (error) {
    console.error(error);
  }
};

const api = {
  fetchImages,
};

export default api;
