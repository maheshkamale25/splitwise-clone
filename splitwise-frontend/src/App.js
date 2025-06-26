import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import CreateGroup from "./CreateGroup";
import AddExpense from "./AddExpense";
import GroupList from "./GroupList";
import GroupBalances from "./GroupBalances";
import UserBalances from "./UserBalances";
import Chatbot from "./chatBot";

// Page transition animation variants
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -30 },
};

const pageTransition = {
  duration: 0.5,
  ease: "easeInOut",
};

// Animated Route Wrapper
const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                  <CreateGroup />
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                  <AddExpense />
                </div>
              </div>
            </AnimatedPage>
          }
        />
        <Route
          path="/add-expense"
          element={
            <AnimatedPage>
              <div className="bg-white p-6 rounded-xl shadow">
                <AddExpense />
              </div>
            </AnimatedPage>
          }
        />
        <Route
          path="/groups"
          element={
            <AnimatedPage>
              <GroupList />
            </AnimatedPage>
          }
        />
        <Route
          path="/group-balances/:groupId"
          element={
            <AnimatedPage>
              <GroupBalances />
            </AnimatedPage>
          }
        />
        <Route
          path="/user-balances/:userId"
          element={
            <AnimatedPage>
              <UserBalances />
            </AnimatedPage>
          }
        />
        <Route
          path="/chatbot"
          element={
            <AnimatedPage>
              <Chatbot />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md p-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight mb-2 md:mb-0">💸 Splitwise Clone</h1>
          <nav className="space-x-4 text-lg">
            <Link to="/" className="text-blue-600 hover:text-blue-800 transition">Home</Link>
            <Link to="/add-expense" className="text-blue-600 hover:text-blue-800 transition">Add Expense</Link>
            <Link to="/groups" className="text-blue-600 hover:text-blue-800 transition">Groups</Link>
            <Link to="/user-balances/1" className="text-blue-600 hover:text-blue-800 transition">My Balance</Link>
            <Link to="/chatbot" className="text-blue-600 hover:text-blue-800 transition">Chatbot 🤖</Link>
          </nav>
        </header>

        <main className="p-6 max-w-7xl mx-auto">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
