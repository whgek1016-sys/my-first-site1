"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { cleanupInvalidImages } from "@/lib/cleanup-storage"
import { GlobalSaveButton } from "@/components/global-save-button"

interface EditorContextType {
  isEditMode: boolean
  setIsEditMode: (value: boolean) => void
  isDevelopment: boolean
  saveData: (key: string, value: unknown) => void
  getData: (key: string) => unknown
  hoveredElement: string | null
  setHoveredElement: (element: string | null) => void
  saveToFile: (component: string, section: string, data: unknown) => Promise<boolean>
  saveFieldToFile: (component: string, field: string, value: unknown) => Promise<boolean>
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export function InlineEditorProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const isDevelopment = process.env.NODE_ENV === "development"

  // localStorage에서 데이터 불러오기
  const getData = (key: string) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`portfolio-${key}`)
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          return saved
        }
      }
    }
    return null
  }

  // localStorage에 데이터 저장
  const saveData = (key: string, value: unknown) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `portfolio-${key}`,
        typeof value === "string" ? value : JSON.stringify(value),
      )
    }
  }

  /**
   * ✅ API 없이 동작하는 버전
   * - 더 이상 /api/update-component 를 호출하지 않음
   * - 그냥 localStorage 에만 저장하고 true 반환
   * - Vercel 함수 용량, 404, JSON 에러 전부 사라짐
   */
  const saveToFile = async (
    component: string,
    section: string,
    data: unknown,
  ): Promise<boolean> => {
    try {
      // localStorage에만 저장
      saveData(`${component}-${section}`, data)
      console.log(
        `💾 [saveToFile] (로컬 전용) ${component}-${section} 저장 완료 (API 호출 없음)`,
      )
      return true
    } catch (error) {
      console.error("로컬 파일 저장 중 오류:", error)
      return false
    }
  }

  /**
   * ✅ 개별 필드 저장도 API 없이 로컬에서만 처리
   */
  const saveFieldToFile = async (
    component: string,
    field: string,
    value: unknown,
  ): Promise<boolean> => {
    try {
      saveData(`${component}-${field}`, value)
      console.log(
        `💾 [saveFieldToFile] (로컬 전용) ${component}-${field} 저장 완료 (API 호출 없음)`,
      )
      return true
    } catch (error) {
      console.error("로컬 필드 저장 중 오류:", error)
      return false
    }
  }

  // 컴포넌트 마운트 시 이미지 정리
  useEffect(() => {
    cleanupInvalidImages()
  }, [])

  // 개발 모드에서 Ctrl+E로 편집 모드 토글
  useEffect(() => {
    if (!isDevelopment) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "e" || e.key === "E")) {
        e.preventDefault()
        setIsEditMode((prev) => {
          const newState = !prev
          console.log("편집 모드:", newState ? "ON" : "OFF")
          return newState
        })
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isDevelopment])

  return (
    <EditorContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        isDevelopment,
        saveData,
        getData,
        hoveredElement,
        setHoveredElement,
        saveToFile,
        saveFieldToFile,
      }}
    >
      {children}
      {isDevelopment && (
        <>
          <button
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
            className="fixed bottom-4 right-4 z-[9999] p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            aria-label={isEditMode ? "편집 모드 끄기" : "편집 모드 켜기"}
          >
            <span className="text-lg">{isEditMode ? "✕" : "✏️"}</span>
          </button>
          <GlobalSaveButton />
        </>
      )}
    </EditorContext.Provider>
  )
}

export const useInlineEditor = () => {
  const context = useContext(EditorContext)
  if (context === undefined) {
    throw new Error("useInlineEditor must be used within an InlineEditorProvider")
  }
  return context
}
