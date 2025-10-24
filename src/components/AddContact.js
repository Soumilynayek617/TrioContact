import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddContact = ({ onAddContact, existingContacts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Validation functions
  const isValidPhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    return /^\d{10}$/.test(digitsOnly);
  };

  const isValidEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // Extract only digits from phone number
  const normalizePhone = (phone) => {
    return phone.replace(/\D/g, '');
  };

  // Normalize name for comparison (lowercase, trim)
  const normalizeName = (name) => {
    return name.trim().toLowerCase();
  };

  // Normalize email for comparison (lowercase, trim)
  const normalizeEmail = (email) => {
    return email.trim().toLowerCase();
  };

  // Check for duplicate phone number
  const isDuplicatePhone = (phone) => {
    const normalizedNewPhone = normalizePhone(phone.trim());
    return existingContacts.some(contact => 
      normalizePhone(contact.phone) === normalizedNewPhone
    );
  };

  // Check for duplicate name
  const isDuplicateName = (name) => {
    const normalizedNewName = normalizeName(name);
    return existingContacts.some(contact => 
      normalizeName(contact.name) === normalizedNewName
    );
  };

  // Check for duplicate email
  const isDuplicateEmail = (email) => {
    if (!email) return false; // Email is optional
    const normalizedNewEmail = normalizeEmail(email);
    return existingContacts.some(contact => 
      contact.email && normalizeEmail(contact.email) === normalizedNewEmail
    );
  };

  // Capitalize first letter of each word
  const capitalizeName = (name) => {
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleNameChange = (e) => {
    const capitalizedName = capitalizeName(e.target.value);
    setFormData({ ...formData, name: capitalizedName });
  };

  // Format phone number as user types (XXX-XXX-XXXX)
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    
    const limitedDigits = digitsOnly.slice(0, 10);
    
    let formatted = limitedDigits;
    if (limitedDigits.length > 6) {
      formatted = `${limitedDigits.slice(0, 3)}-${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
    } else if (limitedDigits.length > 3) {
      formatted = `${limitedDigits.slice(0, 3)}-${limitedDigits.slice(3)}`;
    }
    
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone) {
      toast.error('Name and phone are required!', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Validate phone number format (exactly 10 digits)
    if (!isValidPhone(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number!', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Check for duplicate name
    if (isDuplicateName(formData.name)) {
      toast.error('A contact with this name already exists!', {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    // Check for duplicate phone number
    if (isDuplicatePhone(formData.phone)) {
      toast.error('This phone number already exists!', {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    // Check for duplicate email (if provided)
    if (formData.email && isDuplicateEmail(formData.email)) {
      toast.error('This email address already exists!', {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    // Validate email format if provided
    if (formData.email && !isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address!', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const nameWords = formData.name.trim().split(' ');
    const avatar = nameWords.length >= 2 
      ? `${nameWords[0][0]}${nameWords[1][0]}`.toUpperCase()
      : formData.name.substring(0, 2).toUpperCase();

    const newContact = {
      id: Date.now(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      avatar: avatar
    };

    onAddContact(newContact);
    toast.success(`${formData.name} added successfully!`, {
      position: "top-right",
      autoClose: 3000,
    });
    
    setFormData({ name: '', phone: '', email: '' });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 whitespace-nowrap"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Add Contact</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 m-4 border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Add New Contact</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-slate-50 text-slate-800"
                  placeholder="Enter name (auto-capitalizes)"
                />
                <p className="text-xs text-slate-500 mt-1">Must be unique, case-insensitive</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-slate-50 text-slate-800"
                  placeholder="123-456-7890"
                  maxLength="12"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Must be exactly 10 digits and unique
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-slate-50 text-slate-800"
                  placeholder="email@example.com"
                />
                <p className="text-xs text-slate-500 mt-1">Optional, but must be unique if provided</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddContact;
