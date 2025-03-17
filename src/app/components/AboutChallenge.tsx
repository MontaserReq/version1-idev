import React from "react";

const AboutChallenge = () => {
  return (
    <div
      id="aboutChallenge"
      className="flex flex-wrap items-center justify-evenly min-h-screen text-white p-6 space-y-8"
    >
      {/* Card 1 */}
      <div className="bg-[#1e2227] text-center p-6 rounded-lg shadow-lg w-full md:w-[45%] lg:w-[30%] space-y-5">
        <h1 className="text-3xl font-bold text-[#f8a834]">المرحلة الأولى</h1>
        <p>
          اختبار المشتركين بأسئلة اختيار من متعدد ويتم اختيار عدد معين من
          كل جامعة حسب العدد النهائي لمجموع المشاركين.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-[#1e2227] text-center p-6 rounded-lg shadow-lg w-full md:w-[45%] lg:w-[30%] space-y-5">
        <h1 className="text-3xl font-bold text-[#f8a834]">المرحلة الثانية</h1>
        <p>
          المتأهلين من المرحلة الأولى يتم اختبارهم عن طريق مقابلة قصيرة
          باسئلة اكثر تقدما من المرحلة الأولى.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-[#1e2227] text-center p-6 rounded-lg shadow-lg w-full md:w-[45%] lg:w-[30%] space-y-5">
        <h1 className="text-3xl font-bold text-[#f8a834]">المرحلة الثالثة</h1>
        <p>
          في هاي المرحلة راح يتم عمل تصفيات على شكل حلقات مصورة ترفع على
          قناة اليوتيوب ويتأهل من كل جامعة شخص ينافس على مستوى جامعات
          الأردن المشاركة.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-[#1e2227] text-center p-6 rounded-lg shadow-lg w-full md:w-[45%] lg:w-[30%] space-y-5">
        <h1 className="text-3xl font-bold text-[#f8a834]">المرحلة الرابعة</h1>
        <p>
          المرحلة الحاسمة وهي تصفيات على مستوى الجامعات الأردنية ويتأهل
          للحلقة الختامية شخصين من كل جامعات الاردن بيتنافسوا على اللقب
          وحتكون الحلقة الأخرة بمسرح بحضور جمهور وشكرات والفائز باللقب
          يحصل على جائزة مرتبة.
        </p>
      </div>
    </div>
  );
};

export default AboutChallenge;
