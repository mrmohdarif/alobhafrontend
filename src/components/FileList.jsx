import React from 'react';
import API from '../services/api';
function FileList({ repo}) {
  console.log('repoName', repo);
  
  const [files, setfiles] = React.useState([]);
    const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  

  

   const fetchReposFiles = async () => {
      const res = await API.post('/files/list',{id: repo._id});
      console.log('Fetched Repositories:', res.data);
      
      setfiles(res.data);
    };
    React.useEffect(() => {
        
      
      fetchReposFiles();
      console.log('Repositories fetchedffff:', files);
      
    }, []);

 const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('filename', selectedFile.name);
    formData.append('repository', repo._id); // Assuming repo._id is the repository ID
    console.log('formData', formData);
  

    try {
      await API.post(`/files/upload`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }});

      alert('File uploaded successfully!');
      setSelectedFile(null);
      fetchReposFiles(); // refresh file list
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

 const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(repo._id);
    
  };
  const handlefiledownload= async (file,v) => {
    console.log('file', file);
    
    console.log('version', v);
    try {
      const response = await API.get(`/files/download/${file._id}/${v.versionNumber}`, {
        responseType: 'blob', // Important for downloading files
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.filename); // Set the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
    
  }
   const styles={actionButton: {
    padding: '6px 14px',
    marginRight: '10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }}
console.log("files",files) 
  return (
    <div style={{ marginLeft: '20px', marginTop: '10px' }}>
      <h4>📄 Files in {repo.name}</h4>
                  <input
        type="file"
        ref={fileInputRef}
        style={{ marginLeft: '10px' }}
        onChange={handleFileChange}
      />
      <button onClick={handleFileUpload} style={{ marginLeft: '10px' }}>
        ➕ Upload New Version
      </button>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <strong>{file.filename} {file.repository}</strong>


            <ul >
              {file?.versions.map((v) => (
                <li key={v.version} style={{marginBottom: '10px'}}>
                   Version {v.versionNumber} - Uploaded on { new Date(v.uploadedAt).toLocaleString()}
                 &nbsp; <button style={styles.actionButton} onClick={()=>handlefiledownload(file,v)}>Download</button>

                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
