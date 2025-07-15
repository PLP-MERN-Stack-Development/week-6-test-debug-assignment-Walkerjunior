import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/bugs';

function App() {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch bugs on load
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setBugs(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    const newBug = await res.json();
    setBugs([newBug, ...bugs]);
    setTitle('');
    setDescription('');
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setBugs(bugs.filter(bug => bug._id !== id));
  };

  const handleStatusChange = async (id, newStatus) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    const updated = await res.json();
    setBugs(bugs.map(b => (b._id === id ? updated : b)));
  };

  return (
    <div className="container">
      <h1>🐞 Bug Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Bug Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Report Bug</button>
      </form>

      <ul>
        {bugs.map(bug => (
          <li key={bug._id}>
            <strong>{bug.title}</strong> - {bug.status}
            <p>{bug.description}</p>
            <select
              value={bug.status}
              onChange={(e) => handleStatusChange(bug._id, e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <button onClick={() => handleDelete(bug._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
