// src/components/ClaimHistoryTable.jsx
import React from 'react';

const ClaimHistoryTable = ({ claimHistory }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Claim History</h2>
      {claimHistory.length === 0 ? (
        <p className="text-center text-gray-600">No claims recorded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-purple-600 text-white uppercase text-sm leading-normal rounded-t-lg">
                <th className="py-3 px-6 text-left rounded-tl-lg">Participant</th>
                <th className="py-3 px-6 text-right">Points Claimed</th>
                <th className="py-3 px-6 text-right rounded-tr-lg">Timestamp</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {claimHistory.map(claim => (
                <tr key={claim.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{claim.participantName}</td>
                  <td className="py-3 px-6 text-right font-medium">{claim.points}</td>
                  <td className="py-3 px-6 text-right text-xs text-gray-500">{claim.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClaimHistoryTable;