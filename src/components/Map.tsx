import { useEffect, useState } from "react"
import Tile from "./Tile"
import AddImprovementDialog from "./AddImprovementDialog"
import EditImprovementDialog from "./EditImprovementDialog"

interface MapProps {
  gridSize: number
  resources: {
    lumber: number
    grain: number
    water: number
    sheep: number
    people: number
  }
  setResources: React.Dispatch<
    React.SetStateAction<{
      lumber: number
      grain: number
      water: number
      sheep: number
      people: number
    }>
  >
}

const improvementCosts = {
  House: { lumber: 5, grain: 5, water: 5, sheep: 1 },
  Field: { people: 1, water: 2 },
  Pasture: { people: 1, grain: 2, water: 2 },
  "Lumber Mill": { people: 1 },
  Well: { people: 1, lumber: 2 },
}

const upgradeCosts: Record<string, (level: number) => Partial<Resources>> = {
  House: (level) => ({ lumber: level * 10 }),
  Field: (level) => ({ grain: level * 8, water: level * 5 }),
  LumberMill: (level) => ({ lumber: level * 5 }),
  Well: (level) => ({ water: level * 10 }),
  Pasture: (level) => ({ sheep: level * 3, grain: level * 5 }),
}

const Map = ({ gridSize, resources, setResources }: MapProps) => {
  const [tiles, setTiles] = useState<(string | null)[]>(Array(gridSize * gridSize).fill(null))
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [improvementLevels, setImprovementLevels] = useState<Record<number, number>>({})
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  

  const handleTileClick = (index: number) => {
    setSelectedTile(index)
  }

  const handleCloseDialog = () => {
    setSelectedTile(null)
  };

  const handleSelectImprovement = (improvement: string) => {
    if (selectedTile === null) return

    const cost = improvementCosts[improvement as keyof typeof improvementCosts];
    if (!Object.entries(cost).every(([key, value]) => resources[key as keyof typeof resources] >= value!)) {
      setPopupMessage("Not enough resources to build this improvement!")
      setShowPopup(true); // Show the popup
      return
    }

    setResources((prev) => {
      const updated = { ...prev }
      Object.entries(cost).forEach(([key, value]) => {
        updated[key as keyof typeof prev] -= value!
      })

      switch (improvement) {
        case "House":
          updated.people += 5;
          break
        case "Field":
          updated.grain += 10;
          break
        case "Pasture":
          updated.sheep += 5;
          break
        case "Lumber Mill":
          updated.lumber += 10;
          break
        case "Well":
          updated.water += 10;
          break
      }

      return updated
    })

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles]
      newTiles[selectedTile] = improvement
      return newTiles
    })

    setImprovementLevels((prevLevels) => ({
      ...prevLevels,
      [selectedTile]: 1,
    }))

    setSelectedTile(null)
  }

  const handleUpgradeImprovement = (newLevel: number) => {
    if (selectedTile === null) return
    const currentImprovement = tiles[selectedTile]
    if (!currentImprovement) return

    const cost = upgradeCosts[currentImprovement as keyof typeof upgradeCosts](newLevel);
    if (!Object.entries(cost).every(([key, value]) => resources[key as keyof typeof resources] >= value!)) {
      setPopupMessage("Not enough resources to upgrade this improvement!")
      setShowPopup(true); // Show the popup
      return
    }

    setResources((prev) => {
      const updated = { ...prev }
      Object.entries(cost).forEach(([key, value]) => {
        updated[key as keyof typeof prev] -= value!
      })

      switch (currentImprovement) {
        case "House":
          updated.people += 2;
          break
        case "Field":
          updated.grain += 5;
          break
        case "Pasture":
          updated.sheep += 3;
          break
        case "Lumber Mill":
          updated.lumber += 5;
          break
        case "Well":
          updated.water += 5;
          break
      }

      return updated;
    })

    setImprovementLevels((prevLevels) => ({
      ...prevLevels,
      [selectedTile]: newLevel,
    }))

    setSelectedTile(null);
  };


  
  return (
    <div className="map">
      {tiles.map((improvement, index) => (
        <Tile key={index} index={index} improvement={improvement} level={improvementLevels[index] || 1} onClick={handleTileClick} />
      ))}

{showPopup && (
  <>
    <div className="overlay" onClick={() => setShowPopup(false)} />
    <div className="popup-container">
      <h3>Not enough resources for this improvement!</h3>
      <button onClick={() => setShowPopup(false)}>Close</button>
    </div>
  </>
)}

      {selectedTile !== null && tiles[selectedTile] === null ? (
        <AddImprovementDialog
          tileIndex={selectedTile}
          onClose={handleCloseDialog}
          onSelectImprovement={handleSelectImprovement}
        />
      ) : (
        selectedTile !== null &&
        tiles[selectedTile] !== null && (
          <EditImprovementDialog
            improvement={tiles[selectedTile] as string}
            level={improvementLevels[selectedTile] || 1}
            resources={resources}
            onUpgrade={handleUpgradeImprovement}
            onClose={handleCloseDialog}
          />
        )
      )}
    </div>
  )
}

export default Map