import { useState } from "react";
import Tile from "./Tile";
import AddImprovementDialog from "./AddImprovementDialog";
import EditImprovementDialog from "./EditImprovementDialog";

interface MapProps {
  gridSize: number;
  resources: {
    lumber: number;
    grain: number;
    water: number;
    sheep: number;
    people: number;
  };
  setResources: React.Dispatch<
    React.SetStateAction<{
      lumber: number;
      grain: number;
      water: number;
      sheep: number;
      people: number;
    }>
  >;
}

const improvementCosts = {
  House: { lumber: 5, grain: 5, water: 5, sheep: 1 },
  Field: { people: 1, water: 2 },
  Pasture: { people: 1, grain: 2, water: 2 },
  "Lumber Mill": { people: 1 },
  Well: { people: 1, lumber: 2 },
};

const upgradeCosts: Record<string, (level: number) => Partial<Resources>> = {
  House: (level) => ({ lumber: level * 10 }),
  Field: (level) => ({ grain: level * 8, water: level * 5 }),
  LumberMill: (level) => ({ lumber: level * 5 }),
  Well: (level) => ({ water: level * 10 }),
  Pasture: (level) => ({ sheep: level * 3, grain: level * 5 }),
};

const Map = ({ gridSize, resources, setResources }: MapProps) => {
  const [tiles, setTiles] = useState<(string | null)[]>(Array(gridSize * gridSize).fill(null));
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [improvementLevels, setImprovementLevels] = useState<Record<number, number>>({});

  const handleTileClick = (index: number) => {
    setSelectedTile(index);
  };

  const handleCloseDialog = () => {
    setSelectedTile(null);
  };

  const handleSelectImprovement = (improvement: string) => {
    if (selectedTile === null) return;

    const cost = improvementCosts[improvement as keyof typeof improvementCosts];
    if (!Object.entries(cost).every(([key, value]) => resources[key as keyof typeof resources] >= value!)) {
      alert("Not enough resources to build this improvement!");
      return;
    }

    setResources((prev) => {
      const updated = { ...prev };
      Object.entries(cost).forEach(([key, value]) => {
        updated[key as keyof typeof prev] -= value!;
      });

      switch (improvement) {
        case "House":
          updated.people += 5;
          break;
        case "Field":
          updated.grain += 10;
          break;
        case "Pasture":
          updated.sheep += 5;
          break;
        case "Lumber Mill":
          updated.lumber += 10;
          break;
        case "Well":
          updated.water += 10;
          break;
      }

      return updated;
    });

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];
      newTiles[selectedTile] = improvement;
      return newTiles;
    });

    setImprovementLevels((prevLevels) => ({
      ...prevLevels,
      [selectedTile]: 1, // Default to level 1 when the improvement is placed
    }));

    setSelectedTile(null);
  };

  const handleUpgradeImprovement = (newLevel: number) => {
    if (selectedTile === null) return;
    const currentImprovement = tiles[selectedTile];
    if (!currentImprovement) return;

    const cost = upgradeCosts[currentImprovement as keyof typeof upgradeCosts](newLevel);
    if (!Object.entries(cost).every(([key, value]) => resources[key as keyof typeof resources] >= value!)) {
      alert("Not enough resources to upgrade this improvement!");
      return;
    }

    setResources((prev) => {
      const updated = { ...prev };
      Object.entries(cost).forEach(([key, value]) => {
        updated[key as keyof typeof prev] -= value!;
      });
      return updated;
    });

    setImprovementLevels((prevLevels) => ({
      ...prevLevels,
      [selectedTile]: newLevel, // Update the level to the new one
    }));

    setSelectedTile(null);
  };

  return (
    <div className="map">
      {tiles.map((improvement, index) => (
        <Tile key={index} index={index} improvement={improvement} onClick={handleTileClick} />
      ))}

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
  );
};

export default Map

