import React from 'react';
import { Film, Tv } from 'lucide-react';

const ShowList = ({ shows, users, onUpdateStatus }) => {
  return (
    <div className="space-y-4">
      {shows.map(show => (
        <div key={show.id} className="bg-white border border-cool-200 rounded-lg shadow-md overflow-hidden">
          <div className={`p-4 ${show.type === 'movie' ? 'bg-cool-100' : 'bg-lavender-100'}`}>
            <h3 className="text-lg font-semibold text-cool-800">{show.title}</h3>
            <p className="text-cool-600">
              {show.type === 'movie' ? <Film className="inline mr-2" /> : <Tv className="inline mr-2" />} 
              {show.type}
            </p>
          </div>
          <div className="p-4">
            {users.map(user => {
              const dbIndex = show.status.findIndex(s => user.id === s.user);
              return (
              <div key={user.id} className="flex items-center justify-between py-2 border-b border-cool-100 last:border-b-0">
                <span className="text-cool-700">{user.name}</span>
                <select 
                  value={show.status[dbIndex].status}
                  onChange={(e) => onUpdateStatus(show.id, user.id, e.target.value)}
                  className="px-2 py-1 border border-cool-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cool-500 focus:border-cool-500"
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
