import express from 'express';
import TaskService from "../Model/Tasks/TaskService";
import AccessLevels from "../Model/Users/AccessLevels";
const router = express.Router();

const handleData = ({data, res, next}) => data.error
    ? res.json(data.errors)
    : res.json(data.data);

const getUser = req => req.user
const getAccessLevels = req => req.user.accessLevels
const generateHasAccessLvl = lvl => req => getAccessLevels(req).includes(lvl)
const accessError = () => ({error: true, errors: [{message: "You don't have access to this resource"}]})


router.get('/', async (req, res, next) => {
    const data = await TaskService.listTasks()

    handleData({data, next, res})
});

router.get('/:id', async (req, res, next) => {
    const data = await TaskService.getTask(req.params.id)

    handleData({data, next, res})
});

router.post('/', async (req, res, next) => {
    const data = await TaskService.createTask(req.body)

    handleData({data, next, res})
});

router.put('/:id', async (req, res, next) => {
    const data = await TaskService.editTask({model: req.body, id: req.params.id})

    handleData({data, next, res})
});

router.delete('/:id', async (req, res, next) => {
    const hasAccessLvl = generateHasAccessLvl(AccessLevels.CLIENT)

    const success = async () => await TaskService.removeTask(req.params.id)

    const data = hasAccessLvl(req)
        ? await success()
        : accessError()

    handleData({data, res, next})
});

export default router;
