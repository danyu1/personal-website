"use client";

import React, { useState } from "react";

const FALLBACK_IMG = "/fallback.png";

export default function Hero() {
  return (
    <section className="relative max-w-[1700px] mx-auto px-16 lg:px-28 pt-6 pb-8 lg:pt-8 lg:pb-10">
      <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-center">
        {/* Profile Image — static, no tilt */}
        <div className="flex justify-center lg:justify-start">
          <Portrait img="/images/image.png" alt="Daniel A. Hernandez" />
        </div>

        {/* Text */}
        <div className="text-center lg:text-left space-y-4">
          <div>
            <h1 className="text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.05]">
              Danny Hernandez
            </h1>
            <div className="h-px bg-white/15 max-w-xs mx-auto lg:mx-0 mt-3" />
          </div>

          <p className="text-zinc-300 text-xl leading-relaxed max-w-3xl mx-auto lg:mx-0">
            Deep-learning researcher for stochastic climate systems and
            computer-vision researcher at UChicago. Incoming Equity Derivatives
            Trading & Structuring Summer Analyst at Morgan Stanley. Incoming
            Software Engineer Intern on Recognition Algorithms & SDK at PopID.
            Varsity collegiate athlete competing in horizontal jumps.
          </p>

          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {[
              "Deep Learning Research",
              "Computer Vision",
              "Equity Derivatives",
              "Software Engineering",
              "Collegiate Athlete",
            ].map((label) => (
              <span
                key={label}
                className="px-2.5 py-1 bg-white/[0.03] border border-white/10 text-base font-mono text-zinc-400"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Static portrait (no tilt) --- */
function Portrait({ img, alt }: { img: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(img || FALLBACK_IMG);

  return (
    <div className="relative w-56 h-56 lg:w-72 lg:h-72 overflow-hidden border border-white/10">
      <img
        src={imgSrc}
        onError={() => setImgSrc(FALLBACK_IMG)}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: "center 20%",
          filter: "saturate(0.9)",
        }}
      />
    </div>
  );
}
