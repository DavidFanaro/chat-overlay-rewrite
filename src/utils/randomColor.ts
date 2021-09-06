const colors = [
  "red",
  "blue",
  "green",
  "purple",
  "pink",
  "yellow",
]

export function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)]

}