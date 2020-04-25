import * as express from "express";
import TimeRecordService from "../Model/TimeRecord/TimeRecordService";
import AccessLevels from "../Model/Users/AccessLevels";

const router = express.Router()

const handleData = ({data, res, next}) => data.error
    ? res.json(data.errors)
    : res.json(data.data);

const getAccessLevels = req => req.user.accessLevels
const generateHasAccessLvl = lvl => req => getAccessLevels(req).includes(lvl)
const accessError = () => ({error: true, errors: [{message: "You don't have access to this resource"}]})

router.get('/', async (req, res, next) => {
    const data = await TimeRecordService.listTimeRecords()
    handleData({data, next, res})
})

router.post('/', async (req, res, next) => {
    const hasAccessLvl = generateHasAccessLvl(AccessLevels.CLIENT)
    const success = () => TimeRecordService.createTimeRecord({...(req.body), owner: req.user.id})
    const data = hasAccessLvl(req)
        ? await success()
        : accessError()

    handleData({data, next, res})
})

export default router;