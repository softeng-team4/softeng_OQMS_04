'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

class TicketDAO{

    constructor(dbname) {
        this.db = new sqlite.Database(dbname, (err) => {
            if (err) throw err;
        })
        this.newTicketsTable();
    }

    newTicketsTable = () =>{
        return new Promise((resolve,reject) =>{
            const sql = 'CREATE TABLE IF NOT EXISTS tickets (service INTEGER, num INTEGER, date TEXT, exp_waitTime TEXT NOT NULL, completed INTEGER NOT NULL, act_waitTime TEXT NOT NULL, counter_id INTEGER, PRIMARY KEY(service,num));';
            this.db.run(sql,(err) =>{
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);

            })
        })
    }

    getLastTicket = (service) =>{
        return new Promise((resolve,reject) =>{
            const sql = 'SELECT MAX(num) FROM tickets WHERE service=?;';
            this.db.get(sql,[service],(err,row) =>{
                if(err)
                    reject(err);
                else
                    resolve(row);
            })
        })
    }

    createTicket = (service, num, exp_waitTime) => {
        return new Promise((resolve,reject) =>{
            const sql = 'INSERT INTO tickets(service,num,date,exp_waitTime,completed) VALUES(?,?,?,?,0);';
            this.db.run(sql,[service,num,dayjs().toISOString(),exp_waitTime],(err) =>{
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);
            })
        })
    }

}

module.exports = TicketDAO