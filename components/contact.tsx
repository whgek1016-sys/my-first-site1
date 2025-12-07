"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Youtube,
  Facebook,
  MapPin,
  Clock,
  Globe,
  Twitter,
  Send,
  Linkedin,
  Edit2,
  X,
  Plus,
  Github,
  MessageSquare,
  Twitch,
  Save,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { EditableText } from "@/components/editable/editable-text"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"

// 사용 가능한 소셜 아이콘 정의
const AVAILABLE_ICONS = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  discord: MessageSquare,
  twitch: Twitch,
  telegram: Send,
  globe: Globe,
  message: MessageCircle,
  mail: Mail,
}

export function Contact() {
  const { getData, saveData, isEditMode, saveToFile } = useInlineEditor()
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showSocialModal, setShowSocialModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [showIconPicker, setShowIconPicker] = useState<number | null>(null)

  // 기본 데이터
  const defaultInfo = {
    name: "임지원",
    title: "대학생",
    company: "",
    experience: "",
    phone: "010-7637-7371",
    email: "whgek1016@dankook.ac.kr",
    website: "",
    location: "📍 Seoul, South Korea",
    workTime: "평일 09:00 - 18:00",
    responseTime: "24시간 이내 응답",
    sectionTitle: "Contacts",
    sectionSubtitle: "도시와 금융, 그리고 데이터를 잇는 시선으로\n프로젝트의 구조를 다시 설계합니다.\n함께 새로운 가치를 만들고 싶다면 언제든 편하게 연락주세요.",
    qrTitle: "QR 코드로 연락처 저장",
    qrSubtitle: "스캔하면 연락처가 자동으로 저장됩니다",
    bottomMessage: "부동삶, 흔들리지 않는 삶을 설계합니다.",
    bottomSubMessage: "부동산이라는 자산이 곧 누군가의 삶이라는 믿음으로, 구조의 데이터를 기반으로 한 솔루션을 함께 만들어가겠습니다.",
    qrContent: ["name","phone","email","location","website","company"],
    profileEmoji: "🏙️",
    background: {"image":"","video":"","color":"","opacity":0.1}
  }

  // 소셜 링크 기본값 (배열 형태로 변경)
  const defaultSocialLinks: { name: string; icon: string; url: string }[] = [
  {
    name: "Instagram",
    icon: "instagram",
    url: "https://www.instagram.com/icandowhateveriwant__?igsh=MWN1a3ljNDZ2OHd6dQ%3D%3D&utm_source=qr",
  },
  {
    name: "Blog",
    icon: "globe",
    url: "https://m.blog.naver.com/whgek1120/222828796666",
  },
]
  const [contactInfo, setContactInfo] = useState(defaultInfo)
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks)
  const [backgroundData, setBackgroundData] = useState(defaultInfo.background)

  // localStorage에서 데이터 로드
  useEffect(() => {
    const savedData = getData("contact-info") as typeof defaultInfo | null
    if (savedData) {
      setContactInfo({ ...defaultInfo, ...savedData })
      if (savedData.background) {
        setBackgroundData(savedData.background)
      }
    }

    const savedSocial = getData(
      "contact-social-links",
    ) as { name: string; icon: string; url: string }[] | null
    if (savedSocial) {
      setSocialLinks(savedSocial)
    }

    const savedBg = getData("contact-background") as {
      image: string
      video: string
      color: string
      opacity: number
    } | null
    if (savedBg) {
      setBackgroundData(savedBg)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode])

  const updateContactInfo = (key: string, value: string) => {
    const newInfo = { ...contactInfo, [key]: value }
    setContactInfo(newInfo)
    saveData("contact-info", newInfo)
  }

  const addSocialLink = () => {
    const newLinks = [...socialLinks]
    newLinks.push({ name: "새 링크", icon: "globe", url: "" })
    setSocialLinks(newLinks)
    saveData("contact-social-links", newLinks)
  }

  const updateSocialLink = (
    index: number,
    field: "name" | "icon" | "url",
    value: string,
  ) => {
    const newLinks = [...socialLinks]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setSocialLinks(newLinks)
    saveData("contact-social-links", newLinks)
  }

  const removeSocialLink = (index: number) => {
    const newLinks = socialLinks.filter((_, i) => i !== index)
    setSocialLinks(newLinks)
    saveData("contact-social-links", newLinks)
  }

  // QR 코드에 포함할 내용 결정
  const generateVCard = () => {
    const qrContent =
      contactInfo.qrContent && contactInfo.qrContent.length > 0
        ? contactInfo.qrContent
        : ["name", "phone", "email"]
    let vCard = "BEGIN:VCARD\nVERSION:3.0\n"

    // 이름
    if (qrContent.includes("name")) {
      const displayName = contactInfo.title
        ? `${contactInfo.name} (${contactInfo.title})`
        : contactInfo.name

      vCard += `FN:${displayName}\n`
      vCard += `N:${contactInfo.name};;;;\n`
    }

    if (qrContent.includes("company") && contactInfo.company) {
      vCard += `ORG:${contactInfo.company}\n`
    }

    if (qrContent.includes("phone")) {
      vCard += `TEL;TYPE=CELL:${contactInfo.phone}\n`
    }

    if (qrContent.includes("email")) {
      vCard += `EMAIL:${contactInfo.email}\n`
    }

    if (qrContent.includes("location") && contactInfo.location) {
      vCard += `ADR;TYPE=WORK:;;${contactInfo.location};;;;\n`
    }

    if (qrContent.includes("website") && contactInfo.website) {
      vCard += `URL:${contactInfo.website}\n`
    }

    const activeSocialLinks = socialLinks.filter((link) => link.url)
    if (activeSocialLinks.length > 0) {
      let note = "SNS:\\n"
      activeSocialLinks.forEach((link) => {
        note += `${link.name}: ${link.url}\\n`
      })
      vCard += `NOTE:${note}\n`
    }

    vCard += "END:VCARD"
    return vCard
  }

  const vCardString = generateVCard()
  const encodedVCard = encodeURIComponent(vCardString.trim())
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodedVCard}`

  return (
    <EditableBackground
      image={backgroundData.image}
      video={backgroundData.video}
      color={backgroundData.color}
      opacity={backgroundData.opacity}
      onChange={(data) => {
        const newData = { ...backgroundData, ...data }
        setBackgroundData(newData)
        saveData("contact-background", newData)

        const updatedContactInfo = { ...contactInfo, background: newData }
        setContactInfo(updatedContactInfo)
        saveData("contact-info", updatedContactInfo)
      }}
      storageKey="contact-background"
      className="relative"
    >
      <section
        id="contact"
        className="py-20 backdrop-blur-2xl bg-black/40 rounded-3xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 섹션 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,0.45)]">
              <EditableText
                value={contactInfo.sectionTitle}
                onChange={(value) => updateContactInfo("sectionTitle", value)}
                storageKey="contact-sectionTitle"
              />
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              <EditableText
                value={contactInfo.sectionSubtitle}
                onChange={(value) =>
                  updateContactInfo("sectionSubtitle", value)
                }
                storageKey="contact-sectionSubtitle"
                multiline
              />
            </p>
          </div>

          {/* 메인 좌우 분할 레이아웃 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 왼쪽: 전체를 하나의 큰 카드로 통합 */}
            <Card className="p-8 lg:p-10 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl space-y-8">
              {/* 프로필 섹션 헤더 + 편집 버튼 */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  프로필 정보
                </h3>
                {isEditMode && (
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center gap-1"
                    title="프로필 편집"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>편집</span>
                  </button>
                )}
              </div>

              {/* 프로필 내용 */}
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{contactInfo.profileEmoji}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {contactInfo.name}
                  </h3>
                  <p className="text-lg text-white/90 mb-2">
                    {contactInfo.title}
                  </p>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {contactInfo.experience}
                    {contactInfo.responseTime &&
                      ` · ${contactInfo.responseTime}`}
                  </p>
                </div>
              </div>

              {/* 구분선 */}
              <div className="h-px bg-white/10" />

              {/* 주요 연락 수단 2x2 그리드 (div로 통일) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 전화 */}
                <a href={`tel:${contactInfo.phone}`} className="group">
                  <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <Phone className="h-5 w-5 text-green-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-300">전화</p>
                      <p className="text-sm font-medium text-white truncate">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </div>
                </a>

                {/* 이메일 */}
                <a href={`mailto:${contactInfo.email}`} className="group">
                  <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <Mail className="h-5 w-5 text-blue-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-300">이메일</p>
                      <p className="text-sm font-medium text-white truncate">
                        {contactInfo.email}
                      </p>
                    </div>
                  </div>
                </a>

                {/* 위치 */}
                <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-purple-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-300">위치</p>
                    <p className="text-sm font-medium text-white truncate">
                      {contactInfo.location}
                    </p>
                  </div>
                </div>

                {/* 업무시간 */}
                <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-amber-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-300">업무시간</p>
                    <p className="text-sm font-medium text-white truncate">
                      {contactInfo.workTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* 소셜 미디어 섹션 */}
              <div className="flex items-center justify-between mt-6 mb-2">
                <h3 className="text-lg font-semibold text-white">
                  소셜 미디어
                </h3>
                {isEditMode && (
                  <button
                    onClick={() => setShowSocialModal(true)}
                    className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center gap-1"
                    title="소셜 미디어 편집"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>편집</span>
                  </button>
                )}
              </div>

              <div className="p-2 rounded-xl bg-white/5 w-fit mx-auto">
                <div className="flex items-center gap-2">
                  {socialLinks.map((link, index) => {
                    if (!link.url) return null
                    const Icon =
                      AVAILABLE_ICONS[
                        link.icon as keyof typeof AVAILABLE_ICONS
                      ] || Globe
                    const isEmail =
                      link.icon === "mail" || link.url.startsWith("mailto:")
                    const href =
                      isEmail && !link.url.startsWith("mailto:")
                        ? `mailto:${link.url}`
                        : link.url

                    let bgClass = "bg-primary/20 hover:bg-primary/30"
                    let iconClass = "text-primary-foreground"

                    switch (link.icon) {
                      case "message":
                        bgClass = "bg-yellow-500/20 hover:bg-yellow-500/30"
                        iconClass = "text-yellow-100"
                        break
                      case "instagram":
                        bgClass = "bg-pink-500/20 hover:bg-pink-500/30"
                        iconClass = "text-pink-50"
                        break
                      case "youtube":
                        bgClass = "bg-red-500/20 hover:bg-red-500/30"
                        iconClass = "text-red-50"
                        break
                      case "facebook":
                        bgClass = "bg-blue-600/20 hover:bg-blue-600/30"
                        iconClass = "text-blue-50"
                        break
                      case "twitter":
                        bgClass = "bg-sky-500/20 hover:bg-sky-500/30"
                        iconClass = "text-sky-50"
                        break
                      case "linkedin":
                        bgClass = "bg-blue-700/20 hover:bg-blue-700/30"
                        iconClass = "text-blue-50"
                        break
                      case "telegram":
                        bgClass = "bg-blue-500/20 hover:bg-blue-500/30"
                        iconClass = "text-blue-50"
                        break
                      case "github":
                        bgClass = "bg-gray-700/40 hover:bg-gray-700/60"
                        iconClass = "text-gray-50"
                        break
                      case "discord":
                        bgClass = "bg-purple-500/20 hover:bg-purple-500/30"
                        iconClass = "text-purple-50"
                        break
                      case "twitch":
                        bgClass = "bg-purple-600/20 hover:bg-purple-600/30"
                        iconClass = "text-purple-50"
                        break
                      case "mail":
                        bgClass = "bg-blue-500/20 hover:bg-blue-500/30"
                        iconClass = "text-blue-50"
                        break
                    }

                    return (
                      <a
                        key={index}
                        href={href}
                        target={isEmail ? undefined : "_blank"}
                        rel={isEmail ? undefined : "noopener noreferrer"}
                        className={`p-3 ${bgClass} rounded-full transition-all hover:scale-110 hover:shadow-[0_0_16px_rgba(255,255,255,0.35)]`}
                        aria-label={link.name}
                        title={link.name}
                      >
                        <Icon className={`h-5 w-5 ${iconClass}`} />
                      </a>
                    )
                  })}
                </div>
                {socialLinks.every((link) => !link.url) && (
                  <p className="text-sm text-gray-300 mt-2">
                    소셜 미디어 링크를 추가해주세요
                  </p>
                )}
              </div>
            </Card>

            {/* 오른쪽: QR 코드 & 추가 정보 */}
            <Card className="p-8 lg:p-10 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-white mb-2">
                  QR 코드로 연락처 저장
                </h4>
                <p className="text-sm text-gray-200 mb-3">
                  {contactInfo.qrContent && contactInfo.qrContent.length > 0
                    ? "스캔하면 선택한 정보가 연락처로 저장됩니다"
                    : "QR 코드에 포함할 정보를 선택해주세요"}
                </p>
                {isEditMode && (
                  <button
                    onClick={() => setShowQRModal(true)}
                    className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors inline-flex items-center gap-1"
                    title="QR 코드 설정"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>QR 설정</span>
                  </button>
                )}
              </div>

              <div className="flex justify-center mb-4">
                <Image
                  src={qrCodeUrl}
                  alt="연락처 QR 코드"
                  width={280}
                  height={280}
                  className="w-[280px] h-[280px] rounded-2xl bg-white/10 p-2"
                  style={{ imageRendering: "crisp-edges" }}
                  unoptimized
                />
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-xs text-gray-100 text-center">
                  📱 스캔하면 연락처가 자동 저장됩니다
                </p>
                <p className="text-xs text-gray-200 text-center mt-1">
                  포함된 정보:{" "}
                  {contactInfo.qrContent
                    ?.map((key) => {
                      switch (key) {
                        case "name":
                          return "이름"
                        case "phone":
                          return "전화번호"
                        case "email":
                          return "이메일"
                        case "title":
                          return "직함"
                        case "company":
                          return "회사"
                        case "location":
                          return "위치"
                        case "website":
                          return "웹사이트"
                        default:
                          return key
                      }
                    })
                    .join(", ") || "없음"}
                </p>
              </div>
            </Card>
          </div>

          {/* 하단 메시지 */}
          <div className="mt-16 text-center p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            <p className="text-lg font-medium text-white mb-2">
              <EditableText
                value={contactInfo.bottomMessage}
                onChange={(value) => updateContactInfo("bottomMessage", value)}
                storageKey="contact-bottomMessage"
              />
            </p>
            <p className="text-gray-200 text-sm">
              <EditableText
                value={contactInfo.bottomSubMessage}
                onChange={(value) =>
                  updateContactInfo("bottomSubMessage", value)
                }
                storageKey="contact-bottomSubMessage"
              />
            </p>
          </div>
        </div>
      </section>

      {/* 프로필 편집 모달 */}
      {showProfileModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">프로필 정보 편집</h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* 기본 정보 */}
            <div className="space-y-4 mb-6">
              <h4 className="font-medium">기본 정보</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">이름</label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => updateContactInfo("name", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">직함</label>
                  <input
                    type="text"
                    value={contactInfo.title}
                    onChange={(e) => updateContactInfo("title", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    회사명 (선택)
                  </label>
                  <input
                    type="text"
                    value={contactInfo.company}
                    onChange={(e) =>
                      updateContactInfo("company", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                    placeholder="회사명"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">경력</label>
                  <input
                    type="text"
                    value={contactInfo.experience}
                    onChange={(e) =>
                      updateContactInfo("experience", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    프로필 이모지
                  </label>
                  <input
                    type="text"
                    value={contactInfo.profileEmoji}
                    onChange={(e) =>
                      updateContactInfo("profileEmoji", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                    placeholder="👤"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    응답 시간
                  </label>
                  <input
                    type="text"
                    value={contactInfo.responseTime}
                    onChange={(e) =>
                      updateContactInfo("responseTime", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className="space-y-4 mb-6">
              <h4 className="font-medium">연락처</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    전화번호
                  </label>
                  <input
                    type="text"
                    value={contactInfo.phone}
                    onChange={(e) => updateContactInfo("phone", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) =>
                      updateContactInfo("email", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">위치</label>
                  <input
                    type="text"
                    value={contactInfo.location}
                    onChange={(e) =>
                      updateContactInfo("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    업무시간
                  </label>
                  <input
                    type="text"
                    value={contactInfo.workTime}
                    onChange={(e) =>
                      updateContactInfo("workTime", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    웹사이트
                  </label>
                  <input
                    type="text"
                    value={contactInfo.website || ""}
                    onChange={(e) =>
                      updateContactInfo("website", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={async () => {
                  const success = await saveToFile("contact", "Info", contactInfo)
                  if (success) {
                    console.log("✅ 프로필 정보 저장 완료")
                  }
                  setShowProfileModal(false)
                }}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" />
                저장 & 완료
              </button>
              <button
                onClick={() => setShowProfileModal(false)}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 소셜 미디어 편집 모달 */}
      {showSocialModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">소셜 링크 편집</h3>
              <button
                onClick={() => {
                  setShowSocialModal(false)
                  setShowIconPicker(null)
                }}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {socialLinks.map((link, index) => {
                const Icon =
                  AVAILABLE_ICONS[
                    link.icon as keyof typeof AVAILABLE_ICONS
                  ] || Globe

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>

                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) =>
                        updateSocialLink(index, "name", e.target.value)
                      }
                      placeholder="플랫폼 이름"
                      className="w-32 px-3 py-2 border rounded-lg bg-background"
                    />

                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowIconPicker(
                            showIconPicker === index ? null : index,
                          )
                        }
                        className="px-3 py-2 border rounded-lg bg-background hover:bg-muted flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">아이콘 변경</span>
                      </button>

                      {showIconPicker === index && (
                        <div className="absolute top-full mt-2 left-0 bg-background border rounded-lg shadow-lg p-2 z-50 w-64 max-h-64 overflow-y-auto">
                          <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                            소셜 미디어
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            {[
                              { value: "instagram", label: "Instagram" },
                              { value: "youtube", label: "YouTube" },
                              { value: "facebook", label: "Facebook" },
                              { value: "twitter", label: "Twitter" },
                              { value: "linkedin", label: "LinkedIn" },
                              { value: "github", label: "GitHub" },
                              { value: "discord", label: "Discord" },
                              { value: "twitch", label: "Twitch" },
                              { value: "telegram", label: "Telegram" },
                              { value: "message", label: "메시지" },
                              { value: "mail", label: "이메일" },
                              { value: "globe", label: "웹사이트" },
                            ].map(({ value, label }) => {
                              const IconOption =
                                AVAILABLE_ICONS[
                                  value as keyof typeof AVAILABLE_ICONS
                                ]
                              return (
                                <button
                                  key={value}
                                  onClick={() => {
                                    updateSocialLink(index, "icon", value)
                                    setShowIconPicker(null)
                                  }}
                                  className="p-2 hover:bg-muted rounded-lg flex flex-col items-center gap-1 transition-colors"
                                  title={label}
                                >
                                  <IconOption className="h-5 w-5" />
                                  <span className="text-xs">{label}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) =>
                        updateSocialLink(index, "url", e.target.value)
                      }
                      placeholder="URL 또는 이메일"
                      className="flex-1 px-3 py-2 border rounded-lg bg-background"
                    />

                    <button
                      onClick={() => removeSocialLink(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}

              <button
                onClick={addSocialLink}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                소셜 링크 추가
              </button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                💡 팁: 플랫폼 이름을 입력하고, 아이콘을 선택한 후 URL을 입력하세요.
                빈 URL은 표시되지 않습니다.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    const success = await saveToFile(
                      "contact",
                      "SocialLinks",
                      socialLinks,
                    )
                    if (success) {
                      console.log("✅ 소셜 링크 저장 완료")
                    }
                    setShowSocialModal(false)
                    setShowIconPicker(null)
                  }}
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  저장 & 완료
                </button>
                <button
                  onClick={() => {
                    setShowSocialModal(false)
                    setShowIconPicker(null)
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR 코드 설정 모달 */}
      {showQRModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-background border rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">QR 코드 설정</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-muted-foreground">
                QR 코드에 포함할 정보를 선택하세요
              </p>

              <div className="space-y-2">
                {[
                  { key: "name", label: "이름" },
                  { key: "phone", label: "전화번호" },
                  { key: "email", label: "이메일" },
                  { key: "title", label: "직함" },
                  { key: "company", label: "회사명" },
                  { key: "location", label: "위치" },
                  { key: "website", label: "웹사이트" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={contactInfo.qrContent?.includes(key) || false}
                      onChange={(e) => {
                        const currentContent = contactInfo.qrContent || []
                        const newContent = e.target.checked
                          ? [...currentContent, key]
                          : currentContent.filter((item) => item !== key)
                        // 타입 꼬임 방지용 캐스팅 유지 (기존 로직 그대로)
                        updateContactInfo(
                          "qrContent",
                          newContent as unknown as string,
                        )
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              완료
            </button>
          </div>
        </div>
      )}
    </EditableBackground>
  )
}
