// src/components/AddParticipantForm.jsx
import React from 'react';

const AddParticipantForm = ({ newParticipantName, setNewParticipantName, addParticipant }) => {
  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Add New Participant</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter participant name"
          value={newParticipantName}
          onChange={(e) => setNewParticipantName(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        <button
          onClick={addParticipant}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Participant
        </button>
      </div>
    </div>
  );
};

export default AddParticipantForm;