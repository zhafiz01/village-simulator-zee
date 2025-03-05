
import { useState } from "react"

interface AddImprovementDialogProps {
  tileIndex: number | null
  onClose: () => void
  onSelectImprovement: (improvement: string) => void
}

const AddImprovementDialog = ({ tileIndex, onClose, onSelectImprovement }: AddImprovementDialogProps) => {
  if (tileIndex === null) return null

  const improvementCosts: Record<string, string[]> = {
    House: ["lumber: 5, grain: 5, water: 5, sheep: 1"],
    Field: ["people: 1, water: 2"],
    Pasture: ["people: 1, grain: 2, water: 2"],
    "Lumber Mill": ["people: 1"],
    Well: ["people: 1, lumber: 2"],
  }

  const improvementAdditions: Record<string, string> = {
    House: "5 people",
    Field: "10 grain",
    Pasture: "5 sheep",
    "Lumber Mill": "10 lumber",
    Well: "10 water",
  }

  const [hoveredImprovement, setHoveredImprovement] = useState<string | null>(null)

  const handleMouseEnter = (improvement: string) => {
    setHoveredImprovement(improvement)
  }

  const handleMouseLeave = () => {
    setHoveredImprovement(null)
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Add Improvement</h2>
        <p>Choose an improvement for your land!</p>

        <button
          onMouseEnter={() => handleMouseEnter("House")}
          onClick={() => onSelectImprovement("House")}
          onMouseLeave={handleMouseLeave}
        >
          🏠 House
        </button>

        <button
          onMouseEnter={() => handleMouseEnter("Field")}
          onClick={() => onSelectImprovement("Field")}
          onMouseLeave={handleMouseLeave}
        >
          🌾 Field
        </button>

        <button
          onMouseEnter={() => handleMouseEnter("Pasture")}
          onClick={() => onSelectImprovement("Pasture")}
          onMouseLeave={handleMouseLeave}
        >
          🐑 Pasture
        </button>

        <button
          onMouseEnter={() => handleMouseEnter("Lumber Mill")}
          onClick={() => onSelectImprovement("Lumber Mill")}
          onMouseLeave={handleMouseLeave}
        >
          🌲 Lumber Mill
        </button>

        <button
          onMouseEnter={() => handleMouseEnter("Well")}
          onClick={() => onSelectImprovement("Well")}
          onMouseLeave={handleMouseLeave}
        >
          💧 Well
        </button>

        {hoveredImprovement && (
          <div id="cost-details" className="cost-details">
            <p>Cost to build {hoveredImprovement}: </p>
            <ul>
              {improvementCosts[hoveredImprovement].map((cost, index) => (
                <li key={index}>{cost}</li>
              ))}
            </ul>
            <p>Adds: {improvementAdditions[hoveredImprovement]}</p>
          </div>
        )}

        <button className="close-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddImprovementDialog