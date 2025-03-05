import { useState } from "react";
import houseImage from '../assets/House2.png';
import grainImage from '../assets/Grain1.png';
import sheepImage from '../assets/Sheep2.png';
import treeImage from '../assets/Tree.png';
import wellImage from '../assets/Well1.png';

interface TileProps {
  index: number;
  improvement: string | null;
  onClick: (index: number) => void;
}

const resourceImages: { [key: string]: string } = {
  House: houseImage,
  Field: grainImage,
  Pasture: sheepImage,
  "Lumber Mill": treeImage,
  Well: wellImage,
};

const Tile = ({ index, improvement, onClick }: TileProps) => {
  return (
    <div className="tile" onClick={() => onClick(index)}>
      {improvement && (
        <div className="improvement">
          <img src={resourceImages[improvement]} alt={improvement} className="improvement-icon" />
          <span className="improvement-label">{improvement}</span>
        </div>
      )}
    </div>
  );
};

export default Tile;

/*
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
*/