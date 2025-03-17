"use client"

import { useState, useEffect } from "react"
import { Edit2, Check } from "lucide-react"

export default function ScoreCounter() {
  const [player1Score, setPlayer1Score] = useState(1)
  const [player2Score, setPlayer2Score] = useState(1)
  const [player1Name, setPlayer1Name] = useState("player 1")
  const [player2Name, setPlayer2Name] = useState("player 2")
  const [editingPlayer1, setEditingPlayer1] = useState(false)
  const [editingPlayer2, setEditingPlayer2] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const incrementScore = (player) => {
    if (player === "player1") {
      setPlayer1Score((prev) => prev + 1)
    } else {
      setPlayer2Score((prev) => prev + 1)
    }
  }

  const decrementScore = (player) => {
    if (player === "player1") {
      setPlayer1Score((prev) => Math.max(0, prev - 1))
    } else {
      setPlayer2Score((prev) => Math.max(0, prev - 1))
    }
  }

  const toggleEditPlayer1 = () => {
    setEditingPlayer1(!editingPlayer1)
  }

  const toggleEditPlayer2 = () => {
    setEditingPlayer2(!editingPlayer2)
  }

  return (
    <div  className="flex min-h-[calc(100vh-80px)] w-full text-white mt-20">
      {/* Main container */}
      <div className="flex w-full flex-col">
        {/* Player labels */}
        <div className={`flex w-full border-b border-white ${isMobile ? "flex-col" : ""}`}>
          {/* Player 2 */}
          <div
            className={`flex justify-center py-4 relative ${isMobile ? "w-full border-b" : "w-1/2 border-r"} border-white`}
          >
            {editingPlayer2 ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  className="bg-transparent text-2xl md:text-4xl font-bold text-[#f5a623] text-center border-b border-[#f5a623] focus:outline-none"
                  autoFocus
                />
                <button onClick={toggleEditPlayer2} className="ml-2 text-white">
                  <Check size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <h2 className="text-2xl md:text-4xl font-bold text-[#f5a623]">{player2Name}</h2>
                <button onClick={toggleEditPlayer2} className="ml-2 text-white opacity-50 hover:opacity-100">
                  <Edit2 size={16} />
                </button>
              </div>
            )}
          </div>
          {/* Player 1 */}
          <div className={`flex justify-center py-4 relative ${isMobile ? "w-full" : "w-1/2"}`}>
            {editingPlayer1 ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  className="bg-transparent text-2xl md:text-4xl font-bold text-[#f5a623] text-center border-b border-[#f5a623] focus:outline-none"
                  autoFocus
                />
                <button onClick={toggleEditPlayer1} className="ml-2 text-white">
                  <Check size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <h2 className="text-2xl md:text-4xl font-bold text-[#f5a623]">{player1Name}</h2>
                <button onClick={toggleEditPlayer1} className="ml-2 text-white opacity-50 hover:opacity-100">
                  <Edit2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Score counters */}
        <div className={`flex flex-grow w-full ${isMobile ? "flex-col" : ""}`}>
          {/* Player 2 score */}
          <div
            className={`flex items-center justify-center ${isMobile ? "w-full h-1/2 border-b" : "w-1/2 border-r"} border-white`}
          >
            <div className="flex items-center gap-4 md:gap-6 py-6">
              <button onClick={() => decrementScore("player2")} className="text-3xl md:text-5xl font-bold text-white">
                &lt;
              </button>
              <span className="text-6xl md:text-9xl font-bold text-[#f5a623]">{player2Score}</span>
              <button onClick={() => incrementScore("player2")} className="text-3xl md:text-5xl font-bold text-white">
                &gt;
              </button>
            </div>
          </div>

          {/* Player 1 score */}
          <div className={`flex items-center justify-center ${isMobile ? "w-full h-1/2" : "w-1/2"}`}>
            <div className="flex items-center gap-4 md:gap-6 py-6">
              <button onClick={() => decrementScore("player1")} className="text-3xl md:text-5xl font-bold text-white">
                &lt;
              </button>
              <span className="text-6xl md:text-9xl font-bold text-[#f5a623]">{player1Score}</span>
              <button onClick={() => incrementScore("player1")} className="text-3xl md:text-5xl font-bold text-white">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

