"use client";

import { useTypewriter } from "react-simple-typewriter";

export function Hero() {
  // 🔥 타이핑 애니메이션
  const [text] = useTypewriter({
    words: ["부동산을 넘어, 부동삶이라는 가치로"],
    loop: 0,            // 반복 없음
    typeSpeed: 60,      // 타이핑 속도
    deleteSpeed: 40,    // 삭제 속도
    delaySpeed: 1700,   // 문장 유지 시간
  });

  return (
    <section className="w-full py-28 bg-slate-950 text-center text-white flex flex-col items-center">
      {/* 메인 타이틀 */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
        Building My Perspective.
      </h1>

      {/* 🔥 타이핑되는 한 줄 소개 */}
      <h2 className="text-xl md:text-2xl text-slate-300 h-[32px] mb-4">
        {text}
        <span className="text-sky-400">|</span>
      </h2>

      {/* 부가 소개 텍스트 */}
      <p className="mt-2 max-w-xl text-slate-400 text-sm md:text-base leading-relaxed">
        현장을 이해하고 구조를 파악하는 부동산 인재가 되기 위해
        PF · 신탁 · REITs를 중심으로 공부하고 있습니다.
      </p>
    </section>
  );
}
