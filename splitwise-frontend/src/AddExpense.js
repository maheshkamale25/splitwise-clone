import React, { useState, useEffect } from "react";
import axios from "axios";

const AddExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [groupId, setGroupId] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all users to show checkboxes
  useEffect(() => {
    axios.get("http://localhost:8000/users/")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Failed to load users", err));
  }, []);

  const handleCheckboxChange = (id) => {
    if (userIds.includes(id)) {
      setUserIds(userIds.filter(uid => uid !== id));
    } else {
      setUserIds([...userIds, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      description,
      amount: parseFloat(amount),
      paid_by: parseInt(paidBy),
      group_id: parseInt(groupId),
      split_type: "equal",
      user_ids: userIds.map(id => parseInt(id))
    };

    try {
      const res = await axios.post("http://localhost:8000/expenses/equal", payload);
      setMessage("✅ Expense added successfully!");
      console.log("Expense added:", res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add expense.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Add Equal Split Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Description"
          className="w-full px-3 py-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full px-3 py-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Paid By (User ID)"
          className="w-full px-3 py-2 border rounded"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Group ID"
          className="w-full px-3 py-2 border rounded"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          required
        />

        <div className="mb-4">
          <label className="font-medium">Select Users:</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {users.map((user) => (
              <label key={user.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={userIds.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
                <span>{user.name || `User ${user.id}`}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          Add Expense
        </button>
      </form>
      {message && <div className="mt-4 text-center text-sm font-medium">{message}</div>}
    </div>
  );
};

export default AddExpense;
