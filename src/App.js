import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const fetchUserData = (username) => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then((userData) => {
        setUser(userData);
        return fetch(`https://api.github.com/users/${username}/repos`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Problem u dohvatu repozitorija');
        }
        return response.json();
      })
      .then((reposData) => {
        setRepos(reposData);
      })
      .catch((error) => {
        setError(error.message);
        setUser(null);
        setRepos([]);
      });
  };

  const handleReset = () => {
    setUser(null);
    setRepos([]);
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Podaci O Korisniku</h1>
        {!user ? (
          <UserForm onSubmit={fetchUserData} />
        ) : (
          <UserDetails user={user} repos={repos} onReset={handleReset} />
        )}
        {error && <p>{error}</p>}
      </header>
    </div>
  );
};

export default App;
