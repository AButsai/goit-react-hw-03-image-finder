import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';

import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    showLoader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.images !== this.props.images) {
      this.handleToggleLoader();
    }
  }

  handleToggleLoader = () => {
    const { showLoader } = this.state;
    this.setState({ showLoader: !showLoader });
  };

  handleClickButton = () => {
    this.handleToggleLoader();
    this.props.onClickButton();
  };

  render() {
    const { showLoader } = this.state;
    const { images } = this.props;

    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map(({ hits }) =>
            hits.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))
          )}
        </ul>
        {!showLoader && <Button onClick={this.handleClickButton} />}
        {showLoader && <Loader />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  hits: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGallery;
