"use client"

export function PortfolioMap() {
  return (
    <section
      id="portfolio-map"
      className="w-full py-16 md:py-20 bg-slate-950 text-white"
    >
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">2023–2025 Jiwon Lim Portfolio Map</h2>
          <p className="text-sm text-slate-400">
            전공·프로젝트·역할을 한눈에 정리한 요약 지도입니다.
          </p>
        </div>

        {/* 3개 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 분야별 분포 */}
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-100">분야별 프로젝트</h3>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>· PF 구조 / 리스크 분석: 3개</li>
              <li>· 신탁(책임준공형 등): 2개</li>
              <li>· REITs / 개발형 리츠: 2개</li>
              <li>· 데이터 분석(Time Series): 1개</li>
            </ul>
          </div>

          {/* 역할 비중 */}
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-100">역할 비중</h3>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>· 구조 분석·모델링: 약 70%</li>
              <li>· 자료조사·레퍼런스 정리: 약 20%</li>
              <li>· 발표·PT 구성: 약 10%</li>
            </ul>
            <p className="text-[11px] text-slate-400">
              → “복잡한 구조를 정리해서 설명하는 역할” 비중이 큼
            </p>
          </div>

          {/* 대표 성과 */}
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-100">대표 성과</h3>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>· 40p 이상 보고서: 4회 이상</li>
              <li>· 팀 발표: 6회 이상</li>
              <li>· Python 기반 시계열 모델 구축: 1회</li>
            </ul>
            <p className="text-[11px] text-emerald-300">
              프로젝트를 “하나의 스토리”로 묶을 수 있는 포트폴리오 구조 보유
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
