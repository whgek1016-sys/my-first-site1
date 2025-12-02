"use client"

export function About() {
  return (
    <section id="about" className="w-full pt-20 pb-10 md:pt-24 md:pb-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white text-slate-900 rounded-3xl shadow-lg shadow-slate-900/30 border border-slate-200/80 p-8 md:p-10 lg:p-12">
          {/* 상단 타이틀 */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-slate-400 uppercase">
                ABOUT
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
                단국대학교 부동산학과 3학년, 임지원입니다.
              </h2>
            </div>
            <p className="text-sm text-slate-500 md:text-right">
               현상을 표면적으로만 보지 않고, 왜 이런 구조와 흐름이 만들어졌는지  
              그 배경을 탐구하는 데에 관심을 두고 있습니다.
            </p>
          </div>

          {/* 본문 두 컬럼 레이아웃 */}
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)]">
            {/* 왼쪽: 한줄 소개 + 키워드 */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  “복잡한 구조를 이해하고,<br />쉽게 설명하는 사람”
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  저는 부동산 금융과 신탁 구조를 중심으로 공부하며,
                  숫자와 구조를 "읽고 정리하는 것"을 좋아합니다.
                  강의에서 배운 내용을 단순 암기가 아니라
                  프로젝트, 리포트, 발표로 연결하는 데에 집중하고 있습니다.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 mb-2">
                  키워드
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "부동산 금융",
                    "프로젝트 리츠",
                    "부동산 신탁",
                    "시계열 분석",
                    "리포트 작성",
                    "발표·정리"
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 오른쪽: 상세 소개 */}
            <div className="space-y-4 text-sm leading-relaxed text-slate-700">
              <p>
                최근에는{" "}
                <span className="font-semibold">
                  주택담보대출금리의 지연효과 분석
                </span>
                과{" "}
                <span className="font-semibold">
                  책임준공확약형 관리형 토지신탁 사례 분석
                </span>
                ,{" "}
                <span className="font-semibold">
                  프로젝트 리츠의 PF 대출 대체 가능성
                </span>
                에 관한 과제를 수행했습니다.  
                단순히 구조를 나열하기보다, "왜 이런 구조가 되었는가"를
                스스로 질문하며 공부하고 있습니다.
              </p>

              <p>
                숫자와 계약 구조를 다루는 만큼, 작은 부분도 그냥 넘기지 않으려
                합니다. 강의자료, 신탁원부, 공시문, 기사 등 여러 자료를
                종합해 전체 그림을 그려보는 과정에서 큰 보람을 느낍니다.
              </p>

              <p>
                앞으로는 리츠·신탁 분야에서 더 깊이 있는 분석 역량을 쌓아,
                복잡한 내용을 누구에게나 명확하게 설명할 수 있는 사람이 되는 것을
                목표로 하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

