# Contact Manager - React + Tailwind CSS

A professional, modern contact management application built with React and Tailwind CSS featuring a beautiful grayish-blue color scheme.

## Features

- **View Contacts**: Display all contacts in a responsive grid layout
- **Search Functionality**: Real-time search with simulated API delay
- **Add New Contacts**: Add contacts via a modal form with complete validation
- **Delete Contacts**: Remove contacts with confirmation modal to prevent accidental deletions
- **Phone Number Validation**: Ensures only valid 10-digit Indian mobile numbers are accepted
- **Email Validation**: Validates email format before saving (optional field)
- **Duplicate Detection**: Prevents duplicate names, phone numbers, and emails
- **Auto-Capitalization**: Automatically capitalizes the first letter of each word in names
- **Call Actions**: Simulate phone calls with API timeout
- **Video Call**: Simulate video calls with loading states
- **Messaging**: Send messages through a dedicated form
- **Call History**: View call history (simulated)
- **Local Storage**: Persistent data storage using browser localStorage
- **Toast Notifications**: Professional notifications for all actions
- **Responsive Design**: Works seamlessly on all device sizes

## Validation Features

### Phone Number Validation
- Must be exactly **10 digits**
- Automatically formats as `XXX-XXX-XXXX` while typing
- Only accepts numeric input
- Checks for duplicate phone numbers
- Supports Indian mobile number format (starting with 7, 8, or 9)

### Email Validation
- Validates proper email format (`user@domain.com`)
- Optional field (can be left empty)
- Checks for duplicate email addresses
- Case-insensitive comparison

### Name Validation
- Required field
- Auto-capitalizes first letter of each word
- Checks for duplicate names (case-insensitive)
- Example: "john doe" becomes "John Doe"
### Duplicate Prevention
The app prevents adding contacts with:
- Duplicate names (case-insensitive)
- Duplicate phone numbers (format-agnostic)
- Duplicate email addresses (case-insensitive)

## Technologies Used

- React 18
- Tailwind CSS 3
- React Toastify
- JavaScript (ES6+)
- Local Storage API

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
