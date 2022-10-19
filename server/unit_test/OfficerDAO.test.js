const OfficerDAO = require('../dao/OfficerDAO')
const officerDao = new OfficerDAO("office.db");

describe("PUT /api/officer/ticket", () => {

    test("success", async () => {
        let expected_result = 1
        let counter = 1
        let served = 2
        const actual_result = await officerDao.nextTicket(counter, served)
        expect(actual_result).toEqual(expected_result)
    })

    test("error", async () => {
        let expected_result = undefined
        let counter = "Wrong"
        let served = 2
        const actual_result = await officerDao.nextTicket(counter, served).catch((err) => {return undefined})
        expect(actual_result).toEqual(expected_result)
    })
})