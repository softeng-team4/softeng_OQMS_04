'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const TicketDAO = require('../dao/TicketDAO');   
const ServiceDAO = require('../dao/ServiceDAO');
const CounterDAO = require('../dao/CounterDAO');
const ServiceCounterDAO = require('../dao/Service-CounterDAO');

chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);


describe('testing the server on the interaction with the customer',() =>{

    before(async () =>{
        
        const ticketDao = new TicketDAO("office.db");
        const serviceDao = new ServiceDAO("office.db");
        const counterDao = new CounterDAO("office.db");
        const serviceCounterDao = new ServiceCounterDAO("office.db");

        await ticketDao.deleteAllTickets();
        await serviceDao.deleteAllServices();
        await counterDao.deleteAllCounters();
        await serviceCounterDao.deleteAllServiceCounters();

        await serviceDao.addService("mailbox",10);
        await serviceDao.addService("accounts",15);
        await serviceDao.addService("transactions",20);

        await counterDao.addCounter();
        await counterDao.addCounter();
        await counterDao.addCounter();

        await serviceCounterDao.addServiceCounter(1,1);
        await serviceCounterDao.addServiceCounter(1,2);
        await serviceCounterDao.addServiceCounter(2,3);
        await serviceCounterDao.addServiceCounter(3,1);
    })

    ticketTest(1,1,5);
    ticketTest(1,2,12);
    ticketTest(2,3,8);
    ticketTest(3,4,10);
    wrongTicketTest(4);
    serviceListTest([{id:1, name: "mailbox", service_time: 10},{id:2, name: "accounts", service_time: 15},{id:3, name: "transactions", service_time: 20}],3);
})

function ticketTest(service, expNum, expWaitTime){
    it("Customer getting a ticket for service " + service,function(done){
        agent.post('/api/ticket/' + service)
        .then(function(res){
            res.should.have.status(201);
            res.body.num.should.equal(expNum);
            res.body.waitTime.should.equal(expWaitTime);
        })
        .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}

function wrongTicketTest(service){
    it("Customer asking for non-existent service " + service,function(done){
        agent.post('/api/ticket/' + service)
        .then(function(res){
            res.should.have.status(404);
        })
        .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}

function serviceListTest(services,size){
    it("testing the service list",function(done){
        agent.get('/api/services')
        .then(function(res){
            res.should.have.status(200);
            res.body.length.should.be.eql(size);
            if(size > 0){
                for(let i=0; i < size; i++){
                    res.body[i].id.should.equal(services[i].id);
                    res.body[i].name.should.equal(services[i].name);
                    res.body[i].service_time.should.equal(services[i].service_time);
                }
            }
        })
        .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })
}