import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [limit, setLimit] = useState(100);
  const [totalAttendees, setTotalAttendees] = useState(0);

  useEffect(() => {
    const fetchTotalAttendees = async () => {
      try {
        const response = await axios.get('https://api.hackillinois.org/profile/leaderboard/');
        setTotalAttendees(response.data.profiles.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalAttendees();
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`https://api.hackillinois.org/profile/leaderboard/?limit=${limit}`);
        setProfiles(response.data.profiles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfiles();
  }, [limit]);

  const handleLimitChange = (event) => {
    const userInput = parseInt(event.target.value);

    if (userInput > totalAttendees) {
      setLimit(totalAttendees); // Set limit to the total number of attendees obtained from API
    } else {
      setLimit(userInput);
    }
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      <label>
        Limit:
        <input type="number" min="1" value={limit} onChange={handleLimitChange} />
      </label>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Points</th>
            <th>Discord</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(({ id, points, discord }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{points}</td>
              <td>{discord}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
