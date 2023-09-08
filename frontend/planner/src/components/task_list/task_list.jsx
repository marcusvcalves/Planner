export const TaskList = ({ tasks }) => {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <div className="columns" key={task.id}>
                    <p className="purple">{task.time.split(':').slice(0, 2).join(':')}</p>
                    <p>{task.monday_task}</p>
                    <p>{task.tuesday_task}</p>
                    <p>{task.wednesday_task}</p>
                    <p>{task.thursday_task}</p>
                    <p>{task.friday_task}</p>
                    <p>{task.saturday_task}</p>
                    <p>{task.sunday_task}</p>
                </div>
                
            ))}
        </div>
    );
};