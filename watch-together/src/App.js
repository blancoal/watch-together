import React, { useState, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import AddShowForm from './components/AddShowForm';
import AddUserForm from './components/AddUserForm';
import FilterForm from './components/FilterForm';
import ShowList from './components/ShowList';
import CollapsibleSection from './components/CollapsibleSection';
import { ref, onValue, push, update } from 'firebase/database';
import { database, initializeAuth } from './firebase';

const userLoginFF = true;
const serverAdminAuthFF = false;

const WatchTogetherApp = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log({user, loading, error});

  const authError = useRef(undefined);

  useEffect(() => {
    if (serverAdminAuthFF) {
      try {
        initializeAuth();
        authError.current = undefined;
      } catch (e) { authError.current = e; }
    }
  }, []);

  const [users, setUsers] = useState([]);

  const [shows, setShows] = useState([]);

  const [filters, setFilters] = useState({
    users: users.map(user => user.id),
    status: 'all',
    type: 'all'
  });

  useEffect(() => {
    if (!authError.current || user) {
      const showsRef = ref(database, 'shows');
      onValue(showsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setShows(Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value
          })));
        }
      });
      const usersRef = ref(database, 'users');
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUsers(Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value
          })));
        }
      });
    }
  }, [authError, user]);

  useEffect(() => {
    if (!authError.current) {
      setFilters({ ...filters, users: users.map(user => user.id) })
    }
  }, [users, filters, authError]
  )

  const addShow = (show) => {
    const showsRef = ref(database, 'shows');
    push(showsRef, {
      title: show.title,
      type: show.type,
      status: users.map(user => ({ user: user.id, status: 'tbd' }))
    });
  };

  const addUser = (name) => {
    const usersRef = ref(database, 'users');
    push(usersRef, {
      id: users.length + 1,
      name
    });
  };

  const updateShowStatus = (showId, userId, dbIndex, status) => {
    const showRef = ref(database, `shows/${showId}/status`);
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

  // Apply dark mode class to root element
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user) {
    return <Login />;
  }

  return (
    <div>
      {authError.current}
      <div className="min-h-screen bg-gradient-to-br from-cool-900 to-lavender-900 text-cool-100">
        <div className="p-4 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center text-cool-100">Watch-Together</h1>
          {userLoginFF &&
            <>
              <h1>Welcome, {user.email}!</h1>
              <button onClick={() => auth.signOut()}>Sign Out</button>
            </>}
          <CollapsibleSection title="Add New">
            <div className="bg-cool-800 rounded-lg shadow-lg p-6 mb-6">
              <AddShowForm onAddShow={addShow} />
              <AddUserForm onAddUser={addUser} />
            </div>
          </CollapsibleSection>

          <div className="bg-cool-800 rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-semibold text-lavender-300">Filters</h3>
            <FilterForm filters={filters} setFilters={setFilters} users={users} />
          </div>

          <div className="bg-cool-800 rounded-lg shadow-lg p-6">
            <ShowList shows={filteredShows} users={filteredUsers} onUpdateStatus={updateShowStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchTogetherApp;
