import React, { useState } from 'react';
import axios from 'axios';

export default function CreateGroup() {
  const [name, setName] = useState('');
  const [userIds, setUserIds] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ids = userIds.split(',').map(id => parseInt(id.trim()));
    try {
      await axios.post('http://127.0.0.1:8000/groups/', {
        name,
        user_ids: ids,
      });
      alert("Group created successfully");
      setName('');
      setUserIds('');
    } catch (err) {
      console.error(err);
      alert("Failed to create group");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="User IDs (e.g. 1,2,3)"
          value={userIds}
          onChange={(e) => setUserIds(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}
