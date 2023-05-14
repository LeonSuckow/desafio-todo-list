import { useCallback, useEffect, useState } from "react";
import { PlusCircle } from 'phosphor-react';
import styles from './Task.module.css';
import TaskItem from "./TaskItem";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';

interface TaskItemProps {
  id: string,
  content: string,
  completed: boolean
}

interface summaryProps {
  total: number,
  percentCompleted: number,
  completedTasks: number
}

function Task({ }) {
  const [tasks, setTasks] = useState<TaskItemProps[]>([]);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [summary, setSummary] = useState({} as summaryProps);


  useEffect(() => {
    onChangeTasksState();
  }, [tasks])

  function handleAddNewTask() {
    event?.preventDefault()
    if (!newTaskContent) return toast('Conteúdo vazio', { type: 'error', theme: 'colored' });
    const newTask = { id: uuidv4(), content: newTaskContent, completed: false };
    setTasks([...tasks, newTask]);
    setNewTaskContent('');
  }

  const onChangeTasksState = useCallback(() => {
    const summaryTasks = tasks.reduce((prev, next) => {
      if (next.completed)
        prev.completedTasks++;

      return prev
    }, { completedTasks: 0, percentCompleted: 0, total: 0 })
    summaryTasks.total = tasks.length;
    summaryTasks.percentCompleted = summaryTasks.completedTasks * 100 / summaryTasks.total || 0;

    setSummary(summaryTasks)
  }, [tasks])

  function onDeleteTaskById(taskId: string) {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  }

  function onCompleteTaskById(taskId: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleAddNewTask}>
        <input
          type="text"
          placeholder='Adicione uma nova tarefa'
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
        />
        <button type='submit'>Criar <PlusCircle size={18} weight='bold' /></button>
      </form>
      <div className={styles.taskContainer}>
        <header>
          <div>
            <button className={styles.finishedBtn}>
              Tarefas criadas
              <span className={styles.badge}>{summary.total}</span>
            </button>

          </div>
          <div>
            <button className={styles.progressBtn}>
              Concluído {summary.percentCompleted}% <span className={styles.badge}>{summary.completedTasks} de {summary.total}</span>
            </button>
          </div>
        </header>
        <div className={styles.tasks}>
          {tasks.map((task) => (
            <TaskItem key={task.id} id={task.id} completed={task.completed} content={task.content} onDeleteTaskById={onDeleteTaskById} onCompleteTaskById={onCompleteTaskById} />
          ))}
        </div>
      </div></>
  );
}

export default Task;