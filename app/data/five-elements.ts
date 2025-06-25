export interface Element {
  id: string
  character: string
  name: string
  description: string
  color: string
  background: string
  backgroundImage?: string
  buttonColor: string
  buttonColorSecondary: string
}

export const fiveElements: Element[] = [
  {
    id: "wood",
    character: "木",
    name: "木",
    description: "平息怒火，舒展肝气",
    color: "linear-gradient(135deg, #e8f5e8, #c8e6c9)",
    background:
      "linear-gradient(180deg, rgba(232, 245, 232, 0.8) 0%, rgba(200, 230, 201, 0.8) 50%, rgba(165, 214, 167, 0.8) 100%)",
    backgroundImage: "/wood-gradient.jpeg",
    buttonColor: "rgba(255, 255, 255, 0.7)",
    buttonColorSecondary: "rgba(255, 255, 255, 0.5)",
  },
  {
    id: "fire",
    character: "火",
    name: "火",
    description: "静心安神，调和心火",
    color: "linear-gradient(135deg, #fff3e0, #ffcc80)",
    background:
      "linear-gradient(180deg, rgba(255, 243, 224, 0.8) 0%, rgba(255, 204, 128, 0.8) 50%, rgba(255, 183, 77, 0.8) 100%)",
    backgroundImage: "/fire-gradient.jpeg",
    buttonColor: "rgba(255, 255, 255, 0.7)",
    buttonColorSecondary: "rgba(255, 255, 255, 0.5)",
  },
  {
    id: "earth",
    character: "土",
    name: "土",
    description: "健脾和胃，安定思虑",
    color: "linear-gradient(135deg, #f3e5ab, #dcc48e)",
    background:
      "linear-gradient(180deg, rgba(249, 247, 237, 0.8) 0%, rgba(220, 196, 142, 0.8) 50%, rgba(212, 175, 55, 0.8) 100%)",
    backgroundImage: "/earth-gradient.jpeg",
    buttonColor: "rgba(255, 255, 255, 0.8)",
    buttonColorSecondary: "rgba(255, 255, 255, 0.6)",
  },
  {
    id: "metal",
    character: "金",
    name: "金",
    description: "清肺润燥，释放悲伤",
    color: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
    background:
      "linear-gradient(180deg, rgba(245, 245, 245, 0.8) 0%, rgba(224, 224, 224, 0.8) 50%, rgba(189, 189, 189, 0.8) 100%)",
    backgroundImage: "/metal-gradient.jpeg",
    buttonColor: "rgba(255, 255, 255, 0.7)",
    buttonColorSecondary: "rgba(255, 255, 255, 0.5)",
  },
  {
    id: "water",
    character: "水",
    name: "水",
    description: "滋阴补肾，消解恐惧",
    color: "linear-gradient(135deg, #e3f2fd, #90caf9)",
    background:
      "linear-gradient(180deg, rgba(227, 242, 253, 0.8) 0%, rgba(144, 202, 249, 0.8) 50%, rgba(100, 181, 246, 0.8) 100%)",
    backgroundImage: "/water-gradient.jpeg",
    buttonColor: "rgba(255, 255, 255, 0.7)",
    buttonColorSecondary: "rgba(255, 255, 255, 0.5)",
  },
]
