import React, { useState } from "react";
import "./Card.scss";
import Button from "./Button";

interface IUserCardProps {
  type: "user";
  id: number;
  name: string;
  email?: string;
  clickHandler?: () => void;
  isAllTasksCompleted: boolean;
}

type CardProps = IUserCardProps;

const Card: React.FC<CardProps> = (props) => {
  const { type, id, clickHandler, isAllTasksCompleted } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(props.name);
  const [editedEmail, setEditedEmail] = useState(props.email ?? "");

  const handleSave = () => {
    console.log("Saving changes:", { editedName, editedEmail });
    // Optionally trigger a parent callback or API request here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(props.name);
    setEditedEmail(props.email ?? "");
    setIsEditing(false);
  };

  return (
    <div
      className={`card ${isAllTasksCompleted ? "completed" : "not-completed"}`}
    >
      <div
        className="card-content"
        onClick={() => {
          if (!isEditing && clickHandler) {
            clickHandler();
          }
        }}
      >
        <p className="card-id">#{id}</p>
        {type === "user" && "name" in props && (
          <>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="card-name-input"
                />
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="card-email-input"
                />
              </>
            ) : (
              <>
                <header className="card-name">Name: {editedName}</header>
                <p className="card-email">
                  Email: {editedEmail || "no email for this user"}
                </p>
              </>
            )}
          </>
        )}
        {!isEditing ? (
          <>
            <Button
              type="primary"
              btnText="View Details"
              onClick={() => console.log("Gal's console: ", props)}
            />
            <Button
              type="secondary"
              btnText="Edit"
              onClick={() => setIsEditing(true)}
            />
            <Button
              type="tertiary"
              btnText="Delete"
              onClick={() => console.log("Gal's console: ", props)}
            />
          </>
        ) : (
          <>
            <Button type="primary" btnText="Save" onClick={handleSave} />
            <Button type="secondary" btnText="Cancel" onClick={handleCancel} />
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
