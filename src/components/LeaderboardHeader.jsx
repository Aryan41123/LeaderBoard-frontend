import React, { useEffect, useState } from 'react';

const LeaderboardHeader = ({ selectedTab, setSelectedTab }) => {
  const [timeLeft, setTimeLeft] = useState('');

  // Calculate time remaining
  useEffect(() => {
    const getTimeRemaining = () => {
      const now = new Date();

      let resetTime;
      if (selectedTab === 'Daily') {
        resetTime = new Date(now);
        resetTime.setHours(24, 0, 0, 0); // Next midnight
      } else if (selectedTab === 'Monthly') {
        resetTime = new Date(now.getFullYear(), now.getMonth() + 1, 1); // 1st of next month
      }

      const diff = resetTime - now;

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    getTimeRemaining(); // Initial call
    const interval = setInterval(getTimeRemaining, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [selectedTab]);

  return (
    <div className="bg-gradient-to-b from-yellow-400 to-orange-400 text-white rounded-b-xl shadow-md p-4">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-4">
        <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="flex space-x-4 text-sm font-semibold">
          <span>Elite Ranking</span>
          <span>Hourly Ranking</span>
          <span>Family Ranking</span>
          <span className="font-bold text-yellow-800 bg-white bg-opacity-70 px-2 py-1 rounded-full shadow-inner">
            Wealth Ranking
          </span>
        </div>
        <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9.228a4.5 4.5 0 110 5.544M15.717 11.283A4.5 4.5 0 1111.25 18h1.06l1.06-1.06a4.5 4.5 0 01-1.06-1.06l-1.06 1.06V18h-1.06a4.5 4.5 0 01-1.06-1.06l-1.06 1.06H8.228a4.5 4.5 0 110-5.544M12 10a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>

      {/* Daily/Monthly Tabs */}
      <div className="flex justify-center bg-white bg-opacity-30 rounded-full p-1 mx-8 mb-2">
        <button
          onClick={() => setSelectedTab('Daily')}
          className={`flex-1 py-2 rounded-full text-center font-semibold transition-all duration-300 ${
            selectedTab === 'Daily' ? 'bg-white text-orange-500 shadow-md' : 'text-white hover:bg-white hover:bg-opacity-10'
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setSelectedTab('Monthly')}
          className={`flex-1 py-2 rounded-full text-center font-semibold transition-all duration-300 ${
            selectedTab === 'Monthly' ? 'bg-white text-orange-500 shadow-md' : 'text-white hover:bg-white hover:bg-opacity-10'
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Countdown Timer */}
      <div className="text-center text-sm font-medium mt-1">
        Settlement in: <span className="font-bold">{timeLeft}</span>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
