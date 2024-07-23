import React from "react";
import Leaderboard from "./components/Leaderboard";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App: React.FC = () => {

  return (
    <div className="flex justify-center items-center h-full max-w-screen bg-[#232020] overflow-x-hidden no-scrollbar">
      <div className="bg-white">
        <Header></Header>
        <Leaderboard />
        <Footer />
      </div>
    </div>
  );
};

export default App;
