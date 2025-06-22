// 起動コマンド: npm run dev

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MusicProvider } from "./context/MusicContext";
import SplashScreen from "./components/screens/SplashScreen";
import AlbumSelectionScreen from "./components/screens/AlbumSelectionScreen";
import AlbumDetailScreen from "./components/screens/AlbumDetailScreen";
import "./styles/index.css";

function App() {
  return (
    <MusicProvider>
      <Router>
        <div className="App min-h-screen bg-black text-white">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/albums" element={<AlbumSelectionScreen />} />
            <Route path="/album/:albumId" element={<AlbumDetailScreen />} />
          </Routes>
        </div>
      </Router>
    </MusicProvider>
  );
}

export default App;
