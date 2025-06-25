"use client"

import Image from "next/image"

export function BottomNavigation() {
  const navItems = [
    { id: "discover", name: "发现", icon: "/discover-icon.png" },
    { id: "treeHole", name: "树洞", icon: "/chat-icon.png" },
    { id: "my", name: "我的", icon: "/profile-icon.png" },
  ]

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className="flex flex-col items-center gap-1 text-green-800 hover:text-green-600 transition-colors group"
          >
            <div className="w-10 h-10 relative">
              <Image
                src={item.icon || "/placeholder.svg"}
                alt={item.name}
                width={40}
                height={40}
                className="object-contain transition-all duration-200 group-hover:scale-110"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(15%) sepia(25%) saturate(1500%) hue-rotate(120deg) brightness(95%) contrast(90%)",
                }}
              />
            </div>
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
