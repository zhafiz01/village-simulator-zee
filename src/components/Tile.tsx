import "../Tile.sass";

interface TileProps {
  index: number;
  onClick: (index: number) => void;
}

const Tile = ({ index, onClick }: TileProps) => {
  return (
    <div className="tile" onClick={() => onClick(index)}>
      
    </div>
  );
};

export default Tile;
