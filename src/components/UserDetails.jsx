import React from 'react';

const UserDetails = ({ user, repos, onReset }) => {
  return (
    <div>
      <img src={user.avatar_url} alt="Avatar" width="150" height="150" />
      <h2>{user.name}</h2>
      <p><strong>Location:</strong> {user.location}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
      <h3>Repositories:</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default UserDetails;