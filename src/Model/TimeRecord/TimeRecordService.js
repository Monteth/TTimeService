import TimeRecord from "./TimeRecord";

const prepareResponse = promise => promise
    .then(e => ({error: false, data: Array.isArray(e) ? dbModelsToLogic(e) : dbModelToLogic(e)}))
    .catch(e => ({error: true, errors: e}))

const listTimeRecords = () => prepareResponse(TimeRecord.find())

const listUserTimeRecords = (userID) => prepareResponse(TimeRecord.find({owner: userID}))

const createTimeRecord = (timeRecordInput) => prepareResponse(TimeRecord.create(timeRecordInput))

const removeTimeRecord = (id) => prepareResponse(TimeRecord.findOneAndRemove({_id: id}))

const removeUserTimeRecord = ({timeRecordID, userID}) => prepareResponse(TimeRecord.findOneAndRemove({_id: timeRecordID, owner: userID}))

const editUserTimeRecord = ({timeRecordInput, timeRecordID, userID}) => prepareResponse(TimeRecord.findOneAndUpdate({_id: timeRecordID, owner: userID}, timeRecordInput, {new: true}))

const editTimeRecord = ({timeRecordInput, timeRecordID}) => prepareResponse(TimeRecord.findOneAndUpdate({_id: timeRecordID}, timeRecordInput, {new: true}))

const dbModelToLogic = ({name, timeElapsed, _id, startDate, endDate}) => ({name, timeElapsed, id: _id, startDate, endDate})
const dbModelsToLogic = (tasks) => tasks.map(t => dbModelToLogic(t))

export default {listTimeRecords, createTimeRecord, editUserTimeRecord, removeTimeRecord, removeUserTimeRecord, editTimeRecord, listUserTimeRecords}