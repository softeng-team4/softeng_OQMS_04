'use strict';

const { db } = require('../db');

exports.nextTicket = (counter_id, ticket_id) => {
    /*select the first number from the longest queue among those
    corresponding to the service types the counter can handle. If two or more queues have the same length, the queue
    associated with request type having the lowest service time is selected.*/
    return new Promise((resolve, reject) => {
        const sql1 = `UPDATE ticket 
                    SET completed=true
                    WHERE ticket_id=${ticket_id};`
        db.run(sql1, (err, rows) => {
          if (err) 
            return reject(err)
        })
        const sql2 = `SELECT service_id, COUNT(*) as num_ticket
                    FROM ser_count, ticket
                    WHERE counter_id=${counter_id} AND ser_count.service_id=ticket.service_id
                    GROUP BY service_id
                    ORDER BY COUNT(*) DESC, service_time ASC;`
        const service_id = db.get(sql2, (err, row) => {
            if (err)
                return reject(err)
            else return row.service_id;
        })
        const sql3 = `SELECT ticket_id
                    FROM ticket
                    WHERE service_id=${service_id}
                    ORDER BY date ASC;`
        db.get(sql3, (err, row) => {
            if (err)
                return reject(err)
            else return resolve(row);
        })
    })
 }