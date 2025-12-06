// app/components/projects.tsx
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { X, Plus, Upload, ChevronDown, LayoutGrid } from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { COMMON_STYLES } from "@/lib/constants"

type ProjectItem = {
  image: string
  video?: string
  title: string
  description: string
  pdf?: string
}

export function Projects() {
  const { getData, saveData, isEditMode, saveToFile } = useInlineEditor()

  // 기본 데이터
  const defaultInfo = {
    title: "Projects",
    subtitle: "도시·금융·법률을 넘나들며 구조 분석과 실증 검증을 수행한 융합형 프로젝트 포트폴리오입니다.",
    initialDisplay: 6,
    loadMoreCount: 6,
    background: {"image":"/uploads/projects-background-1764474166626.png","video":"","color":"","opacity":0.5},
    projects: [{"image":"/uploads/project-0-1764136569015.png","video":"","title":"「프로젝트 리츠의 구조적 특징과 PF 대출의 대체 가능성에 대한 실증적 고찰」","description":"-금융구조도 설계와 정책방안, 3기 신도시 적용 검토를 중심으로-","pdf":"/uploads/reits-pf-study.pdf"},{"image":"/uploads/project-1764136690001-1764136690096.png","video":"","title":"「주택담보대출금리의 지연효과에 관한 실증분석」","description":"-코로나19 전후 주택시장 주요 지표의 비교를 중심으로","pdf":"/uploads/home-mortgage-interest-analysis.pdf"},{"image":"/uploads/project-1764155454020-1764155456104.png","video":"","title":"스트레스 DSR 도입 이후 주택금융시장 변화 분석 ","description":".","pdf":"/uploads/stress-dsr-housing-finance-analysis.pdf"},{"image":"/uploads/project-1764155573820-1764155573883.png","video":"","title":"씨드큐브 창동 사례로 본 공공 리츠 운영 리스크와 개선 방안 연구 ","description":"연구 ","pdf":"/uploads/seedsquare-changdong-public-reit-analysis.pdf"},{"image":"/uploads/project-1764155617696-1764155617749.png","video":"","title":"세운상가 3-2. 3구역 사례를 통해 본 부동산 PF구조의 가능성과 한계 ","description":"연구","pdf":"/uploads/seun-sanga-pf-structure-risk.pdf"},{"image":"/uploads/project-1764155793327-1764155793489.png","video":"","title":"평택시 동삭동 라움 프라자 신축 사업 PF ","description":"개발 im \n","pdf":"/uploads/pyeongtaek-dongsak-pf-feasibility.pdf"},{"image":"/uploads/project-1764155902904-1764155903466.png","video":"","title":"2023 타경 84047 경매 물건 보고서 ","description":"매탄동 임광아파트 ","pdf":"/uploads/auction-property-report.pdf"},{"image":"/uploads/project-1764156001590-1764156001951.png","video":"","title":"2023타경116839 투자물건 분석 리포트","description":"2024.10.31","pdf":"/uploads/auction-2023-116839-investment-report.pdf"},{"image":"/uploads/project-1764156121225-1764156121286.png","video":"","title":"금전소비대차계약의 성립 요건과 무효 취소 사유 및 법적 효과에 관한 고찰","description":".","pdf":"/uploads/loan-contract-nullity-cancellation-analysis.pdf"},{"image":"/uploads/project-1764156204034-1764156204092.png","video":"","title":"연속된 과실행위에 대한 민사, 형사상 법적 책임 고찰","description":"- 교통사고 및 의료과실 사례를 중심으로 -","pdf":"/uploads/consecutive-tort-criminal-liability.pdf"},{"image":"/uploads/project-10-1764157253977.png","video":"","title":"업무지구 내에서의 주차공간 활용분석과 개선 방안","description":"-판교 테크노밸리를 중심으로 -","pdf":"/uploads/office-district-parking-analysis.pdf"},{"image":"/uploads/project-1764156372865-1764156372956.png","video":"","title":"광교 원희캐슬 B동 수익성 개선안","description":"개선안 ","pdf":"/uploads/advertising-bldg-b-profitability.pdf"},{"image":"/uploads/project-1764156491010-1764156491442.png","video":"","title":"AI 드론 'ToToRANG'을 이용한 산림 보호 전략 ","description":"연구 ","pdf":"/uploads/totorang-ai-forest-protection.pdf"},{"image":"/uploads/project-1764156512671-1764156512752.png","video":"","title":"신촌 민자역사 공실 문제 해결을 위한 청년주택 및 주거단지 계획 연구 ","description":"연구 ","pdf":"/uploads/sinchon-station-youth-housing-solution.pdf"},{"image":"/uploads/project-1764156670012-1764156670164.png","video":"","title":"코리빙 하우스  ","description":": 국내 및 해외사례 탐구와 국내 정착 가능성 분석을 중심으로 ","pdf":"/uploads/coliving-house-study.pdf"},{"image":"/uploads/project-1764156780927-1764156781049.png","video":"","title":"상암 소각장 건립 계획이 상암 월드컵 아파트 3단지 실거래가에 미친 영향 ","description":"(2021~2025)","pdf":"/uploads/sangam-dmc-office-report.pdf"},{"image":"/uploads/project-1764156894283-1764156894400.png","video":"","title":"책임준공확약형 관리형 토지신탁의 구조적 특징과 리스크 관리","description":"-코람코자산신탁을 중심으로-","pdf":"/uploads/completion-guarantee-trust-structure.pdf"},{"image":"/uploads/project-1764156954366-1764156954457.png","video":"","title":"스타벅스 입지 경쟁력 비교 연구","description":"- 건대 후문점, 판교 유스페이스점을 중심으로 -","pdf":"/uploads/starbucks-real-estate-location.pdf"},{"image":"/uploads/project-1764157020024-1764157020103.png","video":"","title":"동아시아 친환경 스마트시티 비교 ","description":"-일본 카시와노하와 송도국제도시의 환경적 지속가능성 전략- ","pdf":"/uploads/east-asia-smartcity-eco-presentation.pdf"},{"image":"/uploads/project-1764157306559-1764157306606.png","video":"","title":"2024 타경 754 (임의) ","description":"강서 마곡 메가타워 경매 리포트","pdf":"/uploads/magok-megatower-auction-report.pdf"},{"image":"/uploads/project-1764157374474-1764157374532.png","video":"","title":"서울시 도시 정책의 방향성과 한계점 ","description":":2040 서울 도시기본계획을 중심으로 ","pdf":"/uploads/seoul-urban-policy-limitations.pdf"},{"image":"/uploads/project-1764157469467-1764157469531.png","video":"","title":"성수동 SKV1 임장분석 보고서","description":".","pdf":"/uploads/seongju-skv1-field-report.pdf"}] as Array<{ image: string; video?: string; title: string; description: string }>
  }

  const [projectsInfo, setProjectsInfo] = useState(defaultInfo)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageAspects, setImageAspects] = useState<{ [key: string]: string }>({})
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [displayCount, setDisplayCount] = useState(defaultInfo.initialDisplay)
  const [showDisplaySettings, setShowDisplaySettings] = useState(false)
  const [newProject, setNewProject] = useState({
    image: "",
    title: "",
    description: "",
    pdf: ""
  })
  const [backgroundData, setBackgroundData] = useState(defaultInfo.background)

  // localStorage에서 데이터 로드 - 편집 모드가 변경될 때마다 실행
  useEffect(() => {
    const savedData = getData("projects-info") as typeof defaultInfo | null
    if (savedData) {
      const mergedData = { ...defaultInfo, ...savedData }
      setProjectsInfo(mergedData)
      setDisplayCount(mergedData.initialDisplay || defaultInfo.initialDisplay)

      if (savedData.background) {
        setBackgroundData(savedData.background)
      }
    }

    const savedBg = getData("projects-background") as {
      image: string
      video: string
      color: string
      opacity: number
    } | null
    if (savedBg) {
      setBackgroundData(savedBg)
    }
  }, [isEditMode])

  const updateProjectsInfo = async (
    key: string,
    value: string | number | boolean | ProjectItem[]
  ) => {
    const newInfo = { ...projectsInfo, [key]: value }
    setProjectsInfo(newInfo)
    saveData("projects-info", newInfo)
    await saveToFile("projects", "Info", newInfo)
  }

  const updateProject = async (
    index: number,
    field: keyof ProjectItem,
    value: string
  ) => {
    const newProjects = [...projectsInfo.projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    await updateProjectsInfo("projects", newProjects)
  }

  const removeProject = async (index: number) => {
    const projectToRemove = projectsInfo.projects[index]

    if (projectToRemove.image && projectToRemove.image.includes("/uploads/")) {
      try {
        const response = await fetch("/api/delete-image", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imagePath: projectToRemove.image })
        })
        if (response.ok) {
          console.log(`✅ 프로젝트 이미지 삭제 완료: ${projectToRemove.image}`)
        }
      } catch (error) {
        console.error("프로젝트 이미지 삭제 실패:", error)
      }
    }

    if (projectToRemove.video && projectToRemove.video.includes("/uploads/")) {
      try {
        const response = await fetch("/api/delete-image", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imagePath: projectToRemove.video })
        })
        if (response.ok) {
          console.log(`✅ 프로젝트 비디오 삭제 완료: ${projectToRemove.video}`)
        }
      } catch (error) {
        console.error("프로젝트 비디오 삭제 실패:", error)
      }
    }

    const newProjects = projectsInfo.projects.filter((_, i) => i !== index)
    await updateProjectsInfo("projects", newProjects)
  }

  // 표시할 프로젝트들
  const validProjects = projectsInfo.projects
  const visibleProjects = isEditMode
    ? validProjects
    : validProjects.slice(0, displayCount)
  const hasMoreProjects = validProjects.length > displayCount

  const loadMore = () => {
    setDisplayCount(prev =>
      Math.min(prev + projectsInfo.loadMoreCount, validProjects.length)
    )
  }

  // 이미지 비율 감지
  const detectImageAspect = (src: string) => {
    if (!src) return

    const img = new Image()
    img.onload = () => {
      const ratio = img.width / img.height
      let aspectClass: string

      if (ratio >= 1.7 && ratio <= 1.8) {
        aspectClass = "aspect-video"
      } else if (ratio >= 1.3 && ratio <= 1.35) {
        aspectClass = "aspect-[4/3]"
      } else if (ratio >= 0.95 && ratio <= 1.05) {
        aspectClass = "aspect-square"
      } else if (ratio >= 0.74 && ratio <= 0.76) {
        aspectClass = "aspect-[3/4]"
      } else if (ratio >= 0.55 && ratio <= 0.57) {
        aspectClass = "aspect-[9/16]"
      } else if (ratio >= 1.4 && ratio <= 1.45) {
        aspectClass = "aspect-[3/2]"
      } else if (ratio >= 0.65 && ratio <= 0.67) {
        aspectClass = "aspect-[2/3]"
      } else if (ratio > 1.8) {
        aspectClass = "aspect-[21/9]"
      } else if (ratio < 0.55) {
        aspectClass = "aspect-[1/2]"
      } else {
        aspectClass = ratio > 1 ? "aspect-video" : "aspect-[3/4]"
      }

      setImageAspects(prev => ({ ...prev, [src]: aspectClass }))
    }
    img.src = src
  }

  useEffect(() => {
    validProjects.forEach(project => {
      if (project.image) detectImageAspect(project.image)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validProjects.length])

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // 👉 배경 이미지: 인라인 에디터에서 선택한 게 있으면 그걸 쓰고,
  // 없으면 기본 projects-bg.jpg 사용
  const bgImage = backgroundData.image || "/uploads/projects-bg.jpg"

  return (
    <>
      <EditableBackground
        image={backgroundData.image}
        video={backgroundData.video}
        color={backgroundData.color}
        opacity={backgroundData.opacity}
        onChange={data => {
          const newData = { ...backgroundData, ...data }
          setBackgroundData(newData)
          saveData("projects-background", newData)

          const updatedProjectsInfo = { ...projectsInfo, background: newData }
          setProjectsInfo(updatedProjectsInfo)
          saveData("projects-info", updatedProjectsInfo)
        }}
        storageKey="projects-background"
        className="relative"
      >
        <section
          id="projects"
          className="relative w-full py-20 overflow-hidden"
        >
          {/* 배경 이미지 + 어두운 오버레이 */}
          <div className="absolute inset-0">
            <img
              src={bgImage}
              alt="Projects background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
          </div>

          {/* 실제 콘텐츠 영역 */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 섹션 제목 */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">
                <EditableText
                  value={projectsInfo.title}
                  onChange={value => updateProjectsInfo("title", value)}
                  storageKey="projects-title"
                />
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                <EditableText
                  value={projectsInfo.subtitle}
                  onChange={value => updateProjectsInfo("subtitle", value)}
                  storageKey="projects-subtitle"
                />
              </p>
            </div>

            {/* 프로젝트가 없을 때 */}
            {validProjects.length === 0 && !isEditMode ? (
              <div className="text-center py-20">
                <span className="text-6xl block mb-4">🚀</span>
                <p className="text-xl text-slate-200">준비 중입니다</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {visibleProjects.map((project, index) => {
                  const aspectClass =
                    (project.image && imageAspects[project.image]) ||
                    "aspect-[4/3]"

                  return (
                    <div
                      key={index}
                      className="group relative flex flex-col rounded-2xl
                      border border-emerald-500/20
                      bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950
                      p-4 shadow-sm hover:shadow-emerald-500/30
                      hover:-translate-y-1 hover:border-emerald-400/80
                      transition-all"
                      onClick={() =>
                        !isEditMode &&
                        setSelectedImage(project.video || project.image)
                      }
                    >
                      {isEditMode && (
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            removeProject(index)
                          }}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}

                      {/* 상단 뱃지 / 인덱스 */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-100 border border-emerald-400/40">
                          프로젝트 {String(index + 1).padStart(2, "0")}
                        </span>
                        {!isEditMode && project.pdf && (
                          <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-400/40">
                            PDF 첨부됨
                          </span>
                        )}
                      </div>

                      {/* 이미지 / 비디오 영역 */}
                      <div
                        className={`relative ${aspectClass} rounded-xl bg-slate-900/80 mb-3 overflow-hidden`}
                      >
                        {project.video ? (
                          <video
                            src={project.video}
                            className="absolute inset-0 w-full h-full object-contain bg-slate-900 transition-transform duration-300 group-hover:scale-105"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        ) : (
                          <EditableMedia
                            src={project.image || ""}
                            onChange={src => updateProject(index, "image", src)}
                            type="auto"
                            storageKey={`project-${index}-image`}
                            className="absolute inset-0 w-full h-full object-contain bg-slate-900 transition-transform duration-300 group-hover:scale-105"
                            alt={project.title}
                            purpose={`project-${index}`}
                          />
                        )}
                      </div>

                      {/* 텍스트 영역 */}
                      <div className="flex flex-col flex-grow gap-2">
                        <h3 className="font-semibold text-base text-white">
                          <EditableText
                            value={project.title || "프로젝트 제목"}
                            onChange={value =>
                              updateProject(index, "title", value)
                            }
                            storageKey={`project-${index}-title`}
                          />
                        </h3>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          <EditableText
                            value={project.description || "프로젝트 설명"}
                            onChange={value =>
                              updateProject(index, "description", value)
                            }
                            storageKey={`project-${index}-description`}
                            multiline
                          />
                        </p>

                        {/* PDF 링크 영역 */}
                        <div className="mt-3">
                          {isEditMode ? (
                            <>
                              <p className="text-xs font-medium text-slate-300 mb-1">
                                PDF 링크
                              </p>
                              <input
                                type="text"
                                value={project.pdf || ""}
                                onChange={e =>
                                  updateProject(index, "pdf", e.target.value)
                                }
                                onClick={e => e.stopPropagation()}
                                placeholder="예: /uploads/report1.pdf 또는 https://..."
                                className="w-full text-xs bg-white text-slate-900 placeholder:text-slate-400 border border-slate-500 rounded-md px-2 py-1"
                              />
                            </>
                          ) : project.pdf ? (
                            <button
                              className="w-full inline-flex items-center justify-between rounded-lg border border-emerald-500/40 bg-slate-950/80 px-3 py-2 text-xs text-emerald-200 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all"
                              onClick={e => {
                                e.stopPropagation()
                                window.open(
                                  project.pdf,
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                              }}
                            >
                              <span className="inline-flex items-center gap-1">
                                📄 <span>PDF 보기</span>
                              </span>
                              <span className="text-[10px] text-emerald-200/70">
                                새 창에서 열기
                              </span>
                            </button>
                          ) : (
                            <p className="text-xs text-slate-400">
                              등록된 PDF가 없습니다.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* 편집 모드일 때 프로젝트 추가 카드 */}
                {isEditMode && (
                  <div
                    className="h-full min-h-[260px] border-2 border-dashed border-emerald-500/40 rounded-2xl flex items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-500/5 transition-all"
                    onClick={() => setShowProjectModal(true)}
                  >
                    <div className="text-center">
                      <Plus className="h-10 w-10 mx-auto mb-2 text-emerald-300" />
                      <p className="text-sm text-emerald-100">프로젝트 추가</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 더보기 버튼 */}
            {hasMoreProjects && !isEditMode && (
              <div className="text-center mt-10">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-emerald-500 text-slate-900 rounded-lg hover:bg-emerald-400 transition-all inline-flex items-center gap-2 text-sm font-semibold"
                >
                  <ChevronDown className="h-5 w-5" />
                  더 많은 프로젝트 보기 ({validProjects.length - displayCount}
                  개 더)
                </button>
              </div>
            )}

            {/* 표시 설정 버튼 (편집 모드에서만) */}
            {isEditMode && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowDisplaySettings(true)}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all inline-flex items-center gap-2 text-sm"
                >
                  <LayoutGrid className="h-5 w-5" />
                  더보기 설정
                </button>
              </div>
            )}
          </div>
        </section>
      </EditableBackground>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-background rounded-lg shadow-2xl max-w-4xl max-h-[85vh] w-full overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background shadow-lg transition-all hover:scale-110"
              aria-label="닫기"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4">
              {selectedImage &&
              (selectedImage.includes(".mp4") ||
                selectedImage.includes(".webm") ||
                selectedImage.includes("youtube")) ? (
                <video
                  src={selectedImage}
                  className="max-w-full max-h-[75vh] object-contain rounded"
                  controls
                  autoPlay
                  loop
                />
              ) : (
                <img
                  src={selectedImage}
                  alt="확대된 프로젝트 이미지"
                  className="max-w-full max-h-[75vh] object-contain rounded"
                  onError={e => {
                    const target = e.currentTarget
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent) {
                      const placeholder = document.createElement("div")
                      placeholder.className =
                        "text-muted-foreground text-center py-20"
                      placeholder.innerHTML =
                        '<span class="text-6xl">📁</span><p class="mt-4">미디어를 불러올 수 없습니다</p>'
                      parent.appendChild(placeholder)
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* 프로젝트 추가 모달 */}
      {showProjectModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">새 프로젝트 추가</h3>
              <button
                onClick={async () => {
                  if (newProject.image && newProject.image.includes("/uploads/")) {
                    try {
                      await fetch("/api/delete-image", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ imagePath: newProject.image })
                      })
                    } catch (error) {
                      console.error("Failed to delete uploaded file:", error)
                    }
                  }
                  setNewProject({
                    image: "",
                    title: "",
                    description: "",
                    pdf: ""
                  })
                  setShowProjectModal(false)
                }}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* 이미지/비디오 업로드 */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  프로젝트 이미지/비디오
                </label>
                <div className="h-48 rounded-lg overflow-hidden bg-muted">
                  {newProject.image ? (
                    <div className="relative h-full">
                      {newProject.image.includes(".mp4") ||
                      newProject.image.includes(".webm") ? (
                        <video
                          src={newProject.image}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={newProject.image}
                          alt="프로젝트 미리보기"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <button
                        onClick={() =>
                          setNewProject({ ...newProject, image: "" })
                        }
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-2">
                      <input
                        id="project-upload"
                        type="file"
                        accept="image/*,video/mp4,video/webm"
                        onChange={async e => {
                          const file = e.target.files?.[0]
                          if (!file) return

                          const isVideo = file.type.includes("video")
                          const maxSize = isVideo
                            ? 20 * 1024 * 1024
                            : 5 * 1024 * 1024

                          if (file.size > maxSize) {
                            alert(
                              `파일 크기는 ${
                                isVideo ? "20MB" : "5MB"
                              } 이하여야 합니다`
                            )
                            return
                          }

                          const formData = new FormData()
                          formData.append("file", file)
                          formData.append("purpose", `project-${Date.now()}`)

                          try {
                            const response = await fetch(
                              isVideo ? "/api/upload-video" : "/api/upload-image",
                              {
                                method: "POST",
                                body: formData
                              }
                            )

                            const result = await response.json()

                            if (result.success) {
                              setNewProject({
                                ...newProject,
                                image: result.path
                              })
                            } else {
                              alert(`❌ ${result.error}`)
                            }
                          } catch {
                            alert("업로드 중 오류가 발생했습니다")
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="project-upload"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 cursor-pointer"
                      >
                        <Upload className="h-4 w-4 inline mr-2" />
                        파일 업로드
                      </label>
                      <input
                        type="text"
                        value={newProject.image}
                        onChange={e =>
                          setNewProject({ ...newProject, image: e.target.value })
                        }
                        placeholder="또는 URL 입력 (https://...)"
                        className="px-3 py-2 border rounded-lg bg-white text-sm text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 프로젝트 제목 */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  프로젝트 제목
                </label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={e =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  placeholder="예: 브랜드 리뉴얼 프로젝트"
                  className="w-full px-3 py-2 border rounded-lg bg-white text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* 프로젝트 설명 */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  프로젝트 설명
                </label>
                <textarea
                  value={newProject.description}
                  onChange={e =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value
                    })
                  }
                  placeholder="예: 스타트업 A사의 전체 브랜딩 리뉴얼 및 UI/UX 개선"
                  className="w-full px-3 py-2 border rounded-lg bg-white text-slate-900 placeholder:text-slate-400 resize-none"
                  rows={3}
                />
              </div>

              {/* PDF 링크 */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  PDF 링크 (선택)
                </label>
                <input
                  type="text"
                  value={newProject.pdf}
                  onChange={e =>
                    setNewProject({ ...newProject, pdf: e.target.value })
                  }
                  placeholder="예: /uploads/report1.pdf 또는 https://..."
                  className="w-full px-3 py-2 border rounded-lg bg-white text-slate-900 text-sm placeholder:text-slate-400"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  PDF 파일을 public/uploads 폴더에 넣은 뒤 경로를 입력하거나,
                  외부 URL을 직접 입력할 수 있어요.
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={async () => {
                  if (newProject.title && newProject.description) {
                    const isVideo =
                      newProject.image &&
                      (newProject.image.includes(".mp4") ||
                        newProject.image.includes(".webm"))
                    const projectData: ProjectItem = {
                      image: isVideo ? "" : newProject.image,
                      video: isVideo ? newProject.image : "",
                      title: newProject.title,
                      description: newProject.description,
                      pdf: newProject.pdf || undefined
                    }
                    const updatedProjects = [
                      ...projectsInfo.projects,
                      projectData
                    ]
                    const updatedInfo = {
                      ...projectsInfo,
                      projects: updatedProjects
                    }
                    setProjectsInfo(updatedInfo)
                    saveData("projects-info", updatedInfo)

                    const success = await saveToFile(
                      "projects",
                      "Info",
                      updatedInfo
                    )
                    if (success) {
                      alert("✅ 프로젝트가 추가되고 파일에 저장되었습니다!")
                    }

                    setNewProject({
                      image: "",
                      title: "",
                      description: "",
                      pdf: ""
                    })
                    setShowProjectModal(false)
                  } else {
                    alert("제목과 설명을 입력해주세요")
                  }
                }}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                추가
              </button>
              <button
                onClick={async () => {
                  if (newProject.image && newProject.image.includes("/uploads/")) {
                    try {
                      await fetch("/api/delete-image", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ imagePath: newProject.image })
                      })
                    } catch (error) {
                      console.error("Failed to delete uploaded file:", error)
                    }
                  }
                  setNewProject({
                    image: "",
                    title: "",
                    description: "",
                    pdf: ""
                  })
                  setShowProjectModal(false)
                }}
                className="flex-1 py-2 border rounded-lg hover:bg-muted"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 표시 설정 모달 */}
      {showDisplaySettings && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-background border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">더보기 설정</h3>
              <button
                onClick={() => setShowDisplaySettings(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* 초기 표시 개수 */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  처음에 보여줄 프로젝트 개수
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 6, 9, 12].map(num => (
                    <button
                      key={num}
                      onClick={() => {
                        updateProjectsInfo("initialDisplay", num)
                        setDisplayCount(Math.min(displayCount, num))
                      }}
                      className={`py-2 px-3 rounded-lg border transition-all ${
                        projectsInfo.initialDisplay === num
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      {num}개
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    value={projectsInfo.initialDisplay}
                    onChange={e => {
                      const value = Math.max(
                        1,
                        parseInt(e.target.value || "1", 10) || 1
                      )
                      updateProjectsInfo("initialDisplay", value)
                      setDisplayCount(Math.min(displayCount, value))
                    }}
                    min={1}
                    max={100}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-slate-900"
                    placeholder="직접 입력 (1-100)"
                  />
                </div>
              </div>

              {/* 더보기 클릭 시 추가 개수 */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  더보기 클릭 시 추가로 보여줄 개수
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 6, 9, 12].map(num => (
                    <button
                      key={num}
                      onClick={() => updateProjectsInfo("loadMoreCount", num)}
                      className={`py-2 px-3 rounded-lg border transition-all ${
                        projectsInfo.loadMoreCount === num
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      {num}개
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    value={projectsInfo.loadMoreCount}
                    onChange={e => {
                      const value = Math.max(
                        1,
                        parseInt(e.target.value || "1", 10) || 1
                      )
                      updateProjectsInfo("loadMoreCount", value)
                    }}
                    min={1}
                    max={100}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-slate-900"
                    placeholder="직접 입력 (1-100)"
                  />
                </div>
              </div>

              {/* 현재 상태 미리보기 */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium mb-2">현재 설정:</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• 전체 프로젝트: {validProjects.length}개</p>
                  <p>• 처음 표시: {projectsInfo.initialDisplay}개</p>
                  <p>• 더보기 클릭당: {projectsInfo.loadMoreCount}개씩 추가</p>
                  {validProjects.length > projectsInfo.initialDisplay && (
                    <p className="text-primary mt-2">
                      → 더보기 버튼{" "}
                      {Math.ceil(
                        (validProjects.length - projectsInfo.initialDisplay) /
                          projectsInfo.loadMoreCount
                      )}
                      번 클릭 필요
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-xs font-medium mb-1">💡 추천 설정:</p>
                <p className="text-xs text-muted-foreground">
                  • 프로젝트가 많은 경우: 6개 표시, 3개씩 추가
                  <br />
                  • 프로젝트가 적은 경우: 3개 표시, 3개씩 추가
                  <br />
                  • 모바일 고려: 3의 배수로 설정 권장
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => {
                  updateProjectsInfo("initialDisplay", 6)
                  updateProjectsInfo("loadMoreCount", 3)
                  setDisplayCount(6)
                }}
                className="flex-1 py-2 border rounded-lg hover:bg-muted"
              >
                기본값으로 초기화
              </button>
              <button
                onClick={async () => {
                  const success = await saveToFile(
                    "projects",
                    "Info",
                    projectsInfo
                  )
                  if (success) {
                    alert("✅ 프로젝트 설정이 파일에 저장되었습니다!")
                  }
                  setShowDisplaySettings(false)
                }}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                📁 저장 & 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}