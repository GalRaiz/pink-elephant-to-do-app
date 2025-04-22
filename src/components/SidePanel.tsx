import React from "react";
import "./SidePanel.scss";
import EmptyState from "./EmptyState.tsx";

interface ISidePanelProps {
  type: "filterDrinks" | "drinkDetails";
  drinkType?: string;
  filterType?: string;
  onFilterChange: (filterType: string) => void;
  onClose: () => void;
  isOpen: boolean;
  drink?: { name: string; image?: string; description?: string };
}

const SidePanel: React.FC<ISidePanelProps> = ({
  type,
  filterType,
  onFilterChange,
  onClose,
  isOpen,
  drink,
}) => {
  const sidePanelDetails = () => {
    switch (type) {
      case "filterDrinks":
        return (
          <div>
            <h3>Filter Wines by Type</h3>
            <select
              value={filterType}
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Red">Red</option>
              <option value="White">White</option>
              <option value="Rosé">Rosé</option>
              <option value="Sparkling">Sparkling</option>
            </select>
          </div>
        );

      case "drinkDetails":
        return (
          <div>
            {drink && (
              <div className="side-panel-content">
                <h2>{drink.name}</h2>
                <img src={drink.image} alt={drink.name} />
                <p>{drink.description}</p>
              </div>
            )}
          </div>
        );

      default:
        return <EmptyState />;
    }
  };

  if (!isOpen) return null;
  return (
    <div className={`side-panel ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      {sidePanelDetails()}
    </div>
  );
};

export default SidePanel;
