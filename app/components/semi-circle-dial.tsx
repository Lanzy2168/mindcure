"use client"

import React from "react"
import { useState, useRef } from "react"
import type { Emotion } from "../data/emotions"

interface SemiCircleDialProps {
  emotions: Emotion[]
  selectedEmotion: Emotion
  onEmotionChange: (emotion: Emotion) => void
}

export function SemiCircleDial({ emotions, selectedEmotion, onEmotionChange }: SemiCircleDialProps) {
  const [rotation, setRotation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const dialRef = useRef<HTMLDivElement>(null)

  // Calculate the angle for each emotion
  const totalEmotions = emotions.length
  const anglePerEmotion = 180 / (totalEmotions - 1)

  // Handle emotion selection
  const handleEmotionClick = (emotion: Emotion, index: number) => {
    if (isAnimating || emotion.id === selectedEmotion.id) return

    setIsAnimating(true)

    // Calculate the target rotation to bring the clicked emotion to the bottom center
    const currentIndex = emotions.findIndex((e) => e.id === selectedEmotion.id)
    const targetIndex = index

    // Calculate how much we need to rotate
    const targetRotation = (targetIndex - currentIndex) * anglePerEmotion

    // Apply rotation
    setRotation((prev) => prev + targetRotation)

    // Update selected emotion
    onEmotionChange(emotion)

    // Reset animation flag after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div className="relative w-full h-[220px] overflow-visible">
      {/* Semi-circle background */}
      <div
        className="absolute w-[320px] h-[320px] rounded-full bg-white/20 backdrop-blur-sm"
        style={{
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Rotating dial */}
      <div
        ref={dialRef}
        className="absolute w-[300px] h-[300px]"
        style={{
          top: "-110px",
          left: "50%",
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          transition: isAnimating ? "transform 0.5s ease-out" : "none",
        }}
      >
        {emotions.map((emotion, index) => {
          // Calculate position on the semi-circle
          const angle = index * anglePerEmotion
          const radians = (angle * Math.PI) / 180
          const radius = 150
          const x = Math.sin(radians) * radius
          const y = -Math.cos(radians) * radius

          return (
            <button
              key={emotion.id}
              className="absolute w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer z-10"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                background: emotion.color,
                boxShadow: selectedEmotion.id === emotion.id ? "0 0 20px rgba(0,0,0,0.3)" : "0 4px 8px rgba(0,0,0,0.1)",
                transform: `scale(${selectedEmotion.id === emotion.id ? 1.2 : 1})`,
              }}
              onClick={() => handleEmotionClick(emotion, index)}
              disabled={isAnimating}
            >
              {/* Text that doesn't rotate with the circle */}
              <span
                className="text-xl font-bold text-green-800 select-none"
                style={{
                  transform: `rotate(${-rotation}deg)`,
                  transition: isAnimating ? "transform 0.5s ease-out" : "none",
                }}
              >
                {emotion.character}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
