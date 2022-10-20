'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');


// open the database
const db = new sqlite.Database('office.db', (err) => {
    if (err) throw err;
});


exports.currentTicket = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT MAX(id) AS ticket_id, counter_id FROM tickets WHERE counter_id IS NOT NULL AND completed =0 GROUP BY counter_id';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const cTickets = rows.map((t) => ({ticket_id: t.ticket_id, counter_id: t.counter_id}));
            resolve(cTickets);
        });
    });
};

exports.statistics = (filters) => {
    return new Promise((resolve, reject) => {
        let select = '';
        let groupby = '';
        let orderby = '';
        if(filters.day == 1){
            select += ', date AS time_period';
            groupby += 'date';
            orderby += 'date';
            
        }
        if(filters.week == 1){
            select += ', week AS time_period';
            groupby += 'week';
            orderby += 'week';
            
        }
        if(filters.month == 1){
            select += ', month AS time_period';
            groupby += 'month';
            orderby += 'month';
            
        }
        if(filters.counter == 1){
            select += ', counter_id';
            if(groupby.length > 0){
                groupby += ', counter_id';
            }else{
                groupby += 'counter_id';
            }
            if(orderby.length > 0){
                orderby += ', counter_id';
            }else{
                orderby += 'counter_id';
            }
            
        }
        if(filters.service == 1){
            select += ', services.name AS serviceName';
            if(groupby.length > 0){
                groupby += ', service';
            }else{
                groupby += 'service';
            }
            if(orderby.length > 0){
                orderby += ', service';
            }else{
                orderby += 'service';
            }
        }
        let sql = '';
        if(groupby.length >0){
            sql = 'SELECT COUNT(tickets.id) AS ticketsNumber'+select+' FROM tickets, services WHERE completed =1 AND tickets.service = services.id GROUP BY '+groupby+' ORDER BY '+orderby;
        }else{
            sql = 'SELECT COUNT(id) AS ticketsNumber'+select+' FROM tickets WHERE completed =1';
        }
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const tNumber = rows.map((t) => ({ticketsNumber: t.ticketsNumber, tos: t.serviceName === undefined ? null : t.serviceName , counterId: t.counter_id === undefined ? null : t.counter_id, date: t.time_period === undefined ? null : t.time_period}));
            resolve(tNumber);
        });
    });
};
