import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    //New method for clearing the query to show all contact after click on 'Show all' button
    clearQuery = () => {
        this.setState({query: ''})
    }

    render() {
        /*Refactoring via ES6 Destructuring*/
        const {contacts, onDeleteContact} = this.props
        const {query} = this.state

        /*filtering the contacts that match the entry in the input 'Search contact' form*/
        let showingContacts
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            /*match.test('value') return true is 'value' matches a pattern located at this.state.query*/
            showingContacts = contacts.filter((contact) => match.test(contact.name))
        } else {
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))

        return (
            <div className='list-contacts'>
                <div>
                    <input
                        className = 'search-contacts'
                        type='text'
                        placeholder='Search contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                        to='/create'
                        className='add-contact'
                    >Add Contact</Link>
                </div>

                {showingContacts.length !== contacts.length && (
                    /*message with the number of contacts being shown*/
                    <div className = 'showing-contacts'>
                        <span>Now Showing {showingContacts.length} of {contacts.length}</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}>
                            </div>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>

        )
    }

}

export default ListContacts
