interface ResourceLineProps {
  name: string
  amount: number
}

const resourceIcons: { [key: string]: string } = {
  lumber: "🌲",
  grain: "🌾",
  water: "💧",
  sheep: "🐑",
  people: "👥",
}

const ResourceLine = ({ name, amount }: ResourceLineProps) => {
  return (
    <div className="resource-line">
    <span>{resourceIcons[name]} {name}:</span>
    <span>{amount}</span>
  </div>
  )
}

export default ResourceLine
