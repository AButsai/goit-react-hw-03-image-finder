import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  handleToggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  render() {
    const { showModal } = this.state;
    const { webformatURL, largeImageURL, tags } = this.props;
    return (
      <>
        <li className={s.ImageGalleryItem}>
          <img
            className={s.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
            onClick={this.handleToggleModal}
          />
        </li>
        {showModal && (
          <Modal onClose={this.handleToggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
