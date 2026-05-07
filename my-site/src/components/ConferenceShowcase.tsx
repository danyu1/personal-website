'use client';

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Presentation } from "lucide-react";

type ConferenceImage = {
  src: string;
  alt: string;
};

type ConferenceExperience = {
  title: string;
  location: string;
  date: string;
  logo: string;
  description: string;
  highlights: string[];
  images: ConferenceImage[];
};

export default function ConferenceShowcase({
  experience,
}: {
  experience: ConferenceExperience;
}) {
  const [idx, setIdx] = useState(0);
  const n = experience.images.length;

  const prev = () => {
    setIdx((i) => (i - 1 + n) % n);
  };
  const next = () => {
    setIdx((i) => (i + 1) % n);
  };

  const wrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let startX = 0;
    let dragging = false;
    const down = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (dx > 50) prev();
      else if (dx < -50) next();
      dragging = false;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [n]);

  const currentImage = experience.images[idx];

  return (
    <div className="relative w-full">
      <style>{`
        @keyframes conferenceSlideIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes imageSlideIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Conference Header with Logo */}
      <div className="mb-8 animate-[conferenceSlideIn_500ms_ease-out]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
          <div className="relative w-20 h-20 bg-white/5 p-2 rounded-lg border border-white/10">
            <Image
              src={experience.logo}
              alt={`${experience.title} logo`}
              fill
              className="object-contain"
              sizes="80px"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-medium text-white mb-2 tracking-tight">
              {experience.title}
            </h3>
            <div className="flex flex-wrap gap-4 text-lg text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-zinc-500" aria-hidden />
                <span>{experience.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-zinc-500" aria-hidden />
                <span>{experience.date}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-zinc-300 leading-relaxed">
          {experience.description}
        </p>
      </div>

      {/* Image Carousel */}
      <div
        ref={wrapRef}
        className="relative w-full mb-6 animate-[conferenceSlideIn_600ms_ease-out]"
      >
        <div className="relative w-full aspect-video overflow-hidden border border-white/10 bg-white/[0.02] group">

          <div
            key={`img-${idx}`}
            className="w-full h-full animate-[imageSlideIn_400ms_ease-out]"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority={idx === 0}
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          </div>

          {/* Corner accents */}

          {/* Navigation arrows on image hover */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/70 border border-white/15 text-zinc-200 hover:border-white/40 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/70 border border-white/15 text-zinc-200 hover:border-white/40 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Image counter and caption */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-mono text-zinc-500">
            Image {idx + 1} / {n}
          </span>
          <span className="text-lg text-zinc-400">{currentImage.alt}</span>
        </div>

        {/* Thumbnail navigation */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {experience.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`View image ${i + 1}: ${img.alt}`}
              className={`relative flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-all duration-300 ${
                i === idx
                  ? "border-white opacity-100"
                  : "border-white/15 opacity-50 hover:opacity-75 hover:border-white/30"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="grid md:grid-cols-3 gap-4 animate-[conferenceSlideIn_700ms_ease-out]">
        {experience.highlights.map((highlight, i) => {
          const icons = [Presentation, Users, Users];
          const Icon = icons[i] || Presentation;
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors duration-300"
            >
              <Icon className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" aria-hidden />
              <p className="text-lg text-zinc-300 leading-relaxed">{highlight}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
