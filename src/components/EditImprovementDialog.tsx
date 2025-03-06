import { Resources } from "../../models/Resources"

interface EditImprovementDialogProps {
  improvement: string
  level: number
  resources: Resources
  onUpgrade: () => void
  onDowngrade: () => void
  onRemove: () => void
  onClose: () => void
  improvementsData: Record<string, { cost: Resources; benefit: Resources }>
}

const EditImprovementDialog = ({
  improvement,
  level,
  resources,
  onUpgrade,
  onDowngrade,
  onRemove,
  onClose,
  improvementsData,
}: EditImprovementDialogProps) => {

  const nextLevel = level + 1
  const currentLevel = level

  const baseCost = improvementsData[improvement].cost
  const baseBenefit = improvementsData[improvement].benefit

  const scaledUpgradeCost = Object.fromEntries(
    Object.entries(baseCost).map(([resource, amount]) => [resource, amount * nextLevel])
  )

  const scaledUpgradeBenefit = Object.fromEntries(
    Object.entries(baseBenefit).map(([resource, amount]) => [resource, amount])
  )

  const canUpgrade = Object.entries(scaledUpgradeCost).every(
    ([resource, amount]) => resources[resource as keyof Resources] >= amount
  )

  return (
    <div className="upgrade-wrapper">
      <div className="upgrade-dialog">
        <h2>{improvement}</h2>
        <p>Current Level: {currentLevel}</p>
        <p>Upgrade to Level: {nextLevel}</p>

        <h3>Upgrade Cost:</h3>
        <ul>
          {Object.entries(scaledUpgradeCost).map(([resource, amount]) =>
            amount > 0 ? <li key={resource}>{resource}: {amount}</li> : null
          )}
        </ul>

        <h3>Upgrade Adds (per upgrade):</h3>
        <ul>
          {Object.entries(scaledUpgradeBenefit).map(([resource, amount]) =>
            amount > 0 ? <li key={resource}>{resource}: {amount}</li> : null
          )}
        </ul>

        <button onClick={onUpgrade} disabled={!canUpgrade}>
          Upgrade to Level {nextLevel}
        </button>

        <button onClick={onDowngrade}>
          Downgrade
        </button>

        <button onClick={onRemove}>
          Remove Improvement
        </button>

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default EditImprovementDialog
