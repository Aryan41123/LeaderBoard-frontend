// src/components/LeaderboardTable.jsx
import React from 'react';

const LeaderboardTable = ({ participants, startRank }) => {
  // Helper to display points with a "blurred" effect (using asterisks)
  const displayBlurredPoints = (points) => {
    if (points === undefined || points === null) return '*****';
    const pointsStr = String(points);
    // Modified to keep first and last digit, then blur in between
    if (pointsStr.length <= 2) return pointsStr.substring(0, 1) + '*****' + pointsStr.substring(pointsStr.length - 1);
    return pointsStr.substring(0, 1) + '*****' + pointsStr.substring(pointsStr.length - 1);
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          {/* Removed newlines/whitespace between <tr> and <th> */}
          <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <th className="px-4 py-2 rounded-tl-lg">Rank</th>
            <th className="px-4 py-2">Participant</th>
            <th className="px-4 py-2 rounded-tr-lg text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {participants.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-4 py-3 text-center text-gray-500">No participants found.</td>
            </tr>
          ) : (
            participants.map((p, index) => (
              // Removed newlines/whitespace between <tr> and <td>
              <tr key={p.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-700">{p.rank}</td>
                <td className="px-4 py-3 flex items-center">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-8 h-8 rounded-full mr-3 object-cover border-2 border-yellow-300"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/CCCCCC/000000?text=${p.name.charAt(0).toUpperCase()}` }}
                  />
                  <span className="text-sm font-medium text-gray-800 truncate">{p.name}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 text-right font-bold">{displayBlurredPoints(p.points)}</td>
              </tr>
            ))
          )}
          {/* Fixed 999+ entry - now with blurred points */}
          {/* Removed newlines/whitespace between <tr> and <td> */}
          <tr className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
            <td className="px-4 py-3 text-sm font-semibold text-gray-700">999+</td>
            <td className="px-4 py-3 flex items-center">
              <img
                src="https://placehold.co/100x100/34D399/FFFFFF?text=D" // Distinct avatar for "Devil"
                alt="Devil"
                className="w-8 h-8 rounded-full mr-3 object-cover border-2 border-green-400"
              />
              <span className="text-sm font-medium text-gray-800 mr-1">Devil</span>
              <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full font-semibold">VP L</span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 text-right font-bold">{displayBlurredPoints(10)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;