'use client';
import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import questionsData from "./questions.json";

const QuizPage = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    universityId: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7);
  const [quizFinished, setQuizFinished] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const easyQuestions = questionsData.questions.filter((q) => q.difficulty === "easy");
    const mediumQuestions = questionsData.questions.filter((q) => q.difficulty === "medium");
    const hardQuestions = questionsData.questions.filter((q) => q.difficulty === "hard");

    const selectedQuestions = [
      ...easyQuestions.sort(() => 0.5 - Math.random()).slice(0, 3),
      ...mediumQuestions.sort(() => 0.5 - Math.random()).slice(0, 4),
      ...hardQuestions.sort(() => 0.5 - Math.random()).slice(0, 3),
    ];

    setQuestions(selectedQuestions);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const calculatePoints = (timeLeft: number) => {
    if (timeLeft === 0) return 0;
    else if (timeLeft === 1) return 1;
    else if (timeLeft === 2) return 2;
    else if (timeLeft === 3) return 3;
    else if (timeLeft === 4) return 4;
    else if (timeLeft === 5) return 5;
    else if (timeLeft === 6) return 6;
    else if (timeLeft === 7) return 7;
    return 0;
  };

  const handleAnswer = async (choice: any) => {
    const correctAnswer = questions[currentQuestion].answer;
    const points = choice === correctAnswer ? calculatePoints(timeLeft) : 0;
  
    setSelectedAnswer(choice);
    if (choice === correctAnswer) {
      setScore(score + points);
    }
  
    // إرسال البيانات إلى API
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
        timeTaken: 7 - timeLeft,
        points: points,
      }),
    });

    setTimeout(() => {
      nextQuestion();
    }, 500);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < 10) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(7);
    } else {
      setQuizFinished(true);
    }
  };

  // الحصول على عنوان الـ IP
  const getIpAddress = async () => {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // تحقق إذا كان المستخدم موجودًا مسبقًا
    const response = await fetch("/api/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userInfo.email,
        userName: userInfo.userName,
        universityId: userInfo.universityId,
        ipAddress: await getIpAddress(), // الحصول على IP الجهاز
      }),
    });
  
    const data = await response.json();

    if (data.exists) {
      alert("تم التسجيل بهذا البريد الإلكتروني أو الاسم أو الرقم الجامعي من قبل!");
      return;
    }

    setIsRegistered(true);
    localStorage.setItem("userInfo", JSON.stringify(userInfo)); // تخزين البيانات محليًا
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      {!isRegistered ? (
        <form onSubmit={handleRegister} className="w-full max-w-lg p-6 bg-[#222932] rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center ">تسجيل الدخول</h1>
          <input
            type="text"
            placeholder="الاسم الكامل"
            className="w-full p-3 mb-3 rounded-md bg-gray-700 text-white"
            value={userInfo.userName}
            onChange={(e) => setUserInfo({ ...userInfo, userName: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full p-3 mb-3 rounded-md bg-gray-700 text-white"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="الرقم الجامعي"
            className="w-full p-3 mb-3 rounded-md bg-gray-700 text-white"
            value={userInfo.universityId}
            onChange={(e) => setUserInfo({ ...userInfo, universityId: e.target.value })}
            required
          />
          <button type="submit" className="w-full p-3 bg-white font-bold text-[#1e2227] rounded-md text-xl ">
            بدء الاختبار
          </button>
        </form>
      ) : quizFinished ? (
        <div className="w-full max-w-lg p-6 bg-[#222932] rounded-lg shadow-lg text-center flex flex-col items-center justify-center gap-3">
          <h1 className="text-2xl font-bold text-[#fbbd60] mb-4">🎉 انتهت الأسئلة </h1>
          <p className="text-lg">سنتواصل معك في حال القبول</p>
          <a
            href="https://www.instagram.com/idev.challenge"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-[#f8a834] text-2xl text-center "
          >
            <FaInstagram className="inline text-white text-4xl pulse-animation" /> سيتم الاعلان على حسابنا    
          </a>
        </div>
      ) : (
        <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">{questions[currentQuestion]?.question}</h1>
          <div className="grid gap-4">
            {questions[currentQuestion]?.options.map((choice: any, index: any) => (
              <button
                key={index}
                onClick={() => handleAnswer(choice)}
                className={`p-3 rounded-md text-lg font-semibold bg-gray-700 hover:bg-gray-600 ${
                  selectedAnswer === choice ? "bg-gray-500" : ""
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
          <div className="mt-4 text-center text-lg font-semibold">
            ⏳ الوقت المتبقي: <span className="text-yellow-400">{timeLeft}s</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
