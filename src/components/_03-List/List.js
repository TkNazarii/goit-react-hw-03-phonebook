import React, { Component } from 'react';
// import debounce from 'lodash.debounce';
import PropTypes from "prop-types";
import css from './list.module.scss'

export class List extends Component {

	static propTypes = {
		data: PropTypes.arrayOf(
		  PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		  })
		).isRequired,
		onSubmit: PropTypes.func.isRequired,
		value: PropTypes.string
	  };

  state = {
    value: '',
    data: this.props.data,
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data,
      });
    }
  }

  delete = id => {
    const newData = this.state.data.filter(item => item.id !== id);
    this.setState({
      data: newData,
    });
    this.props.onSubmit(newData);
  };

  render() {
	//   console.log(this.props.filterValue);
    return (
   
        <ul className={css['list']}>
          {this.state.data
            .filter(item => {
              return item.name
                .toLowerCase()
                .includes(this.props.filterValue.toLowerCase());
            })
            .map(item => {
              return (
                <li
				className={css['list__item']}
				key={item.id}>
                  {item.name}: {item.number}
                  <button 
				  type="button" onClick={() => this.delete(item.id)}>
                    {' '}
                    Delete{' '}
                  </button>
                </li>
              );
            })}
        </ul>
    );
  }
}

export default List;
