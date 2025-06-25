"use client"

import { useState, useCallback } from "react"
import { SemiCircleDial } from "./components/semi-circle-dial"
import { FunctionButtons } from "./components/function-buttons"
import { BottomNavigation } from "./components/bottom-navigation"
import { emotions, type Emotion } from "./data/emotions"
import { fiveElements, type Element } from "./data/five-elements"

export default function RelaxingApp() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>(emotions[0])
  const [selectedElement, setSelectedElement] = useState<Element>(fiveElements[0])

  const handleEmotionChange = useCallback((emotion: Emotion) => {
    setSelectedEmotion(emotion)
    // Find the corresponding element for this emotion
    const element = fiveElements.find((el) => el.id === emotion.elementId) || fiveElements[0]
    setSelectedElement(element)
  }, [])

  // Create style object for background
  const backgroundStyle = selectedElement.backgroundImage
    ? {
        backgroundImage: `url('${selectedElement.backgroundImage}'), ${selectedElement.background}`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }
    : {
        backgroundImage: selectedElement.background,
      }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div
        className="w-full max-w-sm mx-auto relative rounded-[2.5rem] shadow-2xl transition-all duration-500"
        style={{
          aspectRatio: "9/16",
          overflow: "visible",
          ...backgroundStyle,
        }}
      >
        {/* Top Section with Semi-Circle Dial */}
        <div className="relative">
          <SemiCircleDial emotions={emotions} selectedEmotion={selectedEmotion} onEmotionChange={handleEmotionChange} />

          {/* Element Character and Description - Positioned above the dial circles */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center z-0">
            <div className="text-5xl font-bold text-green-800 opacity-80 mb-2">{selectedElement.character}</div>
            <p className="text-green-800 font-medium text-lg drop-shadow-sm px-2 whitespace-nowrap">
              {selectedElement.description}
            </p>
          </div>
        </div>

        {/* Function Buttons */}
        <div className="flex-1 px-4 py-6 mt-16 mb-20">
          <FunctionButtons selectedElement={selectedElement} />
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  )
}
