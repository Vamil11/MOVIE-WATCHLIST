import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setItems(JSON.parse(saved));
    }
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!newTitle.trim()) return;

    const newItem = {
      id: Date.now(),
      title: newTitle.trim(),
      watched: false,
    };

    setItems([...items, newItem]);
    setNewTitle('');
    inputRef.current.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addItem();
  };

  const toggleWatched = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, watched: !item.watched } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <h1>🎬 Watchlist Organizer</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a movie/show title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          ref={inputRef}
        />
        <button onClick={addItem}>➕ Add</button>
      </div>

      {items.length === 0 ? (
        <p className="empty-msg">Your watchlist is empty. Start adding titles! 🍿</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <span className={item.watched ? 'watched' : ''}>
                {item.title}
              </span>
              <div className="btn-group">
                <button onClick={() => toggleWatched(item.id)}>
                  {item.watched ? '✅ Already Watched' : '🎯 Need to Watch'}
                </button>
                <button className="delete" onClick={() => removeItem(item.id)}>🗑️ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
