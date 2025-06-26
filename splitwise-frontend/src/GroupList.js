import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/groups/")
      .then(res => setGroups(res.data))
      .catch(err => console.error("Failed to fetch groups", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Groups</h2>
      {groups.map(group => (
        <div key={group.id} className="border-b py-4">
          <h3 className="text-lg font-semibold">{group.name}</h3>
          <p className="text-sm text-gray-600">Group ID: {group.id}</p>
          <p className="text-sm mt-1">User IDs: {group.user_ids?.join(', ') || "N/A"}</p>
          <Link
            to={`/group-balances/${group.id}`}
            className="inline-block mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            View Balances
          </Link>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
