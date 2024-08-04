import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import AddShowForm from './components/AddShowForm';
import FilterForm from './components/FilterForm';
import ShowList from './components/ShowList';

const WatchTogetherApp = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Celia' },
    { id: 3, name: 'Gabe' }
  ]);

  const [shows, setShows] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      type: "movie",
      status: users.map(user => ({ user: user.id, status: 'tbd' }))
    },
    {
      id: 2,
      title: "Stranger Things",
      type: "tv",
      status: users.map(user => ({ user: user.id, status: 'tbd' }))
    },
    {
      id: 3,
      title: "The Grand Budapest Hotel",
      type: "movie",
      status: users.map(user => ({ user: user.id, status: 'tbd' }))
    }
  ]);

  const [filters, setFilters] = useState({
    users: users.map(user => user.id),
    status: 'all',
    type: 'all'
  });

  const addShow = (show) => {
    setShows([...shows, { ...show, status: users.map(user => ({ user: user.id, status: 'tbd' })) }]);
  };

  const updateShowStatus = (showId, userId, status) => {
    setShows(shows.map(show => 
      show.id === showId 
        ? { ...show, status: show.status.map(s => s.user === userId ? { ...s, status } : s) }
        : show
    ));
  };

  const filteredShows = shows.filter(show => {
    return (
      (filters.type === 'all' || show.type === filters.type) &&
      (filters.status === 'all' || show.status.every(s => 
        filters.users.includes(s.user) && 
        (filters.status === 'all' || s.status === filters.status)
      )) &&
      show.status.some(s => filters.users.includes(s.user))
    );
  });
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Watch-Together</h1>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Welcome to Watch-Together!</AlertTitle>
        <AlertDescription>
          Add shows, set your preferences, and find what to watch next with your friends.
        </AlertDescription>
      </Alert>

      <div className="mt-4 space-y-4">
        <AddShowForm onAddShow={addShow} />
        <FilterForm filters={filters} setFilters={setFilters} users={users} />
        <ShowList shows={filteredShows} users={users} onUpdateStatus={updateShowStatus} />
      </div>
    </div>
  );
};

export default WatchTogetherApp;
