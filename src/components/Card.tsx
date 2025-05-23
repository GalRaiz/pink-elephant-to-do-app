import React, { useState } from "react";
import "./Card.css";
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
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                console.log("Gal's console: ", props);
              }}
            />
            <Button
              type="secondary"
              btnText="Edit"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            />
            <Button
              type="tertiary"
              btnText="Delete"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                console.log("Gal's console: ", props);
              }}
            />
          </>
        ) : (
          <>
            <Button
              type="primary"
              btnText="Save"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleSave();
              }}
            />
            <Button
              type="secondary"
              btnText="Cancel"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleCancel();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
