"use client"

import { ArrowUp, Heart, Youtube, Globe, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import { EditableText } from "@/components/editable/editable-text"
import { useInlineEditor } from "@/contexts/inline-editor-context"

export function Footer() {
  const { getData, saveData, isEditMode, saveToFile } = useInlineEditor()
  const currentYear = new Date().getFullYear()

  // 기본 데이터 (빠른 링크 관련 옵션 제거)
  const defaultInfo = {
    showFooter: true,
    name: "임지원",
    description: "당신을 소개하는 짧은 문구를 작성해주세요. ",
    showContactInfo: true,
    contactTitle: "연락처",
    phone: "010-7637-7371",
    email: "whgek1016@dankook.ac.kr",
    location: " Seoul, South Korea",
    copyright: "",
    showMadeWith: true,
    madeWithLocation: "Mrbaeksang",
    showTemplateCredit: true,
    templateCreator: {"name":"백상","youtube":"https://www.youtube.com/@Mrbaeksang95/videos","website":"https://devcom.kr/","email":"qortkdgus95@gmail.com"},
    showScrollTop: true
  }

  const [footerInfo, setFooterInfo] = useState(defaultInfo)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // localStorage에서 데이터 로드
  useEffect(() => {
    const savedData = getData("footer-info")
    if (savedData) {
      // Made with와 템플릿 크레딧은 편집 불가이므로 기본값 유지
      setFooterInfo({
        ...defaultInfo,
        ...savedData,
        showMadeWith: defaultInfo.showMadeWith,
        madeWithLocation: defaultInfo.madeWithLocation,
        showTemplateCredit: defaultInfo.showTemplateCredit,
        templateCreator: defaultInfo.templateCreator,
      })
    }
  }, [getData])

  const updateFooterInfo = async (key: string, value: string | boolean) => {
    // Made with와 템플릿 크레딧 관련 필드는 수정 불가
    if (
      key === "showMadeWith" ||
      key === "madeWithLocation" ||
      key === "showTemplateCredit" ||
      key === "templateCreator"
    ) {
      return
    }

    const newInfo = { ...footerInfo, [key]: value }
    setFooterInfo(newInfo)
    saveData("footer-info", newInfo)
    await saveToFile("footer", "Info", newInfo)
  }

  // 푸터 전체를 표시하지 않음
  if (!footerInfo.showFooter && !isEditMode) {
    return null
  }

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 상단 섹션 */}
        {(footerInfo.name || footerInfo.showContactInfo) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* 브랜드/이름 */}
            {footerInfo.name && (
              <div>
                <h3 className="font-bold text-foreground mb-3">
                  <EditableText
                    value={footerInfo.name}
                    onChange={(value) => updateFooterInfo("name", value)}
                    storageKey="footer-name"
                  />
                </h3>
                {footerInfo.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <EditableText
                      value={footerInfo.description}
                      onChange={(value) => updateFooterInfo("description", value)}
                      storageKey="footer-description"
                      multiline
                    />
                  </p>
                )}
              </div>
            )}

            {/* 연락처 정보 */}
            {footerInfo.showContactInfo &&
              (footerInfo.phone || footerInfo.email || footerInfo.location) && (
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    <EditableText
                      value={footerInfo.contactTitle}
                      onChange={(value) => updateFooterInfo("contactTitle", value)}
                      storageKey="footer-contact-title"
                    />
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {footerInfo.phone && (
                      <p>
                        <EditableText
                          value={footerInfo.phone}
                          onChange={(value) => updateFooterInfo("phone", value)}
                          storageKey="footer-phone"
                        />
                      </p>
                    )}
                    {footerInfo.email && (
                      <p>
                        <EditableText
                          value={footerInfo.email}
                          onChange={(value) => updateFooterInfo("email", value)}
                          storageKey="footer-email"
                        />
                      </p>
                    )}
                    {footerInfo.location && (
                      <p>
                        <EditableText
                          value={footerInfo.location}
                          onChange={(value) => updateFooterInfo("location", value)}
                          storageKey="footer-location"
                        />
                      </p>
                    )}
                  </div>
                </div>
              )}
          </div>
        )}

        {/* 하단 카피라이트 */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {isEditMode ? (
              <EditableText
                value={
                  footerInfo.copyright ||
                  `© ${currentYear} ${footerInfo.name || "Portfolio"}. All rights reserved.`
                }
                onChange={(value) => updateFooterInfo("copyright", value)}
                storageKey="footer-copyright"
              />
            ) : (
              <p>
                {footerInfo.copyright ||
                  `© ${currentYear} ${footerInfo.name || "Portfolio"}. All rights reserved.`}
              </p>
            )}
          </div>

          {/* Made with 메시지 & 템플릿 크레딧 */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {footerInfo.showMadeWith && (
              <span className="flex items-center">
                Made with <Heart className="h-3 w-3 mx-1 text-red-500" />
                {footerInfo.madeWithLocation && `in ${footerInfo.madeWithLocation}`}
              </span>
            )}

            {footerInfo.showTemplateCredit && footerInfo.templateCreator && (
              <>
                {footerInfo.showMadeWith && (
                  <span className="text-muted-foreground/50">•</span>
                )}
                <span className="text-xs text-muted-foreground/70">
                  Template by Mrbaeksang
                </span>
                <div className="flex items-center gap-1">
                  <a
                    href={`mailto:${footerInfo.templateCreator.email}`}
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-muted transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-3 w-3 text-muted-foreground/70 hover:text-muted-foreground" />
                  </a>
                  <a
                    href={footerInfo.templateCreator.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-muted transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-3 w-3 text-muted-foreground/70 hover:text-muted-foreground" />
                  </a>
                  <a
                    href={footerInfo.templateCreator.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-muted transition-colors"
                    aria-label="DevCom"
                  >
                    <Globe className="h-3 w-3 text-muted-foreground/70 hover:text-muted-foreground" />
                  </a>
                </div>
              </>
            )}
          </div>

          {/* 맨 위로 버튼 */}
          {footerInfo.showScrollTop && (
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="맨 위로"
            >
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}
