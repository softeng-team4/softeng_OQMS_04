const TicketDAO = require('../dao/TicketDAO')
const ticketDao = new TicketDAO("office.db");

//TEST SUITE getQueue
describe('getQueue', () => {

    // TEST CASE exists
    test('Queue', async () => {
        const sampleQueue = {
            "id": 1,
        };
        let queue = await ticketDao.getQueue(1);
        expect(queue[0].id).toStrictEqual(sampleQueue.id);

    });

    // TEST CASE not exists
    test('not existing Queue', async () => {
        let result = await ticketDao.getQueue(0);
        expect(result[0]).toStrictEqual(undefined);
        result = await ticketDao.getQueue(Number.MAX_VALUE);
        expect(result[0]).toStrictEqual(undefined);
    });

});

//TEST SUITE getQueueLength
describe('getQueueLength', () => {

    // TEST CASE exists
    test('QueueLength', async () => {
        const sampleQueueLength = 5;
        let queue = await ticketDao.getQueueLength(1);
        expect(queue).toStrictEqual(sampleQueueLength);

    });

    // TEST CASE not exists
    test('not existing Queue', async () => {
        let result = await ticketDao.getQueueLength(0);
        expect(result).toStrictEqual(0);
        result = await ticketDao.getQueueLength(Number.MAX_VALUE);
        expect(result).toStrictEqual(0);
    });

});