/*

const Map = ({ gridSize, resources, setResources }: MapProps) => {
  const [tiles, setTiles] = useState<{ improvement: string | null, level: number }[]>(
    Array(gridSize * gridSize).fill({ improvement: null, level: 1 })
  );
  const [selectedTile, setSelectedTile] = useState<number | null>(null);

  const handleTileClick = (index: number) => {
    setSelectedTile(index);
  };

  const handleCloseDialog = () => {
    setSelectedTile(null);
  };

  const handleSelectImprovement = (improvement: string) => {
    if (selectedTile === null) return;

    const cost = improvementCosts[improvement as keyof typeof improvementCosts];
    if (!Object.entries(cost).every(([key, value]) => resources[key as keyof typeof resources] >= value!)) {
      alert("Not enough resources to build this improvement!");
      return;
    }

    setResources((prev) => {
      const updated = { ...prev };
      Object.entries(cost).forEach(([key, value]) => {
        updated[key as keyof typeof prev] -= value!;
      });

      switch (improvement) {
        case "House":
          updated.people += 5;
          break;
        case "Field":
          updated.grain += 10;
          break;
        case "Pasture":
          updated.sheep += 5;
          break;
        case "Lumber Mill":
          updated.lumber += 10;
          break;
        case "Well":
          updated.water += 10;
          break;
      }

      return updated;
    });

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];
      newTiles[selectedTile] = { improvement, level: 1 }; // Initialize level as 1
      return newTiles;
    });

    setSelectedTile(null);
  };

  const handleUpgradeImprovement = () => {
    if (selectedTile === null) return;
    const currentTile = tiles[selectedTile];
    if (!currentTile.improvement) return;

    const currentImprovement = improvementTypes.find(
      (improvement) => improvement.type === currentTile.improvement
    );
    if (!currentImprovement) return;

    const nextLevel = currentTile.level + 1;
    const cost = upgradeCosts[currentImprovement.type](nextLevel);
    if (!Object.entries(cost).every(([key, value]) => resources[key as keyof typeof resources] >= value!)) {
      alert("Not enough resources to upgrade this improvement!");
      return;
    }

    setResources((prev) => {
      const updated = { ...prev };
      Object.entries(cost).forEach(([key, value]) => {
        updated[key as keyof typeof prev] -= value!;
      });
      return updated;
    });

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];
      newTiles[selectedTile] = {
        improvement: currentTile.improvement,
        level: nextLevel, // Increment level
      };
      return newTiles;
    });

    setSelectedTile(null);
  };

  return (
    <div className="map">
      {tiles.map((tile, index) => (
        <Tile
          key={index}
          index={index}
          improvement={tile.improvement}
          onClick={handleTileClick}
        />
      ))}

      {selectedTile !== null && tiles[selectedTile].improvement === null ? (
        <AddImprovementDialog
          tileIndex={selectedTile}
          onClose={handleCloseDialog}
          onSelectImprovement={handleSelectImprovement}
        />
      ) : (
        selectedTile !== null &&
        tiles[selectedTile].improvement !== null && (
          <EditImprovementDialog
            improvement={tiles[selectedTile].improvement}
            level={tiles[selectedTile].level}
            resources={resources}
            onUpgrade={handleUpgradeImprovement}
            onClose={handleCloseDialog}
          />
        )
      )}
    </div>
  );
};

export default Map;
/*
const Map = ({ gridSize, resources, setResources }: MapProps) => {
  const [tiles, setTiles] = useState<(string | null)[]>(Array(gridSize * gridSize).fill(null));
  const [selectedTile, setSelectedTile] = useState<number | null>(null);

  const handleTileClick = (index: number) => {
    setSelectedTile(index);
  };

  const handleCloseDialog = () => {
    setSelectedTile(null);
  };

  const handleSelectImprovement = (improvement: string) => {
    if (selectedTile === null) return;

    const cost = improvementCosts[improvement as keyof typeof improvementCosts];
    if (!Object.entries(cost).every(([key, value]) => resources[key as keyof typeof resources] >= value!)) {
      alert("Not enough resources to build this improvement!");
      return;
    }

    setResources((prev) => {
      const updated = { ...prev };
      Object.entries(cost).forEach(([key, value]) => {
        updated[key as keyof typeof prev] -= value!;
      });

      switch (improvement) {
        case "House":
          updated.people += 5;
          break;
        case "Field":
          updated.grain += 10;
          break;
        case "Pasture":
          updated.sheep += 5;
          break;
        case "Lumber Mill":
          updated.lumber += 10;
          break;
        case "Well":
          updated.water += 10;
          break;
      }

      return updated;
    });

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];
      newTiles[selectedTile] = improvement;
      return newTiles;
    });

    setSelectedTile(null);
  };
    

  const handleUpgradeImprovement = (newLevel: number) => {
    if (selectedTile === null) return;
    const currentImprovement = tiles[selectedTile];
    if (!currentImprovement) return;

    const cost = upgradeCosts[currentImprovement as keyof typeof upgradeCosts];
    if (!Object.entries(cost).every(([key, value]) => resources[key as keyof typeof resources] >= value!)) {
      alert("Not enough resources to upgrade this improvement!");
      return;
    }

    setResources((prev) => {
      const updated = { ...prev };
      Object.entries(cost).forEach(([key, value]) => {
        updated[key as keyof typeof prev] -= value!;
      });
      return updated;
    });

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];
      newTiles[selectedTile] = currentImprovement;
      return newTiles;
    });

    setSelectedTile(null);
  };

  return (
    <div className="map">
      {tiles.map((improvement, index) => (
        <Tile key={index} index={index} improvement={improvement} onClick={handleTileClick} />
      ))}

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
            level={1}
            resources={resources}
            onUpgrade={handleUpgradeImprovement}
            onClose={handleCloseDialog}
          />
        )
      )}
    </div>
  );
};
*/