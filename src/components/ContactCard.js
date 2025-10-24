import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactCard = ({ contact, isSelected, onSelect, onDelete }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const [isVideoCallInProgress, setIsVideoCallInProgress] = useState(false);

  const handleCall = (e) => {
    e.stopPropagation();
    setIsCallInProgress(true);
    
    toast.info('Connecting call...', {
      position: "top-right",
      autoClose: 2000,
    });

    setTimeout(() => {
      setIsCallInProgress(false);
      toast.success(`Call connected to ${contact.name}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }, 2000);
  };

  const handleVideoCall = (e) => {
    e.stopPropagation();
    setIsVideoCallInProgress(true);
    
    toast.info('Starting video call...', {
      position: "top-right",
      autoClose: 2000,
    });

    setTimeout(() => {
      setIsVideoCallInProgress(false);
      toast.success(`Video call started with ${contact.name}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }, 2500);
  };

  const handleMessage = (e) => {
    e.stopPropagation();
    setShowMessageForm(true);
  };

  const handleHistory = (e) => {
    e.stopPropagation();
    toast.info(`Viewing call history for ${contact.name}`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(contact.id);
    setShowDeleteConfirm(false);
    toast.success(`${contact.name} deleted successfully!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      toast.success(`Message sent to ${contact.name}`, {
        position: "top-right",
        autoClose: 3000,
      });
      setMessage('');
      setShowMessageForm(false);
    }
  };

  return (
    <>
      <div
        onClick={() => onSelect(contact.id)}
        className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
          isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'
        } relative`}
      >
        <div className="p-5 pt-12">
          {/* Delete Button - Positioned at top */}
          <button
            onClick={handleDeleteClick}
            className="absolute top-2 right-2 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200 z-10"
            title="Delete contact"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1 mr-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {contact.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-800 truncate">{contact.name}</h3>
                <p className="text-sm text-slate-600">{contact.phone}</p>
                {contact.email && (
                  <p className="text-xs text-slate-500 mt-1 truncate">{contact.email}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleCall}
              disabled={isCallInProgress}
              className={`p-3 rounded-full transition duration-200 flex-shrink-0 ${
                isCallInProgress
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white shadow-md hover:shadow-lg`}
            >
              {isCallInProgress ? (
                <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
              )}
            </button>
          </div>

          {isSelected && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={handleVideoCall}
                  disabled={isVideoCallInProgress}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition duration-200 ${
                    isVideoCallInProgress
                      ? 'bg-slate-100 cursor-not-allowed'
                      : 'bg-blue-50 hover:bg-blue-100'
                  }`}
                >
                  <svg className="w-6 h-6 text-blue-600 mb-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                  </svg>
                  <span className="text-xs font-medium text-slate-700">Video Call</span>
                </button>

                <button
                  onClick={handleMessage}
                  className="flex flex-col items-center justify-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition duration-200"
                >
                  <svg className="w-6 h-6 text-purple-600 mb-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <span className="text-xs font-medium text-slate-700">Message</span>
                </button>

                <button
                  onClick={handleHistory}
                  className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition duration-200"
                >
                  <svg className="w-6 h-6 text-slate-600 mb-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-xs font-medium text-slate-700">History</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 m-4 border-4 border-red-500">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Delete Contact?</h3>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete <span className="font-semibold text-slate-800">{contact.name}</span>? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Form Modal */}
      {showMessageForm && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 m-4 border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800">Send Message to {contact.name}</h3>
              <button
                onClick={() => setShowMessageForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form onSubmit={sendMessage}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-slate-50"
                rows="5"
              />
              <div className="flex space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowMessageForm(false)}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactCard;
