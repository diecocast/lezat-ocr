import React from 'react';
import { TaskType } from '../types';

interface TabSelectorProps {
  tasks: TaskType[];
  activeTask: TaskType;
  setActiveTask: (task: TaskType) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ tasks, activeTask, setActiveTask }) => {
  return (
    <div className="bg-base-300/50 p-1 rounded-lg flex items-center">
      {tasks.map((task) => (
        <button
          key={task}
          onClick={() => setActiveTask(task)}
          className={`w-full px-3 py-2 text-sm sm:text-base font-medium rounded-md transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 ${
            activeTask === task
              ? 'bg-base-200 text-brand-primary shadow'
              : 'text-text-secondary hover:bg-base-200/50 hover:text-text-primary'
          }`}
        >
          {task}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;