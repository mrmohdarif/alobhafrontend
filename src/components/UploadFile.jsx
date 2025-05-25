import React, { useState } from 'react';
import API from '../services/api';

function UploadFile({ repoId }) {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');

  const addRepo = () => {
    if (!newRepoName) {
      alert("Please enter a repository name.");
      return;
    }

    const newRepo = { id: repos.length + 1, name: newRepoName };
    setRepos([...repos, newRepo]);
    setNewRepoName('');
  };

  return (
    <div>
      <input placeholder="File Name" onChange={(e) => setFilename(e.target.value)} />
      <button onClick={addRepo}>➕ Create Repository</button>
    </div>
  );
}

export default UploadFile;
