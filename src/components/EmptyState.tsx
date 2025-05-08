import PinkElephant from "../assets/elephant.svg";
import "./EmptyState.scss";

const EmptyState = () => {
  return (
    <div className="empty-state-container">
      <h2 className="empty-state-header">EmptyState</h2>
      <h3 className="empty-state-text">Sorry, we didn't find what you want</h3>
      <img
        src={PinkElephant}
        className="empty-state-logo"
        alt="Pink Elephant"
      />
    </div>
  );
};

export default EmptyState;
