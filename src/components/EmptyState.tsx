import PinkElephant from "../assets/elephant.svg";
import "./EmptyState.scss";

function EmptyState() {
  return (
    <>
      <h2 className="header">EmptyState</h2>
      <h3 className="text">Sorry, we didn't find what you want</h3>
      <img src={PinkElephant} className="Loader-app-logo" alt="logo" />
    </>
  );
}

export default EmptyState;
