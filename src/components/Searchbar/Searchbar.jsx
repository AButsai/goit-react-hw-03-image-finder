import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    tag: '',
  };

  handleChange = e => {
    const { value } = e.currentTarget;

    this.setState({ tag: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.tag.trim() === '') {
      toast('Enter image name');
      return;
    }

    this.props.onSubmit(this.state.tag);
    this.setState({ tag: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.tag}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
