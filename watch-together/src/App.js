import React, { useState, useEffect } from 'react';
import AddShowForm from './components/AddShowForm';
import FilterForm from './components/FilterForm';
import ShowList from './components/ShowList';
import { ref, onValue, push, update } from 'firebase/database';
import { db } from './firebase';

const WatchTogetherApp = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Celia' },
    { id: 3, name: 'Gabe' }
  ]);

  const [shows, setShows] = useState([]);

  const [filters, setFilters] = useState({
    users: users.map(user => user.id),
    status: 'all',
    type: 'all'
  });

  useEffect(() => {
    const showsRef = ref(db, 'shows');
    onValue(showsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setShows(Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        })));
      }
    });
  }, []);

  const addShow = (show) => {
    const showsRef = ref(db, 'shows');
    push(showsRef, {
      title: show.title,
      type: show.type,
      status: users.map(user => ({ user: user.id, status: 'tbd' }))
    });
  };

  const updateShowStatus = (showId, userId, dbIndex, status) => {
    const showRef = ref(db, `shows/${showId}/status`);
    update(showRef, {
      [dbIndex]: { user: userId, status }
    });
  };

  const typeFilteredShows = shows.filter(show => {
    return (
      (filters.type === 'all' || show.type === filters.type)
    );
  });
  const filteredShows = typeFilteredShows.filter(show =>
  (filters.status === 'all' ||
    filters.users.every(u => show.status.some(s =>
      s.user === u && s.status === filters.status)
    )));

  const filteredUsers = users.filter(user => filters.users.includes(user.id));

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Watch-Together</h1>

      <div className="mt-4 space-y-4">
        <AddShowForm onAddShow={addShow} />
        <FilterForm filters={filters} setFilters={setFilters} users={users} />
        <ShowList shows={filteredShows} users={filteredUsers} onUpdateStatus={updateShowStatus} />
      </div>
    </div>
  );
};

export default WatchTogetherApp;
