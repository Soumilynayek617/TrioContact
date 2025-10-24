import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import { initialContacts } from './components/Data';

const LOCAL_STORAGE_KEY = 'contacts_data';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);

  useEffect(() => {
    const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    } else {
      setContacts(initialContacts);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialContacts));
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    setIsSearching(true);
    
    const searchTimeout = setTimeout(() => {
      if (searchTerm.trim() === '') {
        setFilteredContacts(contacts);
      } else {
        const filtered = contacts.filter(contact =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.phone.includes(searchTerm) ||
          (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredContacts(filtered);
      }
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm, contacts]);

  const handleAddContact = (newContact) => {
    setContacts([newContact, ...contacts]);
  };

  const handleDeleteContact = (contactId) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    if (selectedContactId === contactId) {
      setSelectedContactId(null);
    }
  };

  const handleSelectContact = (contactId) => {
    setSelectedContactId(selectedContactId === contactId ? null : contactId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <header className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
              Contact Manager
            </h1>
          </div>
          
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <div className="flex-1">
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                isSearching={isSearching}
              />
            </div>
            <AddContact onAddContact={handleAddContact} existingContacts={contacts} />
          </div>

          {searchTerm && (
            <p className="text-center text-sm text-slate-600 mt-3">
              {isSearching ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching in database...</span>
                </span>
              ) : (
                `Found ${filteredContacts.length} result(s)`
              )}
            </p>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ContactList 
          contacts={filteredContacts}
          searchTerm={searchTerm}
          selectedContactId={selectedContactId}
          onSelectContact={handleSelectContact}
          onDeleteContact={handleDeleteContact}
        />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
      />
    </div>
  );
}

export default App;
