import { useState } from "react"
import Tile from "./Tile"
import "../Map.sass"

interface MapProps {
  gridSize: number
}

type ImprovementType = "house" | "field" | "pasture" | "lumber-mill" | "well" | null

const Map = ({ gridSize }: MapProps) => {
  const [tiles, setTiles] = useState<(ImprovementType)[]>(
    Array(gridSize * gridSize).fill(null) //we should start w empty tiles here
  )

  const handleTileClick = (index: number) => {
    console.log(`Tile ${index} clicked`)

    const improvementOrder: ImprovementType[] = ["house", "field", "pasture", "lumber-mill", "well", null]
    const currentImprovement = tiles[index]
    const nextImprovement = improvementOrder[
      (improvementOrder.indexOf(currentImprovement) + 1) % improvementOrder.length
    ]
    
    setTiles((prevTiles) => {
      const newTiles = [...prevTiles]
      newTiles[index] = nextImprovement
      return newTiles
    })
  }

  return (
    <div className="map"
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${gridSize}, 1fr)`, //might be redundant and not needed
      gridTemplateRows: `repeat(${gridSize}, 1fr)`, 
      width: "500px",
      height: "500px",
      gap: "4px",
      border: "2px solid #5a7d7c"
    }}>
      {tiles.map((improvement, index) => (
        <Tile key={index}
        index={index}
        improvement={improvement}
        onClick={handleTileClick} />
      ))}
    </div>
  )
}

export default Map


