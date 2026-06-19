import { Navbar } from "../components/components";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import {
  motion
} from "framer-motion";

export default function App() {

  const [isLoading, setIsLoading] = useState(true);


  // Scroll to top when loading finishes
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  const handleReady = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading overlay */}
      {isLoading && <LoadingScreen />}
      {/* Main content - hidden while loading */}
      <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s" }}>
        <Navbar />
        <Home onReady={handleReady} />
      </div>

    </>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-950">
      <div
        className="mb-6 text-6xl font-black tracking-widest text-white"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        TEVINA
      </div>
      <div className="h-1 w-64 overflow-hidden rounded-full bg-gray-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#0072BC] to-[#00A8E8]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
      <p className="mt-4 text-xs tracking-[0.3em] text-gray-500 uppercase">
        Loading
      </p>
    </div>
  );
}