export interface Emotion {
  id: string
  character: string
  name: string
  description: string
  color: string
  elementId: string
}

export const emotions: Emotion[] = [
  {
    id: "anger",
    character: "怒",
    name: "怒",
    description: "平息怒火",
    color: "rgba(255, 255, 220, 0.9)",
    elementId: "wood",
  },
  {
    id: "joy",
    character: "喜",
    name: "喜",
    description: "调和心火",
    color: "rgba(255, 255, 220, 0.9)",
    elementId: "fire",
  },
  {
    id: "worry",
    character: "思",
    name: "思",
    description: "安定思虑",
    color: "rgba(255, 255, 220, 0.9)",
    elementId: "earth",
  },
  {
    id: "grief",
    character: "悲",
    name: "悲",
    description: "释放悲伤",
    color: "rgba(255, 255, 220, 0.9)",
    elementId: "metal",
  },
  {
    id: "fear",
    character: "恐",
    name: "恐",
    description: "消解恐惧",
    color: "rgba(255, 255, 220, 0.9)",
    elementId: "water",
  },
]
