import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLatestEntry, addScore } from "../store/leaderboardSlice";
import AddScorePopup from "./AddScorePopup";
import { RootState } from "../store/store";
import { IoTrophy } from "react-icons/io5";
import bgImg from "../assets/bgImg.png";
import "./Leaderboard.css";

const Leaderboard: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { latestScore, latestIndex } = useSelector(selectLatestEntry);
  const scores = useSelector((state: RootState) => state.leaderboard.scores);
  const latestEntryRef = useRef<HTMLLIElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (latestEntryRef.current) {
      latestEntryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [latestIndex]);

  const handleAddScore = (username: string, time: string) => {
    dispatch(addScore({ username, time }));
    setShowPopup(false);
  };

  return (
    <div
      className="leaderboard-container"
      style={{
        backgroundImage: `url(${bgImg})`,
        height: "100%",
        width: "100%",
      }}
    >
      <div className="leaderboard-header">
        <IoTrophy className="icon" />
        <div className="header-content">
          <span>Name</span>
        
        </div>
        <div className="header-time">
          <span>Time</span>

        </div>
      </div>

      <ul className="leaderboard-list">
        {scores.map((score, index) => (
          <li
            key={index}
            ref={index === latestIndex ? latestEntryRef : null}
            className={`leaderboard-item ${index === 0
              ? "gold"
              : index === 1
                ? "silver"
                : index === 2
                  ? "bronze"
                  : index === latestIndex
                    ? "latest"
                    : "default"
              }`}
          >
            <div className="rank-container">
              <span
                className={`rank ${index === 0
                  ? "gold"
                  : index === 1
                    ? "silver"
                    : index === 2
                      ? "bronze"
                      : "default"
                  }`}
              >
                {index + 1}
              </span>
              <div className="details">
                <span>{score.username}</span>
                <div className="score-details">
                  <span className="prize">
                    {index === 0
                      ? "₹50000"
                      : index === 1
                        ? "₹5000"
                        : index === 2
                          ? "₹500"
                          : ""}
                  </span>
                  <span>{score.time}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="sticky-footer">
        <div className="recent-entry">
          {latestIndex ? (
            <h1>RECENT ENTRY</h1>
          ) : (
            <span>No recent entries</span>
          )}
          <button onClick={() => setShowPopup(true)}>Add Score</button>
        </div>
        {latestIndex ? (
          <div className="recent-entry-details">
            <span className="rank">{latestIndex + 1}</span>
            <div className="details">
              <span>{latestScore?.username}</span>
              <span>{latestScore?.time}</span>
            </div>
          </div>
        ) : null}
      </div>
      {showPopup && <AddScorePopup onAddScore={handleAddScore} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Leaderboard;