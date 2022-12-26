import Modal from 'components/Modal/Modal';
import React, { Component } from 'react';
import s from './GalleryItem.module.css';

class GalleryItem extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };
  render() {
    const { smallImage, bigImage } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        {isOpen && (
          <div>
            <Modal toggleModal={this.toggleModal} bigImg={bigImage} />
          </div>
        )}
        <div className={s.galleryItem}>
          <img
            onClick={this.toggleModal}
            className={s.galleryImage}
            src={smallImage}
            alt="example"
          />
        </div>
      </>
    );
  }
}

export default GalleryItem;
