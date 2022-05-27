import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../services/images-api.js';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import s from './App.module.css';

class App extends Component {
  state = {
    dataImages: [],
    imagesTag: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { dataImages, imagesTag, page } = this.state;

    if (prevState.imagesTag !== imagesTag || prevState.page !== page) {
      api
        .fetchImages(imagesTag, page)
        .then(response => {
          if (response.data.total !== 0) {
            return response.data;
          }
          return Promise.reject(
            new Error(`Нет картинок с названием ${imagesTag}`)
          );
        })
        .then(data => this.setState({ dataImages: [...dataImages, data] }))
        .catch(error => {
          toast.error(error.message);
        });
    }
  }

  handleSubmitForm = imagesTag => {
    this.setState({ imagesTag, page: 1, dataImages: [], error: null });
  };

  handleButtonClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { dataImages } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSubmitForm} />
        {dataImages.length !== 0 && (
          <ImageGallery
            images={dataImages}
            onClickButton={this.handleButtonClick}
          />
        )}

        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

export default App;
