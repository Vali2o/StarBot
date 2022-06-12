const mongoose = require("mongoose");

const TicketDataSchema = new mongoose.Schema({
    MessageID: String,
    GuildID: String,
    TicketNumber: String,
    WhitelistedRole: String
})

const MessageModel = module.exports = mongoose.model('StarBot-Tickets', TicketDataSchema)