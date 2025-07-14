// src/components/Top3Display.jsx
import React from 'react';
import { Award } from 'lucide-react'; // Importing the Award icon from lucide-react

const Top3Display = ({ top3 }) => {
  // Placeholder for the main shield/trophy SVG (remains unchanged as it's complex)
  const ShieldSVG = () => (
    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 0L150 25V175L100 200L50 175V25L100 0Z" fill="url(#goldGradient)" stroke="#FFD700" strokeWidth="5"/>
      <path d="M100 20L135 35V155L100 170L65 155V35L100 20Z" fill="#F0B700"/>
      <circle cx="100" cy="80" r="30" fill="#FFC107" stroke="#FFD700" strokeWidth="3"/>
      <path d="M90 75L100 60L110 75L105 85L95 85L90 75Z" fill="#FFF"/> {/* Simple star */}

      <defs>
        <linearGradient id="goldGradient" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/>
          <stop offset="1" stopColor="#FFA500"/>
        </linearGradient>
      </defs>
      {/* Wings - simplified */}
      <path d="M100 100L170 80L150 120L100 100Z" fill="#FFD700" opacity="0.6"/>
      <path d="M100 100L30 80L50 120L100 100Z" fill="#FFD700" opacity="0.6"/>
    </svg>
  );

  // Helper to display points with a "blurred" effect (using asterisks)
  const displayBlurredPoints = (points) => {
    if (points === undefined || points === null) return '*****';
    const pointsStr = String(points);
    if (pointsStr.length <= 2) return pointsStr + '*****'; // Keep first few digits
    return pointsStr.substring(0, 2) + '*****' + pointsStr.substring(pointsStr.length - 2);
  };

  const firstPlace = top3[0];
  const secondPlace = top3[1];
  const thirdPlace = top3[2];

  return (
    <div className="relative flex justify-center items-end h-72 mb-8 mt-4">
      {/* Main Shield/Trophy */}
      <ShieldSVG />

      {/* 2nd Place (Left) */}
      <div className="absolute left-0 bottom-0 flex flex-col items-center text-center -translate-x-4">
        {secondPlace && (
          <div className="relative p-2 bg-gray-200 rounded-full shadow-lg border-2 border-gray-400 -mb-6 z-10">
            <img
              src={secondPlace.avatar}
              alt={secondPlace.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-white"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/C0C0C0/000000?text=${secondPlace.name.charAt(0).toUpperCase()}` }}
            />
          </div>
        )}
        <div className="relative bg-gradient-to-b from-gray-300 to-gray-400 rounded-xl p-4 pt-8 w-32 text-gray-800 shadow-xl border-t-4 border-gray-500">
          {/* Silver Medal Icon using Lucide React */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 drop-shadow-lg flex items-center justify-center">
            <Award className="w-12 h-12 text-gray-500 fill-gray-400" strokeWidth={1.5} />
            <span className="absolute text-white font-black text-xl z-40">2</span>
          </div>
          {secondPlace ? (
            <>
              <p className="font-bold text-sm truncate">{secondPlace.name}</p>
              <div className="flex items-center justify-center bg-gray-500 bg-opacity-20 rounded-full px-3 py-1 mt-2 text-xs font-semibold text-gray-700">
                <span className="mr-1">💰</span> {displayBlurredPoints(secondPlace.points)}
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-xs mt-4">N/A</p>
          )}
        </div>
      </div>

      {/* 1st Place (Center) */}
      <div className="absolute bottom-0 flex flex-col items-center text-center z-20">
        {firstPlace && (
          <div className="relative p-3 bg-yellow-300 rounded-full shadow-xl border-2 border-yellow-500 -mb-8 z-10">
            <img
              src={firstPlace.avatar}
              alt={firstPlace.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-white"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/FFD700/000000?text=${firstPlace.name.charAt(0).toUpperCase()}` }}
            />
          </div>
        )}
        <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-xl p-4 pt-10 w-36 text-yellow-900 shadow-xl border-t-4 border-yellow-600">
          {/* Gold Medal Icon using Lucide React */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 drop-shadow-lg flex items-center justify-center">
            <Award className="w-14 h-14 text-yellow-600 fill-yellow-500" strokeWidth={1.5} />
            <span className="absolute text-white font-black text-2xl z-40">1</span>
          </div>
          {firstPlace ? (
            <>
              <p className="font-bold text-base truncate">{firstPlace.name}</p>
              <div className="flex items-center justify-center bg-yellow-600 bg-opacity-20 rounded-full px-3 py-1 mt-2 text-sm font-semibold text-yellow-900">
                <span className="mr-1">💰</span> {displayBlurredPoints(firstPlace.points)}
              </div>
            </>
          ) : (
            <p className="text-yellow-800 text-sm mt-4">N/A</p>
          )}
        </div>
      </div>

      {/* 3rd Place (Right) */}
      <div className="absolute right-0 bottom-0 flex flex-col items-center text-center translate-x-4">
        {thirdPlace && (
          <div className="relative p-2 bg-orange-200 rounded-full shadow-lg border-2 border-orange-400 -mb-6 z-10">
            <img
              src={thirdPlace.avatar}
              alt={thirdPlace.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-white"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/CD7F32/000000?text=${thirdPlace.name.charAt(0).toUpperCase()}` }}
            />
          </div>
        )}
        <div className="relative bg-gradient-to-b from-orange-300 to-orange-400 rounded-xl p-4 pt-8 w-32 text-orange-800 shadow-xl border-t-4 border-orange-500">
          {/* Bronze Medal Icon using Lucide React */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 drop-shadow-lg flex items-center justify-center">
            <Award className="w-12 h-12 text-orange-500 fill-orange-400" strokeWidth={1.5} />
            <span className="absolute text-white font-black text-xl z-40">3</span>
          </div>
          {thirdPlace ? (
            <>
              <p className="font-bold text-sm truncate">{thirdPlace.name}</p>
              <div className="flex items-center justify-center bg-orange-500 bg-opacity-20 rounded-full px-3 py-1 mt-2 text-xs font-semibold text-orange-700">
                <span className="mr-1">💰</span> {displayBlurredPoints(thirdPlace.points)}
              </div>
            </>
          ) : (
            <p className="text-orange-600 text-xs mt-4">N/A</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Top3Display;