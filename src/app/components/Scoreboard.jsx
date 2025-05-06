"use client"

import { useState, useEffect } from "react"
import { Edit2, Check } from "lucide-react"
import Header from "./Header"

export default function ScoreCounter() {
  const [player1Score, setPlayer1Score] = useState(1)
  const [player2Score, setPlayer2Score] = useState(1)
  const [player1Name, setPlayer1Name] = useState("player 1")
  const [player2Name, setPlayer2Name] = useState("player 2")
  const [editingPlayer1, setEditingPlayer1] = useState(false)
  const [editingPlayer2, setEditingPlayer2] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedPlayer1Name = localStorage.getItem("player1Name")
    const storedPlayer2Name = localStorage.getItem("player2Name")
    const storedPlayer1Score = localStorage.getItem("player1Score")
    const storedPlayer2Score = localStorage.getItem("player2Score")

    if (storedPlayer1Name) setPlayer1Name(storedPlayer1Name)
    if (storedPlayer2Name) setPlayer2Name(storedPlayer2Name)
    if (storedPlayer1Score) setPlayer1Score(parseInt(storedPlayer1Score, 10))
    if (storedPlayer2Score) setPlayer2Score(parseInt(storedPlayer2Score, 10))
  }, [])

  // Save player names and scores to localStorage when they change
  useEffect(() => {
    localStorage.setItem("player1Name", player1Name)
  }, [player1Name])

  useEffect(() => {
    localStorage.setItem("player2Name", player2Name)
  }, [player2Name])

  useEffect(() => {
    localStorage.setItem("player1Score", player1Score.toString())
  }, [player1Score])

  useEffect(() => {
    localStorage.setItem("player2Score", player2Score.toString())
  }, [player2Score])

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
    <div className="relative min-h-screen text-white">
      {/* Header */}

      <header className="fixed top-0 left-0 w-full ">
        <Header/>
      </header>
      {/* Main container */}
      <div className="flex flex-col min-h-[calc(100vh-80px)] w-full mt-20 pt-16">
        {/* Player labels */}
        <div className={`flex w-full border-b border-gray-700 ${isMobile ? "flex-col" : ""}`}>
          {/* Player 2 */}
          <div
            className={`flex justify-center py-4 relative ${isMobile ? "w-full border-b" : "w-1/2 border-r"} border-gray-700`}
          >
            {editingPlayer2 ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  className="bg-transparent text-2xl md:text-4xl font-bold text-yellow-400 text-center border-b border-yellow-400 focus:outline-none"
                  autoFocus
                />
                <button onClick={toggleEditPlayer2} className="ml-2 text-white">
                  <Check size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <h2 className="text-2xl md:text-4xl font-bold text-yellow-400">{player2Name}</h2>
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
                  className="bg-transparent text-2xl md:text-4xl font-bold text-yellow-400 text-center border-b border-yellow-400 focus:outline-none"
                  autoFocus
                />
                <button onClick={toggleEditPlayer1} className="ml-2 text-white">
                  <Check size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <h2 className="text-2xl md:text-4xl font-bold text-yellow-400">{player1Name}</h2>
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
            className={`flex items-center justify-center ${isMobile ? "w-full h-1/2 border-b" : "w-1/2 border-r"} border-gray-700`}
          >
            <div className="flex items-center gap-4 md:gap-6 py-6">
              <button onClick={() => decrementScore("player2")} className="text-3xl md:text-5xl font-bold text-white">
                &lt;
              </button>
              <span className="text-6xl md:text-9xl font-bold text-yellow-400">{player2Score}</span>
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
              <span className="text-6xl md:text-9xl font-bold text-yellow-400">{player1Score}</span>
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