import { useState } from "react";
import { Trash } from 'phosphor-react';

import styles from './TaskItem.module.css';

export interface TaskItemProps {
  id: string,
  content: string,
  completed: boolean,
  onDeleteTaskById: (id: string) => void,
  onCompleteTaskById: (id: string) => void
}

function TaskItem({ content, id, completed, onDeleteTaskById, onCompleteTaskById }: TaskItemProps) {
  const [taskChecked, setTaskChecked] = useState(completed);

  function handleCompleteTask(){
    setTaskChecked(!taskChecked);
    onCompleteTaskById(id)
  }

  function handleDeleteTask() {
    onDeleteTaskById(id)
  }

  return (
    <div className={taskChecked ? `${styles.checked} ${styles.task}` : styles.task}>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          id={id}
          onChange={handleCompleteTask}
        />
        {taskChecked && (<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>)}
      </label>
      <label
        className={styles.taskText}
        htmlFor={id}
      >
        {content}
      </label>
      <button type="button" className={styles.trash} onClick={handleDeleteTask}>
        <Trash size={20} />
      </button>
    </div>
  );
}

export default TaskItem;