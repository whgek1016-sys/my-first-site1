"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// 레이더 차트용 데이터
const radarData = [
  { name: "부동산 금융 / PF 구조", value: 9 },
  { name: "신탁·REITs 분석", value: 9 },
  { name: "데이터 분석(Python)", value: 7 },
  { name: "리서치·보고서 작성", value: 10 },
  { name: "발표·커뮤니케이션", value: 8 },
];

export function Skills() {
  const [openYear, setOpenYear] = useState<null | "2022" | "2023" | "2024">(null);

  return (
    <section
      id="skills"
      className="w-full pt-10 pb-20 md:pt-12 md:pb-24 bg-slate-950 text-white"
    >
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* 🟢 Timeline Section (가로) */}
        <div className="bg-slate-800 text-white rounded-3xl p-8 shadow-lg space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>⏳</span> Timeline
          </h2>
          {/* ⬇️ 안내 문장만 추가 */}
          <p className="text-xs text-slate-400">
            연도를 클릭하시면 각 년도의 상세 활동이 모달로 표시됩니다.
          </p>

          <div className="relative mt-2">
            {/* 가로 라인 (데스크탑에서만 표시) */}
            <div className="hidden md:block absolute top-5 left-0 w-full h-[2px] bg-slate-600" />

            <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0 relative">
              {/* 2022 */}
              <div
                className="flex flex-col items-start md:items-center md:w-1/3 text-left md:text-center transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                onClick={() => setOpenYear("2022")}
              >
                <div className="w-4 h-4 bg-white rounded-full border-2 border-white md:mb-0 mb-2 shadow-md animate-pulse" />
                <h3 className="mt-2 md:mt-4 font-semibold">2022</h3>
                <p className="text-sm mt-1 text-slate-300">
                  단국대학교 입학
                  <br />
                  홍릉 도시재생 현장지원센터 활동
                </p>
              </div>

              {/* 2023 */}
              <div
                className="flex flex-col items-start md:items-center md:w-1/3 text-left md:text-center transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                onClick={() => setOpenYear("2023")}
              >
                <div className="w-4 h-4 bg-white rounded-full border-2 border-white md:mb-0 mb-2 shadow-md animate-pulse" />
                <h3 className="mt-2 md:mt-4 font-semibold">2023</h3>
                <p className="text-sm mt-1 text-slate-300">
                  공인중개사 시험 준비
                  <br />
                  법무법인 굿플랜 블로그 마케팅 시작
                </p>
              </div>

              {/* 2024 ~ 현재 */}
              <div
                className="flex flex-col items-start md:items-center md:w-1/3 text-left md:text-center transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                onClick={() => setOpenYear("2024")}
              >
                <div className="w-4 h-4 bg-white rounded-full border-2 border-white md:mb-0 mb-2 shadow-md animate-pulse" />
                <h3 className="mt-2 md:mt-4 font-semibold">2024 ~</h3>
                <p className="text-sm mt-1 text-slate-300">
                  도시계획·부동산학부 전과
                  <br />
                  굿플랜 프리랜서로 계속 활동 중
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 🛠 Skills + Certifications Section */}
        <div className="bg-slate-800 rounded-3xl p-8 shadow-lg space-y-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>📚</span> Skills & Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT – Skills */}
            <div>
              <h3 className="font-semibold text-xl mb-3">Skills</h3>
              <ul className="space-y-3 text-base">
                <li>• 부동산 금융 / PF 구조 분석</li>
                <li>• 부동산 신탁 구조 해석</li>
                <li>• 시계열 분석 (ADF, VAR, Granger 등)</li>
                <li>• Python 데이터 분석</li>
                <li>• 리포트 작성 / 프레젠테이션</li>
              </ul>
            </div>

            {/* RIGHT – Certifications */}
            <div>
              <h3 className="font-semibold text-xl mb-3">Certifications</h3>
              <ul className="space-y-3 text-base">
                <li>• 공인중개사</li>
                <li>• 부동산·금융 관련 프로젝트 다수</li>
                <li className="text-sm text-slate-400">
                  📌 투자자산운용사 준비 예정
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 🔵 Skill Radar Chart Section */}
        <SkillsRadar />
      </div>

      {/* 연도 상세 모달 (새로 추가) */}
      {openYear && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-3">{openYear} 상세</h3>
            <p className="text-sm text-slate-300 whitespace-pre-line">
              {openYear === "2022" &&
                "2022년에 했던 구체적인 활동 요약을 적어주세요."}
              {openYear === "2023" &&
                "2023년에 했던 구체적인 활동 요약을 적어주세요."}
              {openYear === "2024" &&
                "2024~현재까지의 활동 요약을 적어주세요."}
            </p>
            <button
              onClick={() => setOpenYear(null)}
              className="mt-4 px-3 py-1.5 rounded-full bg-slate-700 text-sm"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// 같은 파일 안에 레이더 차트 컴포넌트 정의
function SkillsRadar() {
  return (
    <div className="w-full h-80 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-100">Skill Radar</h3>
        <p className="text-xs text-slate-400 mt-1">
          부동산 금융·신탁·데이터 중심 역량을 시각화한 차트입니다.
        </p>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#1e293b" />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fill: "#e5e7eb", fontSize: 10 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tick={{ fill: "#64748b", fontSize: 9 }}
              stroke="#1e293b"
            />
            <Radar
              dataKey="value"
              stroke="#38bdf8"
              fill="#38bdf8"
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2 py-1 border border-sky-400/40">
          <span className="h-2 w-2 rounded-full bg-sky-400" />
          강점: 구조 이해·리서치
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 border border-emerald-400/40">
          보완 중: Python 분석 스택
        </span>
      </div>
    </div>
  );
}
