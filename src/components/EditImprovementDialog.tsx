import { useState, useEffect } from "react";
import { Resources } from "../../models/Resources";

interface EditImprovementDialogProps {
    improvement: string;
    level: number;
    resources: Resources; // This is the user's current resource amounts
    onUpgrade: (newLevel: number) => void;
    onClose: () => void;
  }
  
  const upgradeCosts: Record<string, (level: number) => Partial<Resources>> = {
    House: (level) => ({ lumber: level * 10 }),
    Field: (level) => ({ grain: level * 8, water: level * 5 }),
    LumberMill: (level) => ({ lumber: level * 5 }),
    Well: (level) => ({ water: level * 10 }),
    Pasture: (level) => ({ sheep: level * 3, grain: level * 5 }),
  };

  const EditImprovementDialog = ({
    improvement,
    level = 1,
    resources,
    onUpgrade,
    onClose,
  }: EditImprovementDialogProps) => {
    const [newLevel, setNewLevel] = useState(level);
    const [upgradeCost, setUpgradeCost] = useState<Partial<Resources>>({});
  
    useEffect(() => {
      const cost = upgradeCosts[improvement]?.(newLevel + 1) || {};
      setUpgradeCost(cost);
    }, [improvement, newLevel]);
  
    const canUpgrade = Object.entries(upgradeCost).every(
      ([resource, cost]) => {
        const resourceAmount = resources[resource as keyof typeof resources] || 0;
        return resourceAmount >= cost;
      }
    );
  
    const handleUpgrade = () => {
      if (canUpgrade) {
        onUpgrade(newLevel + 1); // Pass the updated level back to the parent component
      } else {
        alert("Not enough resources to upgrade!");
      }
    };
  
    return (
      <div className="dialog">
        <h2>Upgrade {improvement}</h2>
        <p>Current Level: {level}</p>
        <h3>Upgrade Cost:</h3>
        <ul>
          {Object.entries(upgradeCost).map(([resource, cost]) => (
            <li key={resource}>
              {resource}: {cost}
            </li>
          ))}
        </ul>
        <button onClick={handleUpgrade} disabled={!canUpgrade}>
          Upgrade to Level {newLevel + 1}
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
  
export default EditImprovementDialog
  /*
  const EditImprovementDialog = ({
    improvement,
    level = 1,
    resources,
    onUpgrade,
    onClose,
  }: EditImprovementDialogProps) => {
    const [newLevel, setNewLevel] = useState(level);
    const [upgradeCost, setUpgradeCost] = useState<Partial<Resources>>({});
  
    // Dynamically calculate the cost whenever the level changes
    useEffect(() => {
      const cost = upgradeCosts[improvement]?.(newLevel + 1) || {};
      setUpgradeCost(cost);
    }, [improvement, newLevel]);
  
    // Check if the user has enough resources for the upgrade
    const canUpgrade = Object.entries(upgradeCost).every(
        ([resource, cost]) => {
          // Check if resources contains the resource and if it's enough
          const resourceAmount = resources[resource as keyof typeof resources] || 0;
          return resourceAmount >= cost;
        }
      );
  
    const handleUpgrade = () => {
      if (canUpgrade) {
        onUpgrade(newLevel + 1);
      } else {
        alert("Not enough resources to upgrade!");
      }    };
  
    return (
      <div className="dialog">
        <h2>Upgrade {improvement}</h2>
        <p>Current Level: {level}</p>
        <h3>Upgrade Cost:</h3>
        <ul>
          {Object.entries(upgradeCost).map(([resource, cost]) => (
            <li key={resource}>
              {resource}: {cost}
            </li>
          ))}
        </ul>
        <button onClick={handleUpgrade} disabled={!canUpgrade}>
          Upgrade to Level {newLevel + 1}
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
  
  export default EditImprovementDialog;

interface EditImprovementDialogProps {
  improvement: string;
  level: number;
  resources: {
    lumber: number;
    grain: number;
    water: number;
    sheep: number;
    people: number;
  };
  onUpgrade: (newLevel: number) => void;
  onClose: () => void;
}

const upgradeCosts: Record<string, (level: number) => Partial<EditImprovementDialogProps["resources"]>> = {
  house: (level) => ({ lumber: level * 10, people: level * 2 }),
  farm: (level) => ({ grain: level * 8, water: level * 5 }),
  lumberMill: (level) => ({ lumber: level * 5 }),
  well: (level) => ({ water: level * 10 }),
  barn: (level) => ({ sheep: level * 3, grain: level * 5 }),
};

const EditImprovementDialog = ({
  improvement,
  level = 1,
  resources,
  onUpgrade,
  onClose,
}: EditImprovementDialogProps) => {
  const [newLevel, setNewLevel] = useState(level);

  const upgradeCost = upgradeCosts[improvement]?.(newLevel + 1) || {};

  const canUpgrade = Object.entries(upgradeCost).every(
    ([resource, cost]) => resources[resource as keyof typeof resources] >= cost
  );

  const handleUpgrade = () => {
    if (canUpgrade) {
      onUpgrade(newLevel + 1);
    } else {
      alert("Not enough resources to upgrade!");
    }
  };

  return (
    <div className="dialog">
      <h2>Upgrade {improvement}</h2>
      <p>Current Level: {level}</p>
      <h3>Upgrade Cost:</h3>
      <ul>
        {Object.entries(upgradeCost).map(([resource, cost]) => (
          <li key={resource}>
            {resource}: {cost}
          </li>
        ))}
      </ul>
      <button onClick={handleUpgrade} disabled={!canUpgrade}>
        Upgrade to Level {newLevel + 1}
      </button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditImprovementDialog;
*/