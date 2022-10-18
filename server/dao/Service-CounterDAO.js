'use strict';

const sqlite = require('sqlite3');

class ServiceCounterDAO{

    constructor(dbname) {
        this.db = new sqlite.Database(dbname, (err) => {
            if (err) throw err;
        })
        this.newServiceCounterTable();
    }

    newServiceCounterTable = () =>{
        return new Promise((resolve,reject) =>{
            const sql = 'CREATE TABLE IF NOT EXISTS service_counter (id INTEGER PRIMARY KEY AUTOINCREMENT, serviceId INTEGER NOT NULL, counterId INTEGER NOT NULL);';
            this.db.run(sql,(err) =>{
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);

            })
        })
    }

    getNServicesCountersWService = (service) =>{
        return new Promise((resolve,reject) =>{
            const sql = 'SELECT COUNT(*) as N FROM service_counter WHERE serviceId = ? GROUP BY counterId;';
            this.db.all(sql,[service],(err,rows) =>{
                if(err)
                    reject(err);
                else{
                    let counts = [];
                    for(let row of rows)
                        counts.push(row.N);
                    resolve(counts);
                }
            })
        })
    }

}

module.exports = ServiceCounterDAO;