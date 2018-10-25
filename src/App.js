import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
    //adding state to a component
    state = {
        contacts : []
    }

/*this is an API request to fetch the contacts' information*/
    componentDidMount() {
        ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts })
        })
    }

  removeContact = (contact) => {
        this.setState((state) => ({
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }));

        ContactsAPI.remove(contact)
    }

    createContact(contact) {
        ContactsAPI.create(contact).then(contact => {
            this.setState(state => ({
                contacts: state.contacts.concat([ contact ])
            }))
        })
    }

  render() {
    return (
      <div className='app'>
        <Route exact path="/" render={() => (
            <ListContacts
                onDeleteContact={this.removeContact}
                contacts={this.state.contacts}
            />
        )}/>
        <Route path='/create' render={({ history }) => (
            <CreateContact
                onCreateContact={(contact) => {
                    this.createContact(contact)
                    history.push('/')
                }}
            />

        )}/>
      </div>
    )
  }
}

export default App;
