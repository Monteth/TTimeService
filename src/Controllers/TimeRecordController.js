import * as express from "express";
import TimeRecordService from "../Model/TimeRecord/TimeRecordService";
import AccessLevels from "../Model/Users/AccessLevels";

const TimeRecordController = express.Router()

const handleData = ({data, res, next}) => data.error
    ? res.json(data.errors)
    : res.json(data.data);

const getAccessLevels = req => req.user.accessLevels
const generateHasAccessLvl = lvl => req => getAccessLevels(req).includes(lvl)
const accessError = () => ({error: true, errors: [{message: "You don't have access to this resource"}]})

TimeRecordController.get('/', async (req, res, next) => {
    const hasAccessLvl = generateHasAccessLvl(AccessLevels.CLIENT)
    const success = () => TimeRecordService.listUserTimeRecords(req.user.id)
    const data = hasAccessLvl(req)
        ? await success()
        : accessError()
    handleData({data, next, res})
})

TimeRecordController.post('/', async (req, res, next) => {
    const hasAccessLvl = generateHasAccessLvl(AccessLevels.CLIENT)
    const success = () => TimeRecordService.createTimeRecord({...(req.body), owner: req.user.id})
    const data = hasAccessLvl(req)
        ? await success()
        : accessError()

    handleData({data, next, res})
})

TimeRecordController.put('/:id', async (req, res, next) => {
    const hasAccessLvl = generateHasAccessLvl(AccessLevels.CLIENT)
    const success = () => TimeRecordService.editTimeRecord({timeRecordInput: req.body, timeRecordID: req.params.id, userID: req.user.id})
    const data = hasAccessLvl(req)
        ? await success()
        : accessError()

    handleData({data, next, res})
})

TimeRecordController.delete('/:id', async (req, res, next) => {
    const hasAccessLvl = generateHasAccessLvl(AccessLevels.CLIENT)
    const success = () => TimeRecordService.removeUserTimeRecord({timeRecordID: req.params.id, userID: req.user.id})
    const data = hasAccessLvl(req)
        ? await success()
        : accessError()

    handleData({data, next, res})
})

export default TimeRecordController;