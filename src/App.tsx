import { useState } from "react"
import Map from "./components/Map"
import ResourcesView from "./components/ResourceView"
import { Resources } from '../models/Resources'
import "./App.sass"
import borderImage from "./assets/UpperLeft.png" 
import border2 from "./assets/UpperRight.png"
import background from './assets/Background.png'

const initialResources: Resources = {
  lumber: 5,
  grain: 5,
  water: 5,
  sheep: 1,
  people: 0,
}

const improvementsData: Record<string, { cost: Resources; benefit: Resources }> = {
  House: { cost: { lumber: 5, grain: 5, water: 5, sheep: 1, people: 0 }, benefit: { people: 5, lumber: 0, grain: 0, water: 0, sheep: 0 } },
  Field: { cost: { people: 1, water: 2, lumber: 0, grain: 0, sheep: 0 }, benefit: { grain: 10, lumber: 0, water: 0, sheep: 0, people: 0 } },
  Pasture: { cost: { people: 1, grain: 2, water: 2, lumber: 0, sheep: 0 }, benefit: { sheep: 5, lumber: 0, grain: 0, water: 0, people: 0 } },
  "Lumber Mill": { cost: { people: 1, lumber: 0, grain: 0, water: 0, sheep: 0 }, benefit: { lumber: 10, grain: 0, water: 0, sheep: 0, people: 0 } },
  Well: { cost: { people: 1, lumber: 2, grain: 0, water: 0, sheep: 0 }, benefit: { water: 10, lumber: 0, grain: 0, sheep: 0, people: 0 } },
}

const App = () => {
  const [resources, setResources] = useState<Resources>({ ...initialResources })
  const [mapResetKey, setMapResetKey] = useState(0)

  const resetGame = () => {
    setResources({ ...initialResources })
    setMapResetKey(prev => prev + 1)
  }

  return (
    <div>
      <h1 className="header">Village Simulator</h1>
      <p className="intro">
      🌿 Click on a tile to add an improvement to your village.<br />
      🌿 Keep track of how many resources each improvement costs and adds.<br />
      🌿 Click on an improvement to upgrade, downgrade, or remove it.<br />
      🌿 Try to fill up the map without running out of resources!
      </p>
      
      <div className="resources-container">
        <ResourcesView resources={resources} />
        <button onClick={resetGame} className="reset-button">
          Reset Game
        </button>
      </div>
      <Map 
        gridSize={5} 
        resources={resources} 
        setResources={setResources}
        improvementsData={improvementsData}
        resetKey={mapResetKey}
      />
      <div className="border-image">
        <img src={borderImage} alt="Border" />
      </div>
      <div className="border2">
      <img src={border2} alt="BorderRight" />
      </div>
      <div className="app" style={{ background: `url(${background})` }}></div>
    </div>
  )
}

export default App
