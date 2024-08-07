import React from 'react';
import { Film, Tv } from 'lucide-react';

const ShowList = ({ shows, users, onUpdateStatus }) => {
  return (
    <div className="space-y-4">
      {shows.map(show => (
        <div key={show.id} className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold">{show.title}</h3>
          <p>{show.type === 'movie' ? <Film className="inline mr-2" /> : <Tv className="inline mr-2" />} {show.type}</p>
          <div className="mt-2">
            {users.map(user => {
              const dbIndex = show.status.findIndex(s => user.id === s.user);
              return (
              <div key={user.id} className="flex items-center space-x-2">
                <span>{user.name}</span>
                <select 
                  value={show.status[dbIndex].status}
                  onChange={(e) => onUpdateStatus(show.id, user.id, dbIndex, e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="tbd">TBD</option>
                  <option value="want">Want to Watch</option>
                  <option value="dont">Don't Want to Watch</option>
                  <option value="watched">Watched</option>
                </select>
              </div>
            );})}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowList;
