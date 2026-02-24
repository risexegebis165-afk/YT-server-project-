import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  // Netlify Environment Variable থেকে API Key নেবে
  const API_KEY = import.meta.env.VITE_YT_API_KEY; 

  const searchVideos = async () => {
    if (!query) return;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error("Error:", error);
      alert("API Key missing or error!");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center', background: '#f4f4f4', minHeight: '100vh' }}>
      <h1 style={{ color: '#ff0000' }}>YouTube Search</h1>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search videos..."
        style={{ padding: '12px', width: '70%', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button onClick={searchVideos} style={{ padding: '12px 20px', marginLeft: '10px', background: '#ff0000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Search
      </button>

      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {videos.map((video) => (
          <div key={video.id.videoId} style={{ background: '#fff', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img src={video.snippet.thumbnails.medium.url} alt="thumb" style={{ width: '100%', borderRadius: '5px' }} />
            <h4 style={{ fontSize: '16px', margin: '10px 0' }}>{video.snippet.title}</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>{video.snippet.channelTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
