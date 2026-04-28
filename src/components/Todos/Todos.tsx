import { useState } from 'react';
import style from './todos.module.css';
import type { todosType } from './todosType';

export default function Todos() {
  const [todosList, setTodosList] = useState<todosType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addTask = () => {
    if (inputValue) {
      const newTodo = {
        id: Date.now().toString(),
        name: inputValue,
      };
      setTodosList([...todosList, newTodo]);
      setInputValue('');
    }
  };

  const deleteTask = (innerId: string): void => {
    const newTaskList = [...todosList].filter((task) => task.id !== innerId);
    setTodosList(newTaskList);
  };

  const clearTasks = (): void => {
    setTodosList([]);
    setInputValue('');
  };

  return (
    <>
      <div className={style.todos}>Задачи для выполнения: </div>
      <ul>
        {todosList.map((todo) => (
          <li key={todo.id}>
            {todo.name}
            <button className={style.deleteButton} onClick={() => deleteTask(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        name="todos"
        value={inputValue}
        placeholder="To do..."
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <button onClick={clearTasks}>Clear Tasks!</button>
    </>
  );
}
