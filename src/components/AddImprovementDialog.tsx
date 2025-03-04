import "../AddImprovementDialog.sass";

interface AddImprovementDialogProps {
  tileIndex: number | null;
  onClose: () => void;
  onSelectImprovement: (improvement: string) => void;
}

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
