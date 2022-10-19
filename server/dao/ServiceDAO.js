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
            const sql = 'CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY, name TEXT NOT NULL, service_time TEXT NOT NULL);';
            this.db.run(sql,(err) =>{
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);

            })
        })
    }

    getServices = () =>{
        return new Promise((resolve,reject)=>{
            const sql = 'SELECT * FROM services;';
            this.db.all(sql,(err,rows)=>{
                if(err)
                    reject(err);
                else{
                    let services = [];
                    for(let row of rows)
                        services.push({id: row.id, name: row.name, service_time: row.service_time})
                    resolve(services);
                }
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

    addService = (name,time) =>{
        return new Promise((resolve,reject)=>{
            const sql = 'INSERT INTO services(name,service_time) VALUES(?,?);';
            this.db.run(sql,[name,time],(err)=>{
                if(err)
                    reject(err);
                else
                    resolve(this.lastID);
            })
        })
    }

    deleteAllServices = () =>{
        return new Promise((resolve,reject) =>{
            const sql = 'DELETE FROM services;';
            this.db.get(sql,(err) =>{
                if(err)
                    reject(err);
                else
                    resolve();
            })
        })
    }

}

module.exports = ServiceDAO