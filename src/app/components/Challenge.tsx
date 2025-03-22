import Link from 'next/link'
import React from 'react'

const Challenge = () => {
  return (
    <div id='challenge' className="flex flex-col arabic-text items-center justify-center min-h-screen  text-white p-6">

    <div className="w-full max-w-lg p-10  h-1/2 shadow-[0_20px_30px_rgba(0,0,0,0.5)] card bg-[#1e2227]  transition-transform hover:scale-105 rounded-lg shadow-xlt ransition-opacity duration-500 animate-fadeIn">
          <h1 className="text-2xl font-bold mb-4 text-center text-[#f8a834]">
          مهم جدا 
      <br />
      يمكنك التقدم للاختبار مرة واحدة           </h1>
          <p className="text-xl text-center text-white card my-4">
           <span className='english-text'>chatgpt</span> ما بنصحك تستخدم  
            </p>
          <p className="text-lg text-center text-white mt-2 card my-4">
         سيتم الإعلان عن المتأهلين على صفحة المسابقة بالانستقرام 
          </p>
          <div className="flex justify-center items-center mt-6">
            <Link href={`/api/Questions`}>
  <button className="bg-[#f8a834] english-text flex rounded-[40px] text-2xl px-10 py-3 text-white">
    Start
  </button>
  </Link>
</div>


        </div>
        </div>
  )
}

export default Challenge