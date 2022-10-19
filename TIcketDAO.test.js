const TicketDAO = require('./server/dao/TicketDAO')
const ticketDao = new TicketDAO("office.db");

//TEST SUITE getQueue
describe('getQueue', () => {

    // TEST CASE exists
    test('Queue', async () => {
        const samplePosition = {
            "id": 1,
        };
        let queue = await ticketDao.getQueue(1);
        expect(queue[0].id).toStrictEqual(samplePosition.id);

    });

    // TEST CASE not exists
    test('not existing Queue', async () => {
        let result = await ticketDao.getQueue(0);
        expect(result[0]).toStrictEqual(undefined);
        result = await ticketDao.getQueue(Number.MAX_VALUE);
        expect(result[0]).toStrictEqual(undefined);
    });

});
