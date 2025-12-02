"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  logo?: string
  logoImage?: string
  isEditMode?: boolean
  onEditMenu?: () => void
}

export function NavBar({
  items,
  className,
  logo,
  logoImage,
  isEditMode,
  onEditMenu,
}: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name || "")

  // 스크롤 위치에 따라 active 탭 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => item.url.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        }
        return false
      })

      if (currentSection) {
        const activeItem = items.find((item) => item.url === `#${currentSection}`)
        if (activeItem) setActiveTab(activeItem.name)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  // 스크롤 이동 (Home 포함 전체)
  const scrollToSection = (url: string) => {
    // ⭐ Home 전용 스크롤 처리
    if (url === "#hero" || url === "#home" || url === "#top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return
    }

    const element = document.querySelector(url)
    if (!element) return

    const offsetTop = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: offsetTop - 90,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={cn(
        "fixed top-4 z-50 w-full px-4 md:top-6",
        className,
      )}
    >
      <div className="mx-auto max-w-4xl">
        {/* 네비게이션 바 캡슐 */}
        <div
          className={cn(
            "flex items-center gap-2 md:gap-4",
            "rounded-full border border-white/15 bg-slate-900/80",
            "backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.6)]",
            "px-3 py-2 md:px-5 md:py-2.5",
          )}
        >
          {/* 로고 */}
          {(logo || logoImage) && (
            <div className="flex items-center gap-2 pr-3 md:pr-4 border-r border-white/10">
              {logoImage ? (
                <img
                  src={logoImage}
                  alt="Logo"
                  className="h-7 w-auto md:h-8"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              ) : (
                <span className="text-xs md:text-sm font-semibold tracking-tight text-slate-50">
                  {logo}
                </span>
              )}
            </div>
          )}

          {/* 메뉴들 */}
          <div className="relative flex-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-center gap-1 md:gap-2">
              {items.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.name

                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name)
                      scrollToSection(item.url)
                    }}
                    className={cn(
                      "relative group flex items-center gap-1.5 md:gap-2",
                      "px-3 md:px-4 py-1.5 rounded-full",
                      "text-[11px] md:text-sm font-medium",
                      "text-slate-200/80 hover:text-slate-50",
                      "transition-colors",
                    )}
                  >
                    {/* 활성 상태 pill */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-slate-100/10 border border-white/10"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* 모바일 아이콘 */}
                    <span className="relative flex items-center justify-center md:hidden">
                      <Icon size={16} strokeWidth={2.3} />
                    </span>

                    {/* 데스크톱 텍스트 */}
                    <span className="relative hidden md:inline-block">
                      {item.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 편집 버튼 */}
          {isEditMode && onEditMenu && (
            <button
              onClick={onEditMenu}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-slate-800/60 text-slate-200 hover:bg-slate-700/80 transition-colors"
              title="메뉴 편집"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
