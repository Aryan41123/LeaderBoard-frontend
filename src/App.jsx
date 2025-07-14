// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Import axios
import MessageDisplay from './components/MessageDisplay';
import AddParticipantForm from './components/AddParticipantForm';
import ClaimPointsSection from './components/ClaimPointsSection';
import LeaderboardHeader from './components/LeaderboardHeader';
import Top3Display from './components/Top3Display';
import LeaderboardTable from './components/LeaderboardTable';
import ClaimHistoryTable from './components/ClaimHistoryTable';

const API_BASE_URL = 'https://leaderboard-l4bb.onrender.com/api'; // Ensure this matches your backend's port

// Main App component
const App = () => {
  const [participants, setParticipants] = useState([]);
  const [claimHistory, setClaimHistory] = useState([]);
  const [newParticipantName, setNewParticipantName] = useState('');
  const [selectedParticipantId, setSelectedParticipantId] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTab, setSelectedTab] = useState('Daily');
  const [loading, setLoading] = useState(true);

  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);

  // Function to fetch participants from the backend
  const fetchParticipants = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/users`);
      const data = response.data; // Axios puts response data in .data property

      const formattedParticipants = data.map(user => ({
        id: user._id,
        name: user.name,
        points: user.totalPoints,
        rank: user.rank,
        // Generate a simple avatar based on name initial for new users from backend
        avatar: user.avatar
      }));
      setParticipants(formattedParticipants);
      // Set a default selected participant if available and none is currently selected
      if (formattedParticipants.length > 0 && !selectedParticipantId) {
        setSelectedParticipantId(formattedParticipants[0].id);
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
      setMessage(`Failed to load participants: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  }, [selectedParticipantId]);

  // Function to fetch claim history from the backend
  const fetchClaimHistory = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/claim/history`);
      const data = response.data; // Axios puts response data in .data property

      const formattedHistory = data.map(item => ({
        id: item._id,
        participantId: item.userId,
        participantName: item.userName,
        points: item.points,
        claimedAt: new Date(item.claimedAt).toLocaleString(), // Format date
      }));
      
      setClaimHistory(formattedHistory);
    } catch (error) {
      console.error("Error fetching claim history:", error);
      setMessage(`Failed to load claim history: ${error.response?.data?.error || error.message}`);
    }
  }, []);

  // Effect to load data when the component mounts or dependencies change
  useEffect(() => {
    fetchParticipants();
    fetchClaimHistory();
  }, [fetchParticipants, fetchClaimHistory]);

  // Function to add a new participant
  const addParticipant = async () => {
    if (newParticipantName.trim() === '') {
      setMessage('Participant name cannot be empty.');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, { name: newParticipantName.trim() });

      const addedUser = response.data;
      setMessage(`Participant "${addedUser.name}" added successfully!`);
      setNewParticipantName(''); // Clear input field
      fetchParticipants(); // Refresh the list of participants
    } catch (error) {
      console.error("Error adding participant:", error);
      setMessage(`Failed to add participant: ${error.response?.data?.error || error.message}`);
    }
  };

  // Function to claim random points for the selected participant
  const claimPoints = async () => {
    if (!selectedParticipantId) {
      setMessage('Please select a participant to claim points.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/claim/${selectedParticipantId}`);

      const result = response.data;
      setMessage(`${result.name} claimed ${result.points} points! Total: ${result.newTotalPoints}`);
      fetchParticipants(); // Refresh participants to update points and ranks
      fetchClaimHistory(); // Refresh history
    } catch (error) {
      console.error("Error claiming points:", error);
      setMessage(`Failed to claim points: ${error.response?.data?.error || error.message}`);
    }
  };

  // Sort participants by points in descending order for the leaderboard
  // The backend already returns them sorted and ranked, so we just slice.
  const sortedParticipants = participants; // Assuming backend delivers sorted data
  const top3Participants = sortedParticipants.slice(0, 3);
  const remainingParticipants = sortedParticipants.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 font-inter text-gray-800">
      <div className="max-w-md mx-auto bg-gradient-to-b from-yellow-50 to-orange-100 rounded-b-2xl shadow-lg overflow-hidden">

        {/* Leaderboard Header */}
        <LeaderboardHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* Main Content Area */}
        <div className="p-4 pt-0">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden p-4">
            {/* Settlement Time and Rewards (Static as per original UI) */}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>Settlement time 14 days 01:45:47</span>
              <button className="flex items-center bg-yellow-400 text-white px-3 py-1 rounded-full shadow-md text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                Rewards
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-600">Loading participants...</div>
            ) : (
              <>
                {/* Top 3 Display */}
                <Top3Display top3={top3Participants} />

                {/* Remaining Leaderboard Participants (from rank 4 onwards) */}
                <LeaderboardTable participants={remainingParticipants} startRank={4} />
              </>
            )}

            {/* Message Display */}
            <MessageDisplay message={message} clearMessage={clearMessage} />

            {/* Add Participant Section */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-xl font-bold text-gray-700 mb-3">Add New Participant</h2>
              <AddParticipantForm
                newParticipantName={newParticipantName}
                setNewParticipantName={setNewParticipantName}
                addParticipant={addParticipant}
              />
            </div>

            {/* Claim Points Section */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-xl font-bold text-gray-700 mb-3">Claim Points</h2>
              <ClaimPointsSection
                participants={participants}
                selectedParticipantId={selectedParticipantId}
                setSelectedParticipantId={setSelectedParticipantId}
                claimPoints={claimPoints}
              />
            </div>

            {/* Claim History Section */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-xl font-bold text-gray-700 mb-3">Claim History</h2>
              <ClaimHistoryTable claimHistory={claimHistory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;