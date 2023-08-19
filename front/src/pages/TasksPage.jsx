import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/authContext"

function TasksPage() {
  const {getTasks} = useTasks();
  
  useEffect(()=>{
    getTasks();
  },[])

  return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tasks.map((task) => (
          <div key={task._id}>
            <h1>
              {task.title} 
            </h1>
            <p>
              {task.description}
            </p>
        </div> 
        ))}
      </div>
  )
}

export default TasksPage