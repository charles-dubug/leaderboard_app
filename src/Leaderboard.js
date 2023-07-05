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
    <div style={{ backgroundColor:'#03a9f46b', marginTop:"-30px"}}>
      <h1 style={{textAlign:"center",paddingTop: "30px"}}>Leaderboard</h1>
      <label style={{paddingLeft:"50px"}}>
        <p style={{marginLeft:"50px",fontSize:"30px",fontWeight:"bold"}}>Number of Attendees to Display:
        <input type="number" min="1" value={limit} onChange={handleLimitChange} style={{marginLeft:"30px",textAlign:"center",width:"80px",height:"20px"}} />
        </p>
      </label>
      <table style={{paddingLeft:"50px",paddingTop:"20px",borderSpacing:"12em 1em"}}>
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
              <td style={{textAlign:"center"}}>{id}</td>
              <td style={{textAlign:"center"}}>{points}</td>
              <td style={{textAlign:"center"}}>{discord}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
