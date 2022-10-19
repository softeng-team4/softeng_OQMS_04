'use strict';

const sqlite = require('sqlite3');

class CounterDAO{

    constructor(dbname) {
        this.db = new sqlite.Database(dbname, (err) => {
            if (err) throw err;
        })
        this.newCountersTable();
    }

    newCountersTable = () =>{
        return new Promise((resolve,reject) =>{
            const sql = 'CREATE TABLE IF NOT EXISTS counters (id INTEGER PRIMARY KEY, open INTEGER NOT NULL);';
            this.db.run(sql,(err) =>{
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);

            })
        })
    }

    // getOpenCounters = () => {
    //     return new Promise((resolve,reject) =>{
    //         const sql = 'SELECT id FROM counters where open=1';
    //         this.db.all(sql,[service],(err,row) =>{
    //             if(err)
    //                 reject(err);
    //             else
    //                 resolve(row);
    //         })
    //     })
    // }

    addCounter = () =>{
        return new Promise((resolve,reject)=>{
            const sql = 'INSERT INTO counters(open) VALUES(1);';
            this.db.run(sql,(err)=>{
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);
            })
        })
    }

    deleteAllCounters = () =>{
        return new Promise((resolve,reject) =>{
            const sql = 'DELETE FROM counters;';
            this.db.get(sql,(err) =>{
                if(err)
                    reject(err);
                else
                    resolve();
            })
        })
    }

}

module.exports = CounterDAO