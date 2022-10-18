'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');


// open the database
const db = new sqlite.Database('office.db', (err) => {
    if (err) throw err;
});


exports.currentTicket = () => {
    return new Promise((resolve, reject) => {
        const sql = 'MAX(id) AS ticket_id, counter_id FROM tickets WHERE counter_id IS NOT NULL AND completed =0 GROUP BY counter_id';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const surveys = rows.map((t) => ({ticket_id: t.ticket_id, counter_id: t.counter_id}));
            resolve(surveys);
        });
    });
};
