'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)

var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

class TicketDAO{

    constructor(dbname) {
        this.db = new sqlite.Database(dbname, (err) => {
            if (err) throw err;
        })
        this.newTicketsTable();
    }

    newTicketsTable = () =>{
        return new Promise((resolve,reject) =>{
            const sql = 'CREATE TABLE IF NOT EXISTS tickets (id INTEGER PRIMARY KEY AUTOINCREMENT, service INTEGER, date TEXT, time TEXT, week TEXT, month TEXT, exp_waitTime TEXT, completed INTEGER NOT NULL, act_waitTime TEXT, counter_id INTEGER);';
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

    createTicket = (service, exp_waitTime) => {
        return new Promise((resolve,reject) =>{
            const sql = 'INSERT INTO tickets(service,date,time,week,month,exp_waitTime,completed) VALUES(?,?,?,?,?,?,0); SELECT last_insert_rowid();';
            const now = dayjs();
            this.db.run(sql,[service,now.format('DD/MM/YY'),now.format('hh:mm:ss'),now.format('wo-YY'),now.format('MM/YY'),exp_waitTime],function(err){
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);
            })
        })
    }

    getQueueLength = (service) =>{
        return new Promise((resolve,reject) =>{
            const sql = 'SELECT COUNT(*) FROM tickets WHERE service = ? and completed = 0;';
            this.db.get(sql,[service],(err,row) =>{
                if(err)
                    reject(err);
                else
                    resolve(row);
            })
        })
    }

    getQueue = (service) => {
        return new Promise((resolve,reject) =>{
            const sql = 'SELECT id FROM tickets WHERE service = ? and completed = 0;';
            this.db.all(sql,[service],(err,row) =>{
                if(err)
                    reject(err);
                else
                    resolve(row);
            })
        })
    }

}

module.exports = TicketDAO