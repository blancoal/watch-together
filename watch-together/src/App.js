import React, { useState, useEffect } from 'react';
import AddShowForm from './components/AddShowForm';
import AddUserForm from './components/AddUserForm';
import FilterForm from './components/FilterForm';
import ShowList from './components/ShowList';
import { ref, onValue, push, update } from 'firebase/database';
import { db } from './firebase';

const WatchTogetherApp = () => {
  const [users, setUsers] = useState([]);

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
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        })));
      }
    });
  }, []);

  useEffect(() =>
    setFilters({ ...filters, users: users.map(user => user.id) }), [users]
  )

  const addShow = (show) => {
    const showsRef = ref(db, 'shows');
    push(showsRef, {
      title: show.title,
      type: show.type,
      status: users.map(user => ({ user: user.id, status: 'tbd' }))
    });
  };

  const addUser = (name) => {
    const usersRef = ref(db, 'users');
    push(usersRef, {
      id: users.length+1,
      name
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
      <AddUserForm onAddUser={addUser} />
      <FilterForm filters={filters} setFilters={setFilters} users={users} />
        <ShowList shows={filteredShows} users={filteredUsers} onUpdateStatus={updateShowStatus} />
      </div>
    </div>
  );
};

export default WatchTogetherApp;
