import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [term, setTerm] = useState('');
  const [videos, setVideos] = useState([]);

  const onSearch = async (e) => {
    e.preventDefault();
    const API_KEY = import.meta.env.VITE_YT_API_KEY; // Netlify-তে এই কি (Key) সেট করবেন
    
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 12,
          key: API_KEY,
          q: term,
          type: 'video'
        }
      });
      setVideos(response.data.items);
    } catch (err) {
      alert("API Key missing or error fetching data!");
    }
  };

  return (
    <div style={{ background: '#f9f9f9', minHeight: '100vh', padding: '10px', textAlign: 'center' }}>
      <h2 style={{ color: '#ff0000' }}>YT Search Player</h2>
      <form onSubmit={onSearch}>
        <input 
          style={{ padding: '10px', width: '70%', borderRadius: '5px', border: '1px solid #ddd' }}
          value={term} 
          onChange={e => setTerm(e.target.value)} 
          placeholder="Search videos..." 
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '5px', background: '#ff0000', color: '#fff', border: 'none', borderRadius: '5px' }}>Search</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px', marginTop: '20px' }}>
        {videos.map(video => (
          <div key={video.id.videoId} style={{ background: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <img style={{ width: '100%' }} src={video.snippet.thumbnails.medium.url} alt="thumb" />
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
