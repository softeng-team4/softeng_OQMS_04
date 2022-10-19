nextTicket = jest.fn()

describe("PUT /api/officer/ticket", () => {
    beforeAll(() => {
        nextTicket.mockReset()
        nextTicket.mockReturnValueOnce(
            {
                "next": 5
            }
        ).mockReturnValueOnce({})
    })

    test("success", async () => {
        let expected_result = {
            "next": 5
        }
        const req = {
            body: {
                "counter": 1,
                "served": 2
            }
        }
        const actual_result = await nextTicket(req.body.counter, req.body.served)
        expect(actual_result).toEqual(expected_result)
    })

    test("error", async () => {
        let expected_result = {}
        const req = {
            body: {
                "counter": 1,
                "served": 2
            }
        }
        const actual_result = await nextTicket(req.body.counter, req.body.served)
        expect(actual_result).toEqual(expected_result)
    })
})
