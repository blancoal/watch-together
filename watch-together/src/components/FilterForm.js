import React from 'react';
import { Checkbox } from '../ui/checkbox';

const FilterForm = ({ filters, setFilters, users }) => {
  const handleUserToggle = (userId) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      users: prevFilters.users.includes(userId)
        ? prevFilters.users.filter(id => id !== userId)
        : [...prevFilters.users, userId]
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-cool-700 p-4 rounded-md">
        <div className="flex flex-wrap items-center gap-4">
          {users.map(user => (
            <div key={user.id} className="flex items-center">
              <Checkbox
                id={`user-${user.id}`}
                checked={filters.users.includes(user.id)}
                onCheckedChange={() => handleUserToggle(user.id)}
                className="border-cool-400 text-lavender-300 focus:ring-lavender-400"
              />
              <label htmlFor={`user-${user.id}`} className="ml-2 text-sm font-medium text-cool-200">
                {user.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <select 
          value={filters.type} 
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="w-full sm:w-auto px-3 py-2 border border-cool-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cool-400 focus:border-cool-400 bg-cool-700 text-cool-100"
        >
          <option value="all">All Types</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <select 
          value={filters.status} 
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="w-full sm:w-auto px-3 py-2 border border-cool-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cool-400 focus:border-cool-400 bg-cool-700 text-cool-100"
        >
          <option value="all">All Statuses</option>
          <option value="want">Want to Watch</option>
          <option value="dont">Don't Want to Watch</option>
          <option value="watched">Watched</option>
          <option value="tbd">TBD</option>
        </select>
      </div>
    </div>
  );
};

export default FilterForm;
