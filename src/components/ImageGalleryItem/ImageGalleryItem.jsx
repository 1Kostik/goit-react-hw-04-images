import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { ImageGalleryList, Image } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ largeImageURL, webformatURL, tags }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };
  return (
    <ImageGalleryList>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal onClose={toggleModal} largeImg={largeImageURL} tags={tags} />
      )}
    </ImageGalleryList>
  );
}
ImageGalleryItem.propTypes = {
  searchName: PropTypes.string,
  page: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
