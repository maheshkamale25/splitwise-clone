import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GroupBalances = () => {
  const { groupId } = useParams();
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/expenses/group/${groupId}/balances`)
      .then(res => setBalances(res.data))
      .catch(err => console.error("Error loading balances", err));
  }, [groupId]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Group {groupId} Balances</h2>
      {balances.length === 0 ? (
        <p>No balances found.</p>
      ) : (
        <ul className="space-y-2">
          {balances.map((item, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded">
              <strong>User {item.from_user_id}</strong> owes <strong>User {item.to_user_id}</strong> ₹{item.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupBalances;
