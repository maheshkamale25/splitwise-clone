import React, { useState } from "react";
import axios from "axios";

function ViewBalances() {
  const [userId, setUserId] = useState("");
  const [balances, setBalances] = useState([]);

  const fetchBalances = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/${userId}/balances`);
      setBalances(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch balances");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow col-span-2">
      <h2 className="text-xl font-semibold mb-2">Personal Balance Summary</h2>
      <input className="w-full border p-2 mb-2" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <button className="bg-purple-500 text-white px-4 py-2 rounded mb-4" onClick={fetchBalances}>View Balances</button>

      {balances.length > 0 && (
        <ul className="list-disc pl-5">
          {balances.map((b, i) => (
            <li key={i}>
              User <strong>{b.user_id}</strong> owes ₹{b.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewBalances;
