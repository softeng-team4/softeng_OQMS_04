const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { beforeEach, afterEach } = require('mocha')

chai.use(chaiHttp)
chai.should()

const app = require('../server')
var agent = chai.request.agent(app)

describe("GET testDescriptor", () => {


    it('PUT /api/officer/ticket success', async () => {
        const result = await agent.put('/api/officer/ticket').set('content-type', 'application/json').send( {
                "counter":1,
                "served":2
            })        
        result.should.have.status(200)
        result.should.to.be.json
        expect(result.body).to.deep.equal(
            {
                "next":1
            }
        )
        //await agent.put(...) in order to revert to previous state
    })

    it('PUT /api/officer/ticket error', async () => {
        const result = await agent.put('/api/officer/ticket').set('content-type', 'application/json').send( {
            "count":1,
            "serve":2
        })        
        result.should.have.status(500)
        expect(result.body).to.deep.equal({})
    })

})