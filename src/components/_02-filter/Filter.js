import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import PropTypes from "prop-types";
import css from './filter.module.scss'

export class Filter extends Component {

	static propTypes = {
		filter: PropTypes.func.isRequired,
	  };

  handleValue = evt => {
	this.props.filter(evt.target.value)
  };

  render() {
	// console.log(this.props);
    return (
        <label className={css['filter']}>
          <p>Find contacts by name{' '}</p>
          <input
		 	 className={css['filter__input']}
            // value={this.state.value}
            type="text"
            placeholder="Find by name..."
            onChange={debounce(this.handleValue, 1000)}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
        </label>

    );
  }
}

export default Filter;
