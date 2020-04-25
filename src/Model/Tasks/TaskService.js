import Task from "./Task";

const prepareResponse = promise => promise
        .then(e => ({error: false, data: Array.isArray(e) ? dbModelsToLogic(e) : dbModelToLogic(e)}))
        .catch(e => ({error: true, errors: e}))

const createTask = (taskInput) => prepareResponse(Task.create(taskInput))

const listTasks = () => prepareResponse(Task.find())

const getTask = (id) => prepareResponse(Task.findOne({_id: id}))

const editTask = ({model, id}) => prepareResponse(Task.findOneAndUpdate({_id: id}, model, {new: true}))

const removeTask = (id) => prepareResponse(Task.findOneAndRemove({_id: id}))

const dbModelToLogic = ({title, done, _id}) => ({id: _id, title: title, done: done})
const dbModelsToLogic = (tasks) => tasks.map(t => dbModelToLogic(t))

export default {listTasks, createTask, editTask, getTask, removeTask}