import React, { Component } from 'react';
import s from './ScrollButton.module.css';
import { FaArrowUp } from 'react-icons/fa';
export default class ScrollButton extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.toggleVisible);
  }

  toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 900) {
      this.setState({
        visible: true,
      });
    } else if (scrolled <= 900) {
      this.setState({
        visible: false,
      });
    }
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      this.state.visible && (
        <button className={s.scrollButton} onClick={this.scrollToTop}>
          <FaArrowUp />
        </button>
      )
    );
  }
}
