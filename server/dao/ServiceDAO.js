'use strict';

const sqlite = require('sqlite3');

class ServiceDAO{

    constructor(dbname) {
        this.db = new sqlite.Database(dbname, (err) => {
            if (err) throw err;
        })
        this.newServicesTable();
    }

    newServicesTable = () =>{
        return new Promise((resolve,reject) =>{
            const sql = 'CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, service_time TEXT NOT NULL);';
            this.db.run(sql,(err) =>{
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);

            })
        })
    }

    getService = (id) =>{
        return new Promise((resolve,reject)=>{
            const sql = 'SELECT * FROM services WHERE id = ?;';
            this.db.get(sql,[id],(err,row)=>{
                if(err)
                    reject(err);
                else
                    resolve(row);
            })
        })
    }

}

module.exports = ServiceDAO