'use strict';

const sqlite = require('sqlite3');

class TicketDAO{

    constructor(dbname) {
        this.db = new sqlite.Database(dbname, (err) => {
            if (err) throw err;
        })
        this.newTicketsTable();
    }

    newTicketsTable = () =>{
        return new Promise((resolve,reject) =>{
            const sql = 'CREATE TABLE IF NOT EXISTS tickets (service TEXT, num INTEGER, date TEXT, exp_waitTime TEXT NOT NULL, completed INTEGER NOT NULL, act_waitTime TEXT NOT NULL, counter_id INTEGER, PRIMARY KEY(service,num));';
            this.db.run(sql,(err) =>{
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);

            })
        })
    }

}

module.exports = TicketDAO