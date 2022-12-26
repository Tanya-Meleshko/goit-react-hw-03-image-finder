import React, { Component } from 'react';
import s from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClose);
  }

  closeModal = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  onEscClose = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    const { bigImg } = this.props;
    return (
      <div onClick={this.closeModal} className={s.backdrop}>
        <div className={s.modal}>
          <img src={bigImg} alt="big" />
        </div>
      </div>
    );
  }
}
