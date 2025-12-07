"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// 🔹 레이더 차트 데이터
const radarData = [
  { name: "부동산 금융 / PF 구조", value: 9 },
  { name: "신탁·REITs 분석", value: 9 },
  { name: "데이터 분석(Python)", value: 7 },
  { name: "리서치·보고서 작성", value: 10 },
  { name: "발표·커뮤니케이션", value: 8 },
];

type YearType = "2018" | "2022" | "2023" | "2024";

// 🔹 연도별 상세 내용 (학업 / 대외활동 분리)
const yearDetails: Record<YearType, string> = {
  "2018": [
    "［학업 / 학력］",
    "- 서울 중앙대학교사범대학부속고등학교",
    "- 2020년 2월 고등학교 졸업",
  ].join("\n"),

  "2022": [
    "［학업 / 성적］",
    "- 단국대학교 입학",
    "［대외활동］",
    "- 홍릉 도시재생 크리에이터 ‘마케터스’ 팀 활동",
    "  · ‘응답하라 2000: 회기동 미션 투어’·‘회기동 레시피’ 프로그램 기획·운영·홍보",
  ].join("\n"),

  "2023": [
    "［대외활동］",
    "- 제34회 공인중개사 자격시험 준비 및 합격 (2023.10)",
    "- 법무법인 굿플랜 법률 원고 작성 프리랜서 시작 (현재까지 지속)",
    "  · 부동산·법률 관련 블로그 콘텐츠 기획·작성",
  ].join("\n"),

  "2024": [
    "［학업 / 성적］",
    "- 도시계획·부동산학부로 전과 후 전공 심화",
    "",
    "［대외활동］",
    "- 학술동아리 URID 12기 활동 및 수료",
    "- URID 학술발표회 최우수상 수상 (2024.04)",
    "- URID 12기 우수회원 상장 수여 (2024.06)",
    "- URID 13기 대외교류팀장으로 활동 (2024.09~12)",
    "- 단러닝클럽 Best Practice 공모전 장려상 수상 (2024.08)",
    "- 법무법인 굿플랜 법률 원고 프리랜서 활동 지속",
  ].join("\n"),
};

// 🔹 자격증 / 활동 이미지
type Certificate = {
  title: string;
  date: string;
  file: string;
};

const certificates: Certificate[] = [
  {
    title: "공인중개사 자격증",
    date: "2023.12.12",
    file: "agent-license.jpg",
  },
  {
    title: "홍릉 도시재생 크리에이터 수료증",
    date: "2022.12.12",
    file: "hongneung-creators-certificate.jpg",
  },
  {
    title: "URID 12기 수료증",
    date: "2024.06.06",
    file: "urid-12-completion.jpg",
  },
  {
    title: "URID 12기 우수회원 상장",
    date: "2024.06.06",
    file: "urid-12-best-member.jpg",
  },
  {
    title: "URID 12기 발표회 최우수상",
    date: "2024.04.11",
    file: "urid-12-best-presentation.jpg",
  },
  {
    title: "URID 13기 수료증",
    date: "2024.12.05",
    file: "urid-13-completion.jpg",
  },
  {
    title: "단러닝클럽 Best Practice 공모전 장려상",
    date: "2024.08.13",
    file: "learning-club-best-practice.jpg",
  },
];

// 🔹 학기별 GPA 데이터
const gpaData = [
  { term: "2022-1", gpa: 4.26 },
  { term: "2022-2", gpa: 4.25 },
  { term: "2024-1", gpa: 3.79 }, // 43.79 → 3.79 로 반영
  { term: "2024-2", gpa: 4.0 },  // 4..00 → 4.00
  { term: "2025-1", gpa: 4.14 },
];

export function Skills() {
  const [openYear, setOpenYear] = useState<YearType | null>(null);
  const [openCert, setOpenCert] = useState<Certificate | null>(null);

  return (
    <section
      id="skills"
      className="w-full pt-10 pb-20 md:pt-12 md:pb-24 bg-slate-950 text-white"
    >
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* ⏳ Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800 text-white rounded-3xl p-8 shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>⏳</span> Timeline
          </h2>
          <p className="text-xs text-slate-400">
            연도를 클릭하면 해당 시기의 학업 성적과 대외활동이 함께
            표시됩니다.
          </p>

          <div className="relative mt-2">
            <div className="hidden md:block absolute top-5 left-0 w-full h-[2px] bg-slate-600" />

            <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0 relative">
              {/* 2018 ~ 2020 고등학교 */}
              <motion.button
                type="button"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenYear("2018")}
                className="flex flex-col items-start md:items-center md:w-1/4 text-left md:text-center cursor-pointer"
              >
                <div className="w-4 h-4 bg-white rounded-full border-2 border-white mb-2 shadow-md" />
                <h3 className="mt-2 md:mt-4 font-semibold">2018 ~ 2020</h3>
                <p className="text-sm mt-1 text-slate-300">
                  중앙대학교사범대학부속고등학교
                  <br />
                  졸업
                </p>
              </motion.button>

              {/* 2022 */}
              <motion.button
                type="button"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenYear("2022")}
                className="flex flex-col items-start md:items-center md:w-1/4 text-left md:text-center cursor-pointer"
              >
                <div className="w-4 h-4 bg-white rounded-full border-2 border-white mb-2 shadow-md" />
                <h3 className="mt-2 md:mt-4 font-semibold">2022</h3>
                <p className="text-sm mt-1 text-slate-300">
                  단국대 입학
                  <br />
                  홍릉 도시재생 현장지원센터
                </p>
              </motion.button>

              {/* 2023 */}
              <motion.button
                type="button"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenYear("2023")}
                className="flex flex-col items-start md:items-center md:w-1/4 text-left md:text-center cursor-pointer"
              >
                <div className="w-4 h-4 bg-white rounded-full border-2 border-white mb-2 shadow-md" />
                <h3 className="mt-2 md:mt-4 font-semibold">2023</h3>
                <p className="text-sm mt-1 text-slate-300">
                  공인중개사 준비·합격
                  <br />
                  법무법인 굿플랜 프리랜서 시작
                </p>
              </motion.button>

              {/* 2024 ~ 현재 */}
              <motion.button
                type="button"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenYear("2024")}
                className="flex flex-col items-start md:items-center md:w-1/4 text-left md:text-center cursor-pointer"
              >
                <div className="w-4 h-4 bg-white rounded-full border-2 border-white mb-2 shadow-md" />
                <h3 className="mt-2 md:mt-4 font-semibold">2024 ~</h3>
                <p className="text-sm mt-1 text-slate-300">
                  전과 · URID 활동
                  <br />
                  굿플랜 프리랜서 지속
                </p>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 flex flex-wrap gap-2 text-[11px] text-slate-300"
            >
              <span className="px-2 py-1 rounded-full bg-slate-700/70 border border-slate-500/80">
                📌 학기 성적우수자 4회
              </span>
              <span className="px-2 py-1 rounded-full bg-slate-700/70 border border-slate-500/80">
                📌 공인중개사 자격 취득
              </span>
              <span className="px-2 py-1 rounded-full bg-slate-700/70 border border-slate-500/80">
                📌 URID 최우수상 · 우수회원 · 단러닝클럽 장려상
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* 🛠 Skills & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800 rounded-3xl p-8 shadow-lg space-y-8"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>📚</span> Skills & Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-semibold text-xl mb-3">Skills</h3>
              <ul className="space-y-3 text-base">
                <li>• 부동산 금융 / PF 구조 분석</li>
                <li>• 부동산 신탁·REITs 구조 해석</li>
                <li>• 시계열 분석 (ADF, VAR, Granger 등)</li>
                <li>• Python 기반 데이터 분석</li>
                <li>• 리서치·보고서·발표자료 작성</li>
                <li>• 법무법인 굿플랜 법률·부동산 콘텐츠 기획·집필</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xl mb-3">Certifications</h3>
              <ul className="space-y-3 text-base">
                <li>• 공인중개사 (제34회, 2023)</li>
                <li>• 홍릉 도시재생 크리에이터 활동 수료</li>
                <li>• URID 12·13기 수료 및 최우수상·우수회원</li>
                <li>• 단러닝클럽 Best Practice 공모전 장려상 (2024-1학기)</li>
                <li className="text-sm text-slate-400">
                  📌 향후 투자자산운용사 등 금융 관련 자격 준비 예정
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 🔵 Skill Radar */}
        <SkillsRadar />

        {/* 📈 학기별 GPA 그래프 */}
        <AcademicPerformance />

        {/* 🖼 Certificates & Records */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800 rounded-3xl p-8 shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>🖼</span> Certificates & Records
          </h2>
          <p className="text-xs text-slate-400">
            주요 자격증과 활동을 증명하는 원본 이미지입니다.
          </p>

          {/* 🎥 대외활동 소개 영상 (자동재생 / 무음) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden bg-black border border-slate-700/80 shadow-md"
          >
            <div className="w-full h-56 md:h-64 lg:h-72">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Ve5npKkEUuQ?autoplay=1&mute=1&loop=1&playlist=Ve5npKkEUuQ"
                title="대외활동 소개 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay"
                allowFullScreen
              />
            </div>
            <div className="px-4 py-3 border-t border-slate-700/70">
              <p className="text-sm font-semibold">
                URID · 도시재생 주요 대외활동 영상
              </p>
              <p className="text-xs text-slate-400 mt-1">
                포트폴리오와 연계된 활동 하이라이트 클립입니다.
              </p>
            </div>
          </motion.div>

          {/* 📜 자격증 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <motion.figure
                key={cert.title}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-700/70 shadow-md cursor-pointer"
                onClick={() => setOpenCert(cert)}
              >
                <div className="h-40 w-full overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img
                    src={`/uploads/${cert.file}`}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="p-3">
                  <p className="text-sm font-semibold">{cert.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{cert.date}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 연도 상세 모달 */}
      {openYear && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-slate-900 rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-3">
              {openYear === "2018"
                ? "2018 ~ 2020 활동 요약"
                : openYear === "2024"
                ? "2024 ~ 현재 활동 요약"
                : `${openYear} 활동 요약`}
            </h3>
            <p className="text-sm text-slate-300 whitespace-pre-line">
              {yearDetails[openYear]}
            </p>
            <button
              onClick={() => setOpenYear(null)}
              className="mt-4 px-3 py-1.5 rounded-full bg-slate-700 text-sm"
            >
              닫기
            </button>
          </motion.div>
        </div>
      )}

      {/* 자격증 확대 모달 */}
      {openCert && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setOpenCert(null)}
        >
          <img
            src={`/uploads/${openCert.file}`}
            alt={openCert.title}
            className="max-h-[90%] max-w-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}

// 🔵 레이더 차트 – 스크롤할 때마다 위에서 살짝 커지면서 등장
function SkillsRadar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="w-full h-80 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 flex flex-col"
    >
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
              animationDuration={1000}
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
    </motion.div>
  );
}

// 📈 학기별 GPA 라인 차트
function AcademicPerformance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="w-full h-80 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 flex flex-col"
    >
      <div className="mb-4 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-slate-100">
          Academic Performance
        </h3>
        <p className="text-xs text-slate-400">
            학기별 GPA 추이: 누적 평균 평점 (4.08/4.5)
        </p>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={gpaData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="term"
              tick={{ fill: "#e5e7eb", fontSize: 10 }}
            />
            <YAxis
              domain={[3.0, 4.5]}
              tick={{ fill: "#e5e7eb", fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #4b5563",
                borderRadius: "0.5rem",
                fontSize: 12,
                color: "#e5e7eb",
              }}
              formatter={(value) => [`GPA ${value}`, "학기 성적"]}
              labelFormatter={(label) => `${label} 학기`}
            />
            <Line
              type="monotone"
              dataKey="gpa"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={{ r: 3, stroke: "#0ea5e9", strokeWidth: 1 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
