// object that contains stats data

class StatisticTuple {

    /**
     * Create a new tuple
     * @param {conterId} counterId unique identifier
     * @param {tos} tos is the type of service
     * @param {date} date could be a date in format day: dd/mm/yyyy, week: w/mm/yyyy month: mm/yyyy
     * @param {ticketNumber} ticketsNumber is the number of ticket served with the specific filter
     */

    constructor(counterId, tos, date, ticketsNumber) {
        this.counterId = counterId;
        this.tos = tos;
        this.date = date;
        this.ticketsNumber = ticketsNumber;
    }

    /**
     * Create a new tuple from a json object
     * @param {{}} json object
     * @returns {StatisticTuple} new tuple object
     */
    static from(json) {
        return new StatisticTuple(json.conterId, json.tos, json.date, json.ticketsNumber);
    }
}

export default StatisticTuple;