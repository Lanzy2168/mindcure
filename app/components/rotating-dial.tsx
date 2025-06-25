"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Element } from "../data/five-elements"

interface RotatingDialProps {
  elements: Element[]
  selectedElement: Element
  onElementChange: (element: Element) => void
}

export function RotatingDial({ elements, selectedElement, onElementChange }: RotatingDialProps) {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startAngle, setStartAngle] = useState(0)

  // 修改1: 计算角度使按钮分布在下半圆
  const anglePerElement = 180 / (elements.length - 1)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
    setStartAngle(angle * (180 / Math.PI) - rotation)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const dialElement = document.querySelector(".rotating-dial")
    if (!dialElement) return

    const rect = dialElement.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
    const newRotation = (angle * (180 / Math.PI) - startAngle) % 360
    setRotation(newRotation)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    // 修改2: 吸附到最近元素时考虑半圆分布
    const normalizedRotation = ((rotation % 360) + 360) % 360
    const nearestElementIndex = Math.round(normalizedRotation / anglePerElement) % elements.length
    const snapRotation = nearestElementIndex * anglePerElement

    setRotation(snapRotation)
    onElementChange(elements[nearestElementIndex])
  }

  // 新增3: 按钮点击处理函数
  const handleButtonClick = (element: Element, index: number) => {
    // 计算目标旋转角度（将当前元素移到底部中心）
    const targetAngle = 90 - index * anglePerElement
    setRotation(targetAngle)
    onElementChange(element)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, startAngle, rotation])

  return (
    <div className="relative flex justify-center">
      <div
        className="rotating-dial relative w-64 h-64 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {elements.map((element, index) => {
          // 修改4: 确保按钮分布在下半圆
          const angle = (index * anglePerElement - 90) * (Math.PI / 180)
          const radius = 100 // 增大半径使分布更均匀
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <div
              key={element.id}
              className="absolute w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(${x - 32}px, ${y - 32}px)`,
                background: element.color,
                boxShadow:
                  selectedElement.id === element.id ? "0 0 20px rgba(255,255,255,0.5)" : "0 4px 8px rgba(0,0,0,0.2)",
                scale: selectedElement.id === element.id ? "1.2" : "1",
                zIndex: selectedElement.id === element.id ? 10 : 1,
              }}
              // 新增5: 添加点击事件
              onClick={() => handleButtonClick(element, index)}
            >
              {/* 修改6: 文字反向旋转保持方向 */}
              <span
                className="text-2xl font-bold text-green-800 select-none"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                {element.character}
              </span>
            </div>
          )
        })}

        {/* 中心元素 - 显示当前选中项 */}
        <div
          className="absolute w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: selectedElement.color,
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
            zIndex: 20,
          }}
        >
          <span className="text-3xl font-bold text-green-800 select-none">{selectedElement.character}</span>
        </div>

        {/* 新增7: 底部中心指示器 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full z-30" />
      </div>
    </div>
  )
}
