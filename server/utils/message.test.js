let expect = require('expect')
const generateMessage = require('./message')

describe('Generate Message ',()=>{
    it("should generate correct message object",()=>{
        let from = "hi",
            text = "how are you"
        message = generateMessage(from,text)
        // expect(typeof message.createdAt).to.be.a('number')
        expect(message).toMatchObject({from,text,createdAt})
    })
})