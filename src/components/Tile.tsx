import "../Tile.sass";

interface TileProps {
  index: number
  improvement: "house" | "field" | "pasture" | "lumber-mill" | "well" | null
  onClick: (index: number) => void
}

const Tile = ({ index, improvement, onClick }: TileProps) => {
  return (
    <div 
      className={`tile ${improvement
        ? `${improvement}-placeholder`
        : ""}`} 
      onClick={() => onClick(index)}
    >
      {improvement && <span className="improvement-label">{improvement}</span>}
    </div>
  )
}

export default Tile