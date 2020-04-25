import TimeRecord from "./TimeRecord";

const prepareResponse = promise => promise
    .then(e => ({error: false, data: Array.isArray(e) ? dbModelsToLogic(e) : dbModelToLogic(e)}))
    .catch(e => ({error: true, errors: e}))

const listTimeRecords = () => prepareResponse(TimeRecord.find())

const createTimeRecord = (timeRecordInput) => prepareResponse(TimeRecord.create(timeRecordInput))

const dbModelToLogic = ({name, timeElapsed, _id, startDate, endDate}) => ({name, timeElapsed, id: _id, startDate, endDate})
const dbModelsToLogic = (tasks) => tasks.map(t => dbModelToLogic(t))

export default {listTimeRecords, createTimeRecord}