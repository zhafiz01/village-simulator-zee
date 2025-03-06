import { useState, useEffect } from "react"
import Map from "./components/Map"
import ResourcesView from "./components/ResourceView"
import { Improvement } from '../models/Improvement'
import { Resources } from '../models/Resources'
import "./App.sass"
import borderImage from "./assets/UpperLeft.png"
import background from './assets/Background.png'

const App = () => {
  const [resources, setResources] = useState<Resources>({
    lumber: 5,
    grain: 5,
    water: 5,
    sheep: 1,
    people: 0,
  })

  const improvementTypes: Improvement[] = [
    {
      type: "House",
      level: 1,
      icon: "house-icon",
      cost: [
        { type: "Lumber", amount: 5 },
        { type: "Grain", amount: 5 },
        { type: "Water", amount: 5 },
        { type: "Sheep", amount: 1 },
      ],
      resourceProduced: [{ type: "People", amount: 5 }],
    },
    {
      type: "Field",
      level: 1,
      icon: "grain-icon",
      cost: [
        { type: "People", amount: 1 },
        { type: "Water", amount: 2 },
      ],
      resourceProduced: [{ type: "Grain", amount: 10 }],
    },
    {
      type: "Pasture",
      level: 1,
      icon: "sheep-icon",
      cost: [
        { type: "People", amount: 1 },
        { type: "Grain", amount: 2 },
        { type: "Water", amount: 2 },
      ],
      resourceProduced: [{ type: "Sheep", amount: 5 }],
    },
    {
      type: "Lumber Mill",
      level: 1,
      icon: "tree-icon",
      cost: [{ type: "People", amount: 1 }],
      resourceProduced: [{ type: "Lumber", amount: 10 }],
    },
    {
      type: "Well",
      level: 1,
      icon: "well-icon",
      cost: [
        { type: "People", amount: 1 },
        { type: "Lumber", amount: 2 },
      ],
      resourceProduced: [{ type: "Water", amount: 10 }],
    },
  ]

  const handleResourceUpdate = (improvement: Improvement) => {
    setResources((prevResources) => {
      const updatedResources = { ...prevResources }
      improvement.cost.forEach(({ type, amount }) => {
        updatedResources[type as keyof Resources] -= amount
      })
      improvement.resourceProduced?.forEach(({ type, amount }) => {
        updatedResources[type as keyof Resources] += amount
      })
      return updatedResources
    })
  }

  const canPlaceImprovement = (type: string) => {
    const improvement = improvementTypes.find((imp) => imp.type === type)
    if (!improvement) return false

    return improvement.cost.every(
      ({ type: costType, amount }) => resources[costType as keyof Resources] >= amount
    )
  }

  const placeImprovement = (type: string) => {
    if (!canPlaceImprovement(type)) {
      return alert("Not enough resources!")
    }

    const improvement = improvementTypes.find((imp) => imp.type === type)
    if (!improvement) return

    handleResourceUpdate(improvement)
  }

  return (
    <div>
      <h1 className="header">Village Simulator</h1>
      <p className="intro">Click on a tile to add an improvement to your village. Each improvement both costs and adds resources.<br />
        Click on an improvement to see if you have enough resources to upgrade it.<br />
        Try to fill up the map without running out of resources!
      </p>
      <div className="game-container"><ResourcesView resources={resources} />
      <Map gridSize={5} resources={resources} setResources={setResources} />
    </div>
    <div className="border-image">
      <img src={borderImage} alt="Border" />
    </div>
    <div className="app" style={{ background: `url(${background})` }}></div>
    </div>   
  )
}

export default App