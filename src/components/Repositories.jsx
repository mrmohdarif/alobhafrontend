import React from 'react';
import FileList from './FileList';
import API from '../services/api';
import UpdateRepositoryName from './UpdateRepositoryName';
function Repositories() {
  const [newRepoName, setNewRepoName] = React.useState('');
  const [repos, setRepos] = React.useState([]);
  const [createRepo,setCreateRepo] = React.useState("");
  const [status, setStatus] = React.useState(false); // For status messages
const fetchRepos = async () => {
    const res = await API.post('/repos/getrepos');
    console.log('Fetched Repositories:', res.data);
    setRepos(res.data);
  };

  React.useEffect(() => {
    console.log('Fetching repositories...');
    
    fetchRepos();
    console.log('Repositories fetched:', repos);
    
  }, [createRepo ,status]);
  const addRepo = async () => {
    if (!newRepoName) {
      alert("Please enter a repository name.");
      return;
    }
    const response= await API.post('/repos/create', { name: newRepoName });
    try{
      const newRepo = response.data;
     setCreateRepo(newRepo)
      

    }
    catch (error) {
      console.error('Error creating repository:', error);
      alert('Failed to create repository. Please try again.');
      return;
    }
     
     
    console.log('New repository created:', newRepoName);
    setNewRepoName('');
  };

  const renameRepo = (id) => {
    const updated = repos.map(repo =>
      repo.id === id ? { ...repo, name: `${repo.name} (Renamed)` } : repo
    );
    setRepos(updated);
  };

  const deleteRepo = async (id) => {
    const res=await  API.delete(`/repos/${id}`);

    console.log("====>",res)
    if(res.data) {
      alert('repository delete . ');
      setStatus(prev=>!prev)
      return;
    }
   
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>📁 Repositories</h3>

      <div style={styles.inputSection}>
        <input
          placeholder="New repository name"
          value={newRepoName}
          onChange={(e) => setNewRepoName(e.target.value)}
          style={styles.input}
        />
        <button onClick={addRepo} style={styles.createButton}>➕ Create Repository</button>
      </div>
      
      <div>
        {repos.map((repo) => (
          <div key={repo.id} style={styles.repoCard}>
            <h4 style={styles.repoName}>{repo.name} {repo._id}</h4>
            <div style={styles.buttonGroup}>
              <UpdateRepositoryName 
               repositoryId={repo._id}
               currentName={repo.name}
                onUpdate={fetchRepos}
      />
              <button onClick={() => deleteRepo(repo._id)} style={{ ...styles.actionButton, backgroundColor: '#ff5c5c' }}>🗑️ Delete</button>
            </div>
            <FileList repo={repo}/>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '20px',
  },
  heading: {
    color: '#333',
    marginBottom: '10px',
  },
  inputSection: {
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px',
  },
  createButton: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  repoCard: {
    border: '1px solid #ccc',
    margin: '10px 0',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 6px rgba(0,0,0,0.05)',
  },
  repoName: {
    margin: '0 0 10px 0',
    color: '#222',
  },
  buttonGroup: {
    marginBottom: '15px',
  },
  actionButton: {
    padding: '6px 14px',
    marginRight: '10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Repositories;
