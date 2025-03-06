import { useState } from "react"
import { Resources } from "../../models/Resources"

interface AddImprovementDialogProps {
  tileIndex: number | null
  onClose: () => void
  onSelectImprovement: (improvement: string) => void
  improvementsData: Record<string, { cost: Resources; benefit: Resources }>
}

const AddImprovementDialog = ({ tileIndex, onClose, onSelectImprovement, improvementsData }: AddImprovementDialogProps) => {
  if (tileIndex === null) return null

  const [hoveredImprovement, setHoveredImprovement] = useState<string | null>(null)

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>🌼 Add Improvement</h2>
        <p>Choose an improvement for your land!</p>

        {Object.keys(improvementsData).map((improvement) => (
          <button
            key={improvement}
            onMouseEnter={() => setHoveredImprovement(improvement)}
            onMouseLeave={() => setHoveredImprovement(null)}
            onClick={() => onSelectImprovement(improvement)}
          >
            {improvement}
          </button>
        ))}

        {hoveredImprovement && (
          <div className="cost-details">
            <p>Cost to build {hoveredImprovement}:</p>
            <ul>
              {Object.entries(improvementsData[hoveredImprovement].cost)
                .filter(([_, amount]) => amount > 0)
                .map(([resource, amount]) => (
                  <li key={resource}>{resource}: {amount}</li>
              ))}
            </ul>
            <p>Adds:</p>
            <ul>
              {Object.entries(improvementsData[hoveredImprovement].benefit)
                .filter(([_, amount]) => amount > 0)
                .map(([resource, amount]) => (
                  <li key={resource}>{resource}: {amount}</li>
              ))}
            </ul>
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
