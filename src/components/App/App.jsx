import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import api from '../../services/imagesApi.js';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';

import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    dataImages: [],
    imagesTag: '',
    page: 1,
    status: Status.IDLE,
    errors: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { dataImages, imagesTag, page } = this.state;

    if (prevState.imagesTag !== imagesTag || prevState.page !== page) {
      this.setState({ status: Status.PENDING });

      api
        .fetchImages(imagesTag, page)
        .then(data =>
          this.setState({
            dataImages: [...dataImages, data],
            status: Status.RESOLVED,
          })
        )
        .catch(error => {
          this.setState({ errors: error, status: Status.REJECTED });
        });
    }
  }

  handleSubmitForm = imagesTag => {
    this.setState({ imagesTag, page: 1, dataImages: [], errors: null });
  };

  handleButtonClick = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { dataImages, status, errors } = this.state;
    const searchBar = <Searchbar onSubmit={this.handleSubmitForm} />;
    const toastContainer = <ToastContainer autoClose={1500} />;

    return (
      <>
        {status === 'idle' && (
          <div className={s.App}>
            {searchBar}
            {toastContainer}
          </div>
        )}

        {status === 'pending' && (
          <div className={s.App}>
            {searchBar}
            {toastContainer}
            {dataImages.length !== 0 && <ImageGallery images={dataImages} />}
            <Loader />
          </div>
        )}

        {status === 'resolved' && (
          <div className={s.App}>
            {searchBar}
            {toastContainer}
            <ImageGallery images={dataImages}>
              <Button onClick={this.handleButtonClick} />
            </ImageGallery>
          </div>
        )}

        {status === 'rejected' && (
          <div className={s.App}>
            {searchBar}
            {toastContainer}
            {errors && (
              <p className={s.ErrorTitle}>
                Нет картинок с названием <span>{errors.message}</span>,
                поробуйте ввести другое название!
              </p>
            )}
          </div>
        )}
      </>
    );
  }
}

export default App;
