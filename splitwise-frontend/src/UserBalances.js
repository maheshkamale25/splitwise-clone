import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserBalances = () => {
  const { userId } = useParams();
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/users/${userId}/balances`);
        setBalances(res.data);
      } catch (err) {
        console.error("Failed to fetch balances:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBalances();
  }, [userId]);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Balances for User {userId}</h2>
      {balances.length === 0 ? (
        <p className="text-gray-500 text-center">No balances found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {balances.map((bal, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span className="font-medium">Group {bal.group_id}</span>
              <span>
                ₹{Math.abs(bal.balance)}{" "}
                {bal.status === "owes" ? (
                  <span className="text-red-500">(You owe)</span>
                ) : bal.status === "gets" ? (
                  <span className="text-green-600">(You get)</span>
                ) : (
                  <span className="text-gray-600">(Settled)</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBalances;
