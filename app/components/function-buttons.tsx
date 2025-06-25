"use client"

import type { Element } from "../data/five-elements"

interface FunctionButtonsProps {
  selectedElement: Element
}

export function FunctionButtons({ selectedElement }: FunctionButtonsProps) {
  const buttons = [
    { id: "mindJourney", name: "心境游", size: "large" },
    { id: "heartRhythm", name: "心韵", size: "medium" },
    { id: "fortuneBell", name: "积福钟", size: "large" },
    { id: "breathingAdjust", name: "呼吸调", size: "medium" },
    { id: "tasteTherapy", name: "味觉疗", size: "full" },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      {buttons.map((button, index) => (
        <button
          key={button.id}
          className={`
            rounded-2xl text-green-900 font-bold text-lg
            transition-all duration-200 hover:scale-[1.03] active:scale-95
            shadow-lg hover:shadow-xl flex items-center justify-center
            ${button.size === "large" ? "row-span-2" : ""}
            ${button.size === "medium" ? "row-span-2" : ""}
            ${button.size === "full" ? "col-span-2 row-span-1" : ""}
            ${index === 0 ? "col-start-1 row-start-1" : ""}
            ${index === 1 ? "col-start-2 row-start-1" : ""}
            ${index === 2 ? "col-start-1 row-start-3" : ""}
            ${index === 3 ? "col-start-2 row-start-3" : ""}
            ${index === 4 ? "col-span-2 row-start-5" : ""}
          `}
          style={{
            background: `linear-gradient(135deg, ${selectedElement.buttonColor}, ${selectedElement.buttonColorSecondary})`,
            minHeight:
              button.size === "medium"
                ? "100px"
                : button.size === "large"
                  ? "100px"
                  : button.size === "full"
                    ? "70px"
                    : "70px",
            fontSize: button.size === "full" ? "1.4rem" : "1.2rem",
          }}
        >
          {button.name}
        </button>
      ))}
    </div>
  )
}
