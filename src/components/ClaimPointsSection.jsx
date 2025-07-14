// src/components/ClaimPointsSection.jsx
import React from 'react';

const ClaimPointsSection = ({ participants, selectedParticipantId, setSelectedParticipantId, claimPoints }) => {
  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Claim Points</h2>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <select
          value={selectedParticipantId}
          onChange={(e) => setSelectedParticipantId(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <option value="" disabled>Select a participant</option>
          {participants.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <button
          onClick={claimPoints}
          disabled={!selectedParticipantId}
          className={`py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105
            ${selectedParticipantId ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
        >
          Claim Random Points (1-10)
        </button>
      </div>
    </div>
  );
};

export default ClaimPointsSection;