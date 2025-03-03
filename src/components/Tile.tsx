import "../Tile.sass";

interface TileProps {
  index: number;
  improvement: string | null; // accepts improvement type
  onClick: (index: number) => void;
}

const Tile = ({ index, improvement, onClick }: TileProps) => {
  return (
    <div className="tile" onClick={() => onClick(index)}>
      {improvement ? <span className="improvement-label">{improvement}</span> : ""}
    </div>
  );
};

export default Tile;
