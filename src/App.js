import './style.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, saveTask, deleteTask, toggleImportant } from './redux/slice';

function App() {
  const [taskInput, setTaskInput] = useState('');
  const [editedTask, setEditedTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const dispatch = useDispatch();
  const taskList = useSelector((s) => s.tasks.taskList);

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      if (editingTaskIndex !== null) {
        setEditingTaskIndex(null);
        setEditedTask('');
      }
      dispatch(addTask({ text: taskInput, important: false }));
      setTaskInput('');
    }
  }

  const handleEditTask = (index) => {
    setEditingTaskIndex(index);
    setEditedTask(taskList[index].text);
  }

  const handleSaveTask = (index) => {
    dispatch(saveTask({ index: editingTaskIndex, newText: editedTask }));
    setEditingTaskIndex(null);
    setEditedTask('');
  }

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  }

  const handleToggleImportant = (index) => {
    dispatch(toggleImportant(index));
  }

  return (
    <div className="container">
      <div className="add-area">
        
        <h1>Задачи</h1>
        
        <input
          className="input-add"
          placeholder="Введите название задачи"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                handleAddTask();
            }}}>
        </input>

        <button className='button-add'
          onClick={handleAddTask}
        >Добавить</button>

      </div>
      
      <div className="tasks-list">
        {taskList.map((task, index) => (
          <div
            key={index}
            className='task-item'
            style={{
              backgroundColor: task.important
                ? 'gold'
                : 'transparent'
            }}
          >

            <div className='task-name'>
              {index === editingTaskIndex ? (
                <>
                  <input
                    className='input-edit'
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                          handleSaveTask();
                      }}}
                  />

                  <div className='buttons-area'>

                    <div className='important-flag'>
                    </div>

                    <div className='buttons-couple'>
                      <button
                        className='button-save'
                        onClick={() => handleSaveTask(index)}
                      >Сохранить</button>

                      <button
                        className='button-cancel'
                        onClick={() => setEditingTaskIndex(null)}
                      >Отменить</button>
                    </div>

                  </div>
                </>
              ) : (
                <h3>{task.text}</h3>
              )}
              
            </div>
            
            <div className='buttons-area'>
              {index !== editingTaskIndex && (
                <div className='important-flag'>
                  <p>Важная задача</p>
                  <input
                    type='checkbox'
                    onChange={() => handleToggleImportant(index)}
                    checked={task.important}></input>
                </div>
              )}

              {index !== editingTaskIndex && (
                <div className='buttons-couple'>
                  <button
                    className='button-edit'
                    onClick={() => handleEditTask(index)}
                  >Изменить</button>

                  <button
                    className='button-delete'
                    onClick={() => handleDeleteTask(index)}
                  >Удалить</button>
                </div>
              )}

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
