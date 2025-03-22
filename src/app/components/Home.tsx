import React from "react";
import Header from "./Header";
import { FaInstagram } from "react-icons/fa";

interface HomeProps {
  className?: string;
}

const Home = ({ className }: HomeProps) => {
  return (
    <div id="home" className={`${className} flex flex-col min-h-screen relative   `}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-grow english-text items-center text-center justify-center  px-10">
        <div className="text-white  text-primary flex flex-col justify-center items-center ">
          {/* iDev */}
          <div className="text-[130px] sm:text-[180px] md:text-[225px] lg:text-[250px] xl:text-[250px] leading-none ">
            <span className="text-[#f8a834]">i</span>Dev
          </div>
          {/* Subtitle */}
          <p className="uppercase text-md sm:text-xl md:text-2xl tracking-wider">
            fun | programming | creativity
          </p>
        </div>
      </div>

      {/* Instagram Icon */}
      <a
        href="https://www.instagram.com/idev.challenge?igsh=MWk1N3V0ZHh0cDY5eg==e"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-[30px] bg-[#f8a834] p-3 rounded-full shadow-lg text-white text-3xl transition-all duration-200 hover:right-8 hover:scale-110"
      >
        <FaInstagram />
      </a>
    </div>
  );
};

export default Home;
