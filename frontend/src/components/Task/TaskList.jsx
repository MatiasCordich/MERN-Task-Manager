import "./taskList.css"
import "../Login/AuthForm.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { host } from "../../utils/APIRoutes"
import TaskItem from "./TaskItem"
import { toast, Toaster } from 'react-hot-toast'

const TaskList = () => {

    const [taskList, setTaskList] = useState([])
    const [isAddingNew, setIsAddingNew] = useState(false)
    const [newTask, setNewTask] = useState('')

    const getTasks = async () => {

        try {

            const { data } = await axios.get(`${host}/api/tasks/myTasks`)

            console.log(data.data)

            setTaskList(
                data?.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            )
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    const addNewButtonClick = (task) => {
        setIsAddingNew(!isAddingNew)
    }

    const addNewTask = async (e) => {

        e.preventDefault()

        if (newTask.length <= 0) return  toast.error("Titulo vacio", {
            style: {
                background: '#C84B31',
                padding: '16px',
                color: '#EDEDED',
            },
            iconTheme: {
                primary: '#EDEDED',
                secondary: '#C84B31',
            }
        })

        try {

            const { data } = await axios.post(`${host}/api/tasks`, {
                title: newTask
            })

            toast.success("Tarea agregada", {
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
            setIsAddingNew(false)
            setNewTask('')
            setTaskList([{ ...data.data }, ...taskList])
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {

        try {
            await axios.delete(`${host}/api/tasks/${id}`)

            toast.success("Tarea eliminada", {
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

            setTaskList(taskList.filter((task) => task._id !== id))
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="task-wrapper">
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <nav className="navbar-task">
                <button
                    type="button"
                    className="add-task-btn"
                    onClick={addNewButtonClick}>
                    Agregar Tarea
                </button>
            </nav>
            <main className="task-box">
                <div className="box-1">
                    {
                        isAddingNew && (
                            <form className="form-box" onSubmit=
                                {addNewTask}>
                                <label className="label-box" htmlFor="task">
                                    Nueva tarea
                                    <input
                                        className="input-box"
                                        type="text"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        placeholder="Nombre tarea"
                                        autoFocus
                                    />
                                </label>
                                <button className="btn-auth" type="submit">Agregar</button>
                            </form>
                        )
                    }
                </div>
                <div className="box-2">
                    {taskList.length > 0 ? (
                        <table className="table-box">
                            <tbody className="table-body">
                                {taskList.map((task) => (
                                    <TaskItem key={task._id} task={task} deleteTask={deleteTask} />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        'No task Found.'
                    )}
                </div>



            </main>
        </div>
    )
}

export default TaskList