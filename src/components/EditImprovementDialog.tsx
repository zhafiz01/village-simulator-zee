import { useState, useEffect } from "react"
import { Resources } from "../../models/Resources"

interface EditImprovementDialogProps {
  improvement: string
  level: number
  resources: Resources
  onUpgrade: (newLevel: number) => void
  onRemove: () => void
  onClose: () => void
}

const upgradeCosts: Record<string, (level: number) => Partial<Resources>> = {
  House: (level) => ({ lumber: level * 10 }),
  Field: (level) => ({ people: level * 5, water: level * 5 }),
  "Lumber Mill": (level) => ({ people: level * 5 }),
  Well: (level) => ({ lumber: level * 5, people: level * 5 }),
  Pasture: (level) => ({ grain: level * 5, people: level * 5, water: level * 5 }),
}

const upgradeAdds: Record<string, () => Partial<Resources>> = {
  House: () => ({ people: 2 }),
  Field: () => ({ grain: 5 }),
  "Lumber Mill": () => ({ lumber: 5 }),
  Well: () => ({ water: 5 }),
  Pasture: () => ({ sheep: 3 }),
}

const EditImprovementDialog = ({
  improvement,
  level = 1,
  resources,
  onUpgrade,
  onRemove,
  onClose,
}: EditImprovementDialogProps) => {
  const [newLevel, setNewLevel] = useState(level)
  const [upgradeCost, setUpgradeCost] = useState<Partial<Resources>>({})

  useEffect(() => {
    const cost = upgradeCosts[improvement]?.(newLevel + 1) || {}
    setUpgradeCost(cost)
  }, [improvement, newLevel])

  const canUpgrade = Object.entries(upgradeCost).every(([resource, cost]) => {
    const resourceAmount = resources[resource as keyof typeof resources] || 0
    return resourceAmount >= cost
  })

  return (
    <div className="upgrade-wrapper">
      <div className="upgrade-dialog">
        <h2>Upgrade {improvement}</h2>
        <p>Current Level: {level}</p>

        <h3>This Upgrade Costs:</h3>
        <ul>
          {Object.entries(upgradeCost).map(([resource, cost]) => (
            <li key={resource}>
              {resource}: {cost}
            </li>
          ))}
        </ul>

        <h3>This Upgrade Adds:</h3>
        <ul>
          {Object.entries(upgradeAdds[improvement]()).map(([resource, add]) => (
            <li key={resource}>
              {resource}: {add}
            </li>
          ))}
        </ul>

        <button onClick={() => onUpgrade(newLevel + 1)} disabled={!canUpgrade}>
          Upgrade to Level {newLevel + 1}
        </button>

        <button onClick={onRemove}>Remove Improvement</button>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default EditImprovementDialog

