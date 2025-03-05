
import { useState } from "react";

interface AddImprovementDialogProps {
  tileIndex: number | null;
  onClose: () => void;
  onSelectImprovement: (improvement: string) => void;
}

const AddImprovementDialog = ({ tileIndex, onClose, onSelectImprovement }: AddImprovementDialogProps) => {
  if (tileIndex === null) return null;

  // Improvement cost details
  const improvementCosts: Record<string, string[]> = {
    House: ["lumber: 5, grain: 5, water: 5, sheep: 1"],
    Field: ["people: 1, water: 2"],
    Pasture: ["people: 1, grain: 2, water: 2"],
    "Lumber Mill": ["people: 1"],
    Well: ["people: 1, lumber: 2"],
  };

  // Improvement additions
  const improvementAdditions: Record<string, string> = {
    House: "5 people",
    Field: "10 grain",
    Pasture: "5 sheep",
    "Lumber Mill": "10 lumber",
    Well: "10 water",
  };

  // React state for displaying the current improvement cost and addition
  const [hoveredImprovement, setHoveredImprovement] = useState<string | null>(null);

  // Function to handle mouse hover over an improvement
  const handleMouseEnter = (improvement: string) => {
    setHoveredImprovement(improvement);
  };

  // Function to reset hovered improvement on mouse leave
  const handleMouseLeave = () => {
    setHoveredImprovement(null);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Add Improvement</h2>
        <p>Choose an improvement for your land!</p>

        {/* Button for House Improvement */}
        <button
          onMouseEnter={() => handleMouseEnter("House")}
          onClick={() => onSelectImprovement("House")}
          onMouseLeave={handleMouseLeave}
        >
          🏠 House
        </button>

        {/* Button for Field Improvement */}
        <button
          onMouseEnter={() => handleMouseEnter("Field")}
          onClick={() => onSelectImprovement("Field")}
          onMouseLeave={handleMouseLeave}
        >
          🌾 Field
        </button>

        {/* Button for Pasture Improvement */}
        <button
          onMouseEnter={() => handleMouseEnter("Pasture")}
          onClick={() => onSelectImprovement("Pasture")}
          onMouseLeave={handleMouseLeave}
        >
          🐑 Pasture
        </button>

        {/* Button for Lumber Mill Improvement */}
        <button
          onMouseEnter={() => handleMouseEnter("Lumber Mill")}
          onClick={() => onSelectImprovement("Lumber Mill")}
          onMouseLeave={handleMouseLeave}
        >
          🌲 Lumber Mill
        </button>

        {/* Button for Well Improvement */}
        <button
          onMouseEnter={() => handleMouseEnter("Well")}
          onClick={() => onSelectImprovement("Well")}
          onMouseLeave={handleMouseLeave}
        >
          💧 Well
        </button>

        {/* Display cost and addition when hovering over an improvement */}
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
  );
};

export default AddImprovementDialog;

/*

const AddImprovementDialog = ({ tileIndex, onClose, onSelectImprovement }: AddImprovementDialogProps) => {
  if (tileIndex === null) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Add Improvement</h2>
        <p>Choose an improvement for your land!</p>
        <button onClick={() => onSelectImprovement("House")}>🏠 House</button>
        <button onClick={() => onSelectImprovement("Field")}>🌾 Field</button>
        <button onClick={() => onSelectImprovement("Pasture")}>🐑 Pasture</button>
        <button onClick={() => onSelectImprovement("Lumber Mill")}>🌲 Lumber Mill</button>
        <button onClick={() => onSelectImprovement("Well")}>💧 Well</button>
        <button className="close-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddImprovementDialog;
*/