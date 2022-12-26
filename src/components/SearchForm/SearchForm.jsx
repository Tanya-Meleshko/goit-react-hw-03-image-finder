import React, { Component } from 'react';
import s from './SearchForm.module.css';
import { BiSearchAlt } from 'react-icons/bi';

export default class SearchForm extends Component {
  state = {
    query: '',
  };

  onChange = event => {
    this.setState({
      query: event.target.value,
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <div className={s.formWrapper}>
        <form onSubmit={this.onSubmit} className={s.searchForm}>
          <button className={s.searchButton} type="submit">
            <BiSearchAlt size="22" />
          </button>
          <input
            onChange={this.onChange}
            type="text"
            name="searchQuery"
            value={query}
            autoComplete="off"
            placeholder="Search images..."
            className={s.searchInput}
          />
        </form>
      </div>
    );
  }
}
