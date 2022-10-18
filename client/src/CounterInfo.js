
class CounterInfo {
  
    constructor(ticketId, counterId) {
        this.ticketId = ticketId;
        this.counterId = counterId;
    }
  
    static from(json) {
      return new Counter(json.ticket_id, json.counter_id);
    }
  }
  
  export default CounterInfo;