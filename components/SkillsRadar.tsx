"use client"

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

const data = [
  { name: "부동산 금융 / PF 구조", value: 9 },
  { name: "신탁·REITs 분석", value: 9 },
  { name: "데이터 분석(Python)", value: 7 },
  { name: "리서치·보고서 작성", value: 10 },
  { name: "발표·커뮤니케이션", value: 8 },
]

export function SkillsRadar() {
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
          <RadarChart data={data}>
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
  )
}
