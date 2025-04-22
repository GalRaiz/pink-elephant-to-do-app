import React from "react";
import "./Loader.scss";
import PinkElephant from "../assets/elephant.svg";

// const sentences = [
//   "Pouring some wine...",
//   "Hitting popcorn...",
//   "Catching Pikachu...",
//   "Eating pizza...",
//   "Taking a selfie...",
//   "Loading fun...",
//   "Taming a dragon...",
//   "Brewing coffee...",
//   "Charging your vibe...",
//   "Solving world peace...",
// ];

const Loader: React.FC = () => {
  // const randomSentence =
  //   sentences[Math.floor(Math.random() * sentences.length)];

  return (
    <div className="loader-container">
      <div className="speech-bubble">
        <p className="loader-text">Don't think of a Pink Elephant...</p>
      </div>
      <img src={PinkElephant} className="Loader-app-logo" alt="logo" />
    </div>
  );
};

export default Loader;
