import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Score {
  username: string;
  time: string; // MM:SS::MSS format
}

export interface LeaderboardState {
  scores: Score[];
  latestScore: Score | null; // Track the latest score
  latestIndex: number | null; // Track the index of the latest score
}

const loadStateFromLocalStorage = (): LeaderboardState | undefined => {
  try {
    const serializedState = localStorage.getItem("leaderboardState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

const saveStateToLocalStorage = (state: LeaderboardState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("leaderboardState", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const initialState: LeaderboardState = loadStateFromLocalStorage() || {
  scores: [
    { username: "Charlie", time: "00:00:15" },
    { username: "Diana", time: "00:15:00" },
    { username: "Heidi", time: "00:28:45" },
    { username: "Alice", time: "00:30:45" },
    { username: "Judy", time: "00:45:15" },
    { username: "Bob", time: "00:45:30" },
    { username: "Grace", time: "01:07:09" },
    { username: "Dasiy", time: "01:15:00" },
    { username: "Amina", time: "01:15:45" },
    { username: "Eve", time: "01:30:30" },
    { username: "Ivan", time: "01:38:20" },
    { username: "Alan", time: "01:39:45" },
    { username: "Akash", time: "01:45:15" },
    { username: "Julia", time: "01:46:15" },
    { username: "Gokul", time: "02:00:15" },

    
  ],
  latestScore: null,
  latestIndex: null,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<Score>) => {
      state.scores.push(action.payload);

      // Keep track of the latest score
      state.latestScore = action.payload;

      state.scores.sort((a, b) => (a.time > b.time ? 1 : -1));

      // Update the index of the latest score after sorting
      state.latestIndex = state.scores.findIndex(
        (score) =>
          score.username === state.latestScore?.username &&
          score.time === state.latestScore?.time
      );

      // Save the updated state to localStorage
      saveStateToLocalStorage(state);
    },
  },
});

export const { addScore } = leaderboardSlice.actions;

export const selectLatestEntry = (state: { leaderboard: LeaderboardState }) => {
  const { latestScore, latestIndex } = state.leaderboard;
  return { latestScore, latestIndex };
};

export default leaderboardSlice.reducer;