"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInlineEditor } from "@/contexts/inline-editor-context";

export function Profile() {
  const { isEditMode, getData, saveData } = useInlineEditor();
  const [bgImage, setBgImage] = useState("/uploads/about-bg.jpg");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = getData("profile-bg") as string | null;
    if (saved) setBgImage(saved);
  }, []);

  const handleBgFileChange = async (file: File) => {
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("배경 이미지는 5MB 이하만 업로드할 수 있어요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("purpose", "profile-bg");

    try {
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        if (bgImage && bgImage.includes("/uploads/") && bgImage !== result.path) {
          try {
            await fetch("/api/delete-image", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ imagePath: bgImage }),
            });
          } catch (_) {}
        }

        setBgImage(result.path);
        saveData("profile-bg", result.path);
      } else {
        alert(result.error);
      }
    } catch (_) {
      alert("업로드 중 오류 발생");
    }
  };

  return (
    <section className="relative w-full text-white py-16 md:py-20 overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0">
        <img src={bgImage} alt="배경" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
      </div>

      {/* 배경 변경 버튼 */}
      {isEditMode && (
        <>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute top-4 right-4 z-20 px-3 py-1.5 text-xs md:text-sm rounded-full bg-slate-900/80 border border-slate-500"
          >
            배경 이미지 변경
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              file && handleBgFileChange(file);
              e.target.value = "";
            }}
          />
        </>
      )}

      <div className="relative max-w-5xl mx-auto px-6 z-10">
        {/* 메인 프로필 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="
            mx-auto max-w-4xl 
            rounded-3xl shadow-2xl px-8 py-8 md:px-10 md:py-10
            bg-gradient-to-br from-white/95 to-slate-50/90
            border border-slate-200/60
            backdrop-blur-xl
            text-slate-900
          "
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-stretch">
            {/* 왼쪽 사진 */}
            <div className="w-full md:w-2/5 flex justify-center md:justify-start">
              <div className="relative rounded-3xl overflow-hidden shadow-xl w-56 h-72 md:w-64 md:h-80">
                <img
                  src="/profile.jpg"
                  alt="프로필 사진"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 오른쪽 텍스트 정보 */}
            <div className="w-full md:w-3/5 flex flex-col justify-center space-y-5 text-left">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  임지원{" "}
                  <span className="text-slate-500 text-base md:text-lg">
                    Jiwon Lim
                  </span>
                </h1>
                <p className="mt-2 text-sm md:text-base text-slate-600">
                  부동산 구조를 배우고 정리하는 중입니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">전공</span> · 단국대 부동산학과
                  </p>
                  <p>
                    <span className="font-semibold">관심 분야</span> · PF, 신탁, REITs
                  </p>
                </div>

                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">이메일</span> · whgek1016@dankook.ac.kr
                  </p>
                  <p>
                    <span className="font-semibold">GitHub</span> · github.com/whgek1016-sys
                  </p>
                </div>
              </div>

              <div className="pt-1 text-sm text-slate-500 flex flex-col sm:flex-row sm:items-center gap-2">
                <p>일상의 기록은 블로그에 남기고 있습니다.</p>
                <a
                  href="https://blog.naver.com/whgek1120/223495190435"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-slate-700"
                >
                  📝 블로그 →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 아래 소개 & 태그 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-10 bg-slate-900/85 text-white py-8 px-6 rounded-3xl border border-slate-700/70 shadow-lg"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-center md:text-left">
              안녕하세요?
            </h2>

            <p className="text-sm md:text-base text-slate-200 text-center md:text-left leading-relaxed">
              “PF·신탁·REITs를 실제 사례로 분석하며, 개발·금융·법률이 만나는 구조의 흐름을 해석합니다.
              <br className="hidden md:block" />
              데이터·문헌·현장 정보를 결합해 복잡한 구조를 명확한 인사이트로 재구성합니다.”
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {["#구조덕후", "#법·금융교차점", "#세심한분석", "#실증기반", "#INTJ"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-slate-800/90 border border-slate-600 text-xs md:text-sm text-slate-100"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
