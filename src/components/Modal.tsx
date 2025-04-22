import React, { useState } from "react";
import "./Modal.scss";
import { IPost, ITodo } from "../store/types.ts";
import Button from "./Button.tsx";

interface ModalProps {
  onClose: () => void;
  title?: string;
  todosData: ITodo[];
  postsData: IPost[];
  error?: string;
}

enum ModalType {
  TODOS = "todos",
  POSTS = "posts",
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  title,
  todosData,
  postsData,
  error,
}) => {
  const [type, setType] = useState<ModalType>(ModalType.TODOS);

  const markAsCompleted = (id: number) => {
    console.log(`Task ${id} marked as completed`);
  };

  const renderModalContent = () => {
    switch (type) {
      case ModalType.TODOS:
        return (
          <div className="modal-list">
            {todosData.map((item) => (
              <div key={item.id} className="modal-list-item">
                <div className="todo-text">
                  {item.completed ? "✅" : "❌"} {item.title}
                </div>
                {!item.completed && (
                  <Button
                    type="tertiary"
                    size="small"
                    btnText="Mark completed"
                    onClick={() => markAsCompleted(item.id)}
                  />
                )}
              </div>
            ))}
          </div>
        );
      case ModalType.POSTS:
        return (
          <div className="modal-list">
            {postsData.map((item) => (
              <div key={item.id} className="modal-list-item post-item">
                <h3 className="post-title">{item.title}</h3>
                <p className="post-body">{item.body}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-tabs">
          <button
            className={`modal-tab-btn ${
              type === ModalType.TODOS ? "active" : ""
            }`}
            onClick={() => setType(ModalType.TODOS)}
          >
            Todos
          </button>
          <button
            className={`modal-tab-btn ${
              type === ModalType.POSTS ? "active" : ""
            }`}
            onClick={() => setType(ModalType.POSTS)}
          >
            Posts
          </button>
        </div>
        <h2 className="modal-title">{title}</h2>
        {todosData.length || postsData.length ? (
          renderModalContent()
        ) : (
          <p className="error-text">Error: {error}</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
