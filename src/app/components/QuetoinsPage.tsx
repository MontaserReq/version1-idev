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
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizFinished, setQuizFinished] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // إذا تم تخزين حالة الاختبار في localStorage، لا نسمح بإعادة التسجيل
    const quizSubmitted = localStorage.getItem("quizSubmitted");
    if (quizSubmitted) {
      setQuizFinished(true);  // يتم إظهار رسالة الانتهاء من الاختبار فورًا إذا تم تقديمه مسبقًا
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
    if (timeLeft === 0) {
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
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

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
        timeTaken: 7 - timeLeft,
        points: points,
      }),
    });

    setTimeout(() => {
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
    }, 500);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < 10) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(7); // أو أي وقت آخر تريده بعد الانتقال للسؤال التالي
    } else {
      setQuizFinished(true);
      localStorage.setItem("quizSubmitted", "true"); // تخزين حالة الاختبار
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.userName && userInfo.email && userInfo.universityId) {
      setIsRegistered(true);
      startCountdown(); // بدء العد التنازلي بعد تعبئة النموذج
    }
  };

  const startCountdown = () => {
    setTimeLeft(7); // يمكن تعديل الوقت هنا بما يتناسب مع احتياجاتك
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval); // إيقاف العد التنازلي عند الوصول إلى 1
          nextQuestion(); // الانتقال إلى السؤال التالي
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6 text-center rtl:text-right ltr:text-left">
      {showCountdown ? (
        <h1 className="text-3xl font-bold text-yellow-400">{countdown}</h1>
      ) : !isRegistered ? (
        <form onSubmit={handleFormSubmit} className="w-full max-w-lg p-6 bg-[#222932] rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">تسجيل الدخول</h1>
          <input
            type="text"
            placeholder="الاسم الكامل"
            className="w-full p-3 mb-3 rounded-md bg-gray-700 text-white"
            onChange={(e) => setUserInfo({ ...userInfo, userName: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full p-3 mb-3 rounded-md bg-gray-700 text-white"
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="الرقم الجامعي"
            className="w-full p-3 mb-3 rounded-md bg-gray-700 text-white"
            onChange={(e) => setUserInfo({ ...userInfo, universityId: e.target.value })}
            required
          />
          <button type="submit" className="w-full p-3 bg-white font-bold text-[#1e2227] rounded-md text-xl">
            بدء الاختبار
          </button>
        </form>
      ) : quizFinished ? (
        <div className="w-full max-w-lg p-6 bg-[#222932] rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-[#fbbd60] mb-4">🎉 انتهت الأسئلة </h1>
          <p className="text-lg">سنتواصل معك في حال القبول</p>
          <a href="https://www.instagram.com/idev.challenge" className="mt-3 block text-[#f8a834] text-2xl">
            <FaInstagram className="inline text-white text-4xl pulse-animation" /> سيتم الاعلان على حسابنا    
          </a>
        </div>
      ) : (
        <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-right rtl:text-right ltr:text-left" dir="auto">
            {questions[currentQuestion]?.question}
          </h1>
          <div className="grid gap-4">
            {questions[currentQuestion]?.options.map((choice: any, index: any) => (
              <button
                key={index}
                onClick={() => handleAnswer(choice)}
                className={`p-3 rounded-md text-lg font-semibold bg-gray-700 hover:bg-gray-900 transition-all duration-300 ${
                  selectedAnswer === choice ? "" : ""
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
          <div className="mt-4 text-center text-lg font-semibold">
            ⏳s الوقت المتبقي: <span className="text-yellow-400">{timeLeft}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
