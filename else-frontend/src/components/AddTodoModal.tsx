import { useState } from "react";
import styles from "../css/ToDoPage.module.css";

type AddTodoProps = {
  onClose: () => void;
  onCreate: (title: string) => void;
};

const AddTodoModal = ({ onClose, onCreate }: AddTodoProps) => {
  const [title, setTitle] = useState<string>("");

  const handleSave = () => {
    if (!title.trim()) return;
    onCreate(title);
    setTitle("");
  };

  return (
    <div className={styles.todopopup}>
      <div className={styles.addTodoCard}>
        <input
          placeholder="Add new task"
          type="Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div>
          <button onClick={handleSave}>save</button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
