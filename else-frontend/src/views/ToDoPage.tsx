import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ToDoItemCard from "../components/ToDoItemCard";
import styles from "../css/ToDoPage.module.css";
import { createTodo, getToDos, updateToDo } from "../services/ToDoService";
import type { ToDo } from "../types/Type";
import AddTodoModal from "../components/AddTodoModal";

const ToDoPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [dragId, setDragId] = useState<number | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const loadTodos = async () => {
    const data = await getToDos();
    setToDos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleDelete = (id: number) => {
    setToDos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDragStart = (id: number) => {
    setDragId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handelOpen = () => {
    setOpen(true);
  };

  const handleCreatTodo = async (title: string) => {
    const newTodo = await createTodo(title);

    if (newTodo) {
      await loadTodos();
      setOpen(false);
    }
  };

  const handleDrop = async (toIndex: number) => {
    if (dragId == null) return;

    const sorted = [...toDos].sort((a, b) => a.order - b.order);

    const fromIndex = sorted.findIndex((t) => t.id === dragId);
    if (fromIndex === -1) return;

    const updated = [...sorted];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);

    const prevItem = updated[toIndex - 1];
    const nextItem = updated[toIndex + 1];

    const newOrder = getNewOrder(prevItem?.order, nextItem?.order);

    const updatedMoved = {
      ...moved,
      order: newOrder,
    };

    updated[toIndex] = updatedMoved;

    // 1. UI update direkt (optimistic)
    setToDos(updated);

    // 2. API call separat
    await updateToDo(moved.id, {
      title: moved.title,
      isCompleted: moved.isCompleted,
      order: newOrder,
    });

    setDragId(null);
  };

  return (
    <>
      <aside>
        <button onClick={handleLogout}>Log out</button>
      </aside>

      <main>
        <ul className={styles.toDoList}>
          {toDos.map((toDoItem, index) => (
            <li
              key={toDoItem.id}
              draggable
              onDragStart={() => handleDragStart(toDoItem.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}>
              <ToDoItemCard {...toDoItem} onDelete={handleDelete} />
            </li>
          ))}
        </ul>
        <button onClick={handelOpen}>+</button>
        {open && (
          <AddTodoModal
            onClose={() => setOpen(false)}
            onCreate={handleCreatTodo}
          />
        )}
      </main>
    </>
  );
};

const getNewOrder = (prev?: number, next?: number) => {
  if (prev == null && next == null) return 1000;
  if (prev == null) return next! - 1000;
  if (next == null) return prev + 1000;
  return (prev + next) / 2;
};

export default ToDoPage;
