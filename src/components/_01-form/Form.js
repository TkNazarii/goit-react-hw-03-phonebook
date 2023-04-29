import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
// const model = nanoid(5) //=> "V1StGXR8_Z5jdHi6B-myT"

import css from './form.module.scss';

class Form extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    id: '',
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      id: nanoid(5),
      [name]: value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const arr = this.props.alert;
    const bullean = arr.find(option => option.name === this.state.name);

    if (bullean) {
      alert('Such a name is in the book');
      return;
    }

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      id: '',
      name: '',
      number: '',
    });
  };

  render() {
	// console.log(this.props.alert);
    return (
      <form className={css['form']} onSubmit={this.handleSubmit}>
          <label className={css['form__label']}>
          <p>Name{' '}</p>
          <input
		  	className={css['form__input']}
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={css['form__label']}>
		<p>Number{' '}</p>
          <input
			  className={css['form__input']}
            value={this.state.number}
            onChange={this.handleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default Form;
