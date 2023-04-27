// import css from './app.module.scss';
import Form from './_01-form';
import Filter from './_02-filter';
import List from './_03-List';
import css from 'app.module.scss'

import React, { Component } from 'react';

export class App extends Component {
  state = {
	value: '',
     contacts: [],
    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],
  };

  componentDidMount() {
	  const contacts = localStorage.getItem('contacts')
	  const parsedContacts = JSON.parse(contacts)
	//   console.log(parsedContacts);
	if (parsedContacts) {
		this.setState({contacts: parsedContacts})	
	}

  }

  componentDidUpdate(prevProps, prevState) {
	  
	  if (this.state.contacts !== prevState.contacts) {
		localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
	}
  }

  formSubmit = data => {
    if (data.length >= 0) {
      this.setState({
        contacts: [...data],
      });
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, data],
      }));
    }
  };

  filter = valueFilter => {
	this.setState(prevState => {
		return { value:  valueFilter };
	  });
  };

  render() {
	// console.log(this.state.value);
    return (
      <div className={css['vrapper']}>
		<h1 className={css['vrapper__title']}>Phonebook</h1>
        <Form alert={this.state.contacts} onSubmit={this.formSubmit} />
		<h2 className={css['vrapper__title']}>Contacts</h2>
		<Filter filter={this.filter}/>
        <List filterValue={this.state.value || ''} data={this.state.contacts || []} onSubmit={this.formSubmit} />
      </div>
    );
  }
}
