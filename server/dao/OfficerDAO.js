'use strict';

const sqlite = require('sqlite3');

class OfficerDAO {

    constructor(dbname) {
        this.db = new sqlite.Database(dbname, (err) => {
            if (err) throw err;
        })
    }


    nextTicket = async (counter_id, ticket_id) => {
        return new Promise((resolve, reject) => {
            const sql1 = `UPDATE tickets
                        SET completed=1
                        WHERE id=${ticket_id};`
            this.db.run(sql1, (err, rows) => {
                if (err) {
                    return reject(err)
                }
                else {
                    const sql2 = `SELECT s.id, COUNT(*) as num_ticket
                                FROM service_counter AS sc, tickets AS t, services AS s
                                WHERE t.completed=0 AND sc.counterId=${counter_id} AND sc.serviceId=t.service AND sc.serviceId=s.id AND t.counter_id IS NULL
                                GROUP BY s.id
                                ORDER BY COUNT(*) DESC, s.service_time ASC`
                    this.db.get(sql2, (err, row) => {
                        if (err)
                            return reject(err)
                        else {
                            const sql3 = `SELECT id
                                FROM tickets
                                WHERE service=${row.id} AND completed=0
                                ORDER BY time ASC;`
                            this.db.get(sql3, (err, row) => {
                                if (err)
                                    return reject(err)
                                else {
                                    const sql4 = `UPDATE tickets
                                        SET counter_id=${counter_id}
                                        WHERE id=${row.id}`
                                    this.db.run(sql4, (err, none) => {
                                        if (err)
                                            return reject(err)
                                        else {
                                            return resolve(row.id)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })

        })
    }

}

module.exports = OfficerDAO