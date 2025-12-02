"use client";

import { motion } from "framer-motion";

export function Motto() {
  return (
    <div
      className="w-full py-20"
      style={{ backgroundColor: "#020617" }} // 확정 남색 배경
    >
      <div className="max-w-5xl mx-auto px-6 text-white">
        {/* 제목 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-base md:text-lg tracking-widest text-slate-300 mb-12 text-center"
        >
          MOTTO
        </motion.h2>

        {/* 레이아웃 */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start justify-between">
          {/* 왼쪽 영어 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2"
          >
            <p className="text-3xl md:text-4xl font-semibold leading-relaxed">
              “The plans of the diligent
              <br />
              lead to profit,
              <br />
              as surely as haste
              <br />
              leads to poverty.”
            </p>
            <p className="text-slate-300 mt-4 text-sm md:text-base">
              — Proverbs 21:5 (NIV)
            </p>
          </motion.div>

          {/* 오른쪽 한국어 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 text-left md:text-right"
          >
            <p className="text-xl md:text-2xl leading-relaxed md:max-w-md md:ml-auto">
              저는 이 말씀을 삶과 공부에 적용하려고 합니다. 서두르기보다,{" "}
              <span className="whitespace-nowrap">
                꾸준함과 성실함으로 계획을 이루어내는 태도가
              </span>{" "}
              복잡한 부동산 금융·신탁 구조를 이해하는 데에서도 가장 중요하다고
              믿습니다.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
