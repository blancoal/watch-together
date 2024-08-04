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
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {users.map(user => (
          <div key={user.id} className="flex items-center">
            <Checkbox
              id={`user-${user.id}`}
              checked={filters.users.includes(user.id)}
              onCheckedChange={() => handleUserToggle(user.id)}
            />
            <label htmlFor={`user-${user.id}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {user.name}
            </label>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <select 
          value={filters.type} 
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="all">All Types</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <select 
          value={filters.status} 
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="all">All Statuses</option>
          <option value="want">Want to Watch</option>
          <option value="dont">Don't Want to Watch</option>
          <option value="tbd">TBD</option>
        </select>
      </div>
    </div>
  );
};

export default FilterForm;
