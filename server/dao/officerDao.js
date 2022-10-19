'use strict';

const { db } = require('../db');

exports.nextTicket = async (counter_id, ticket_id) => {
    console.log(`entering dao with counter ${counter_id} and ticket ${ticket_id}`)
    /*select the first number from the longest queue among those
    corresponding to the service types the counter can handle. If two or more queues have the same length, the queue
    associated with request type having the lowest service time is selected.*/
    return new Promise((resolve, reject) => {
        console.log("first query")
        const sql1 = `UPDATE tickets
                    SET completed=1
                    WHERE id=${ticket_id};`
        db.run(sql1, (err, rows) => {
            if (err)
                return reject(err)
            else console.log("First query success")
        })
        console.log("second query");
        const sql2 = `SELECT s.id, COUNT(*) as num_ticket
                    FROM service_counter AS sc, tickets AS t, services AS s
                    WHERE t.completed=0 AND sc.counterId=${counter_id} AND sc.serviceId=t.service AND sc.serviceId=s.id
                    GROUP BY s.id
                    ORDER BY COUNT(*) DESC, s.service_time ASC`
        db.get(sql2, (err, row) => {
            if (err)
                return reject(err)
            else {
                console.log("second query success")
                console.log(`service id: ${row.id}`)
                console.log("third query")
                const sql3 = `SELECT id
                    FROM tickets
                    WHERE service=${row.id} AND completed=0
                    ORDER BY time ASC;`
                db.get(sql3, (err, row) => {
                    if (err)
                        return reject(err)
                    else {
                        console.log("third query success")
                        console.log(`next_ticket: ${row.id}`)
                        console.log("fourth query")
                        const sql4 = `UPDATE tickets
                            SET counter_id=${counter_id}
                            WHERE id=${row.id}`
                        db.run(sql4, (err, none) => {
                            if (err)
                                return reject(err)
                            else {
                                console.log("fourth query success")
                                return resolve(row.id)
                            }
                        })
                    }
                })
            }
        })
    })
}