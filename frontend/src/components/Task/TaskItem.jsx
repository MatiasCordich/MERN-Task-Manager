import { useState } from 'react'
import { host } from '../../utils/APIRoutes'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import moment from 'moment'
import './taskItem.css'

const TaskItem = ({ task, deleteTask }) => {

    const [isCompleted, setIsCompleted] = useState(task.completed)
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckbox = async () => {

        try {
            setIsLoading(true)

            await axios.put(`${host}/api/tasks/${task._id}`, {
                completed: !isCompleted,
            })

            setIsCompleted(!isCompleted)
            
            toast.success("Tarea editada", {
                style: {
                    background: '#346751',
                    padding: '16px',
                    color: '#ECDBBA',
                },
                iconTheme: {
                    primary: '#EDEDED',
                    secondary: '#346751',
                }
            })

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <tr className='task-item'>
            <td className='task-title'>
                <div onClick={handleCheckbox}>
                    <input className='checkbox' type="checkbox" defaultChecked={isCompleted} disabled={isLoading} />
                </div>
                <p>{task.title}</p>
            </td>
            <td
                className='complete-td'
                style={{color: isCompleted ? 'var(--light-green)' : 'var(--terracota)'}}
            >
                {isCompleted ? "Completada" : "Incompleto"}</td>
            <td>{moment(task.createdAt).locale('es').format('Do MMM YY')}</td>
            <td>
                <button
                    className='btn-delete'
                    type='button'
                    onClick={() => deleteTask(task._id)}
                >Eliminar</button>
            </td>
        </tr>
    )
}

export default TaskItem