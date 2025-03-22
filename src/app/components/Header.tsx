"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import { FaHamburger, FaMoon, FaSun } from "react-icons/fa";

// ✅ Arabic to English section mapping
const sections: Record<string, string> = {
  "الصفحة الرئيسية": "home",
  "المرحلة الأولى - الاختبار": "challenge",
  "البطولة": "aboutChallenge",
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("");

  // ✅ Load theme from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(savedTheme);
    }
  }, []);
  

  // ✅ Toggle light/dark theme
// ✅ Toggle light/dark theme
const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);

  // إزالة الكلاسات القديمة وإضافة الكلاسات الجديدة
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(newTheme);

  // تخزين التفضيلات في localStorage
  localStorage.setItem("theme", newTheme);
};


  // ✅ Track active section while scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 } // 60% visibility activates
    );

    Object.values(sections).forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="bg-primary  py-6 fixed w-full z-50 ">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* ✅ Logo */}
        <div className="text-white font-bold text-2xl english-text text-primary ">
          <span className="text-accent text-[#f8a834]">i</span>Dev{" "}
          <span className="text-[10px] text-[#f8a834]">Beta</span>
        </div>

        {/* ✅ Desktop Navigation */}
        <nav className="hidden md:flex arabic-text  ">
          <ul className="flex gap-6 md:gap-12 uppercase text-white text-primary  font-medium">
            {Object.entries(sections).map(([arabic, sectionId]) => (
              <li key={sectionId}>
                <Link
                  href={`#${sectionId}`}
                  className={`transition duration-300 cursor-pointer ${
                    activeSection === `#${sectionId}`
                      ? "text-[#f8a834] font-bold"
                      : "hover:text-[#f8a834]"
                  }`}
                >
                  {arabic}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ✅ Mobile Menu & Theme Toggle Buttons */}
        <div className="flex items-center gap-4 relative z-60">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-white text-2xl">
            {theme === "light" ? <FaMoon color="#f8a834" /> : <FaSun />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white md:hidden text-3xl"
          >
            {isOpen ? <FiX className="text-primary"/> : <FaHamburger className="text-primary"/>}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden fixed top-7 left-0 w-full bg-primary  z-50 py-4">
          <ul className="flex flex-col items-center gap-4 uppercase text-white bg-mode font-bold text-primary  font-3xl bg-[#1e2227] border-white border-2 m-4 p-4">
            {Object.entries(sections).map(([arabic, sectionId]) => (
              <li key={sectionId}>
                <Link
                  href={`#${sectionId}`}
                  onClick={() => {
                    setActiveSection(`#${sectionId}`);
                    setIsOpen(false);
                  }}
                  className={`transition duration-300 cursor-pointer ${
                    activeSection === `#${sectionId}`
                      ? "text-[#f8a834] font-bold"
                      : "hover:text-[#f8a834]"
                  }`}
                >
                  {arabic}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
