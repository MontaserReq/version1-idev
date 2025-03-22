'use client';
import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import questionsData from "./questions.json";
import Header from "./Header";

const QuizPage = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    universityId: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const quizSubmitted = localStorage.getItem("quizSubmitted");
    if (quizSubmitted) {
      setQuizFinished(true);
      return;
    }

    const easyQuestions = questionsData.questions.filter((q) => q.difficulty === "easy");
    const mediumQuestions = questionsData.questions.filter((q) => q.difficulty === "medium");
    const hardQuestions = questionsData.questions.filter((q) => q.difficulty === "hard");

    const selectedQuestions = [
      ...easyQuestions.sort(() => 0.5 - Math.random()).slice(0, 5),
      ...mediumQuestions.sort(() => 0.5 - Math.random()).slice(0, 3),
      ...hardQuestions.sort(() => 0.5 - Math.random()).slice(0, 2),
    ];

    setQuestions(selectedQuestions);
  }, []);

  useEffect(() => {
    if (currentQuestion >= 0) {
      setTimeLeft(10);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            handleTimeout(); // عند وصول الوقت للصفر، يتم الانتقال إلى السؤال التالي تلقائيًا
          }
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestion]);

  const handleAnswer = async (choice: any) => {
    setSelectedAnswer(choice);
    const correctAnswer = questions[currentQuestion].answer;
    const points = choice === correctAnswer ? 1 + timeLeft : 0;

    if (choice === correctAnswer) {
      setScore(score + points);
    }

    await fetch("/api/quiz-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userInfo.userName,
        email: userInfo.email,
        universityId: userInfo.universityId,
        question: questions[currentQuestion].question,
        selectedAnswer: choice,
        correctAnswer: correctAnswer,
        timeTaken: 10 - timeLeft,
        points: points,
      }),
    });

    transitionToNextQuestion();
  };

  const handleTimeout = async () => {
    await fetch("/api/quiz-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userInfo.userName,
        email: userInfo.email,
        universityId: userInfo.universityId,
        question: questions[currentQuestion].question,
        selectedAnswer: null,
        correctAnswer: questions[currentQuestion].answer,
        timeTaken: 10,
        points: 0,
      }),
    });

    transitionToNextQuestion();
  };

  const transitionToNextQuestion = () => {
    setShowCountdown(true);
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      setShowCountdown(false);
      nextQuestion();
    }, 3000);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < 10) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
      localStorage.setItem("quizSubmitted", "true");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.userName && userInfo.email && userInfo.universityId) {
      setIsRegistered(true);
      setTimeout(() => nextQuestion(), 1000);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen text-white p-6 text-center ">
        {showCountdown ? (
          <h1 className="text-3xl font-bold text-yellow-400 card">{countdown}</h1>
        ) : !isRegistered ? (
          <form onSubmit={handleFormSubmit} className="w-full max-w-lg card-q p-6 bg-[#293340] rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h1>
            <input
              type="text"
              placeholder="الاسم الكامل"
              className="card-f w-full p-3 mb-3 rounded-md bg-[#1e2227] card text-white"
              onChange={(e) => setUserInfo({ ...userInfo, userName: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="card-f w-full p-3 mb-3 rounded-md bg-[#1e2227] card text-white"
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="الرقم الجامعي"
              className="card-f w-full p-3 mb-3 rounded-md bg-[#1e2227] card text-white"
              onChange={(e) => setUserInfo({ ...userInfo, universityId: e.target.value })}
              required
            />
            <button type="submit" className="card-f w-full p-3 bg-white card font-bold text-white rounded-md text-xl">
              بدء الاختبار
            </button>
          </form>
        ) : quizFinished ? (
          <div className="w-full max-w-lg p-6 bg-[#1e2227] card rounded-lg arabic-text shadow-lg text-center">
            <h1 className="text-2xl font-bold text-[#f8a834] mb-4">انتهت الأسئلة</h1>
            <p className="text-lg">سنتواصل معك في حال القبول</p>
            <a href="https://www.instagram.com/idev.challenge" className="mt-3 block text-[#f8a834] text-2xl">
              <FaInstagram className="inline text-white text-4xl pulse-animation card" /> سيتم الاعلان على حسابنا    
            </a>
          </div>
        ) : (
          <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg card card-q shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-right " dir="auto">
              {questions[currentQuestion]?.question}
            </h1>
            <div className="grid gap-4">
              {questions[currentQuestion]?.options.map((choice, index) => (
                <button key={index} onClick={() => handleAnswer(choice)} className="card-f p-3 rounded-md text-lg font-semibold card bg-gray-700 hover:bg-gray-900 transition-all duration-300">
                  {choice}
                </button>
              ))}
            </div>
            <div className="mt-4 text-center text-lg card font-semibold">
              ⏳ الوقت المتبقي: <span className="text-yellow-400">{timeLeft}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
