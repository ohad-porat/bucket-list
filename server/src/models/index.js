// include all of your models here using CommonJS requires
const User = require("./User.js")
const Player = require("./Player.js")
const SeasonAverage = require("./SeasonAverage.js")
const Table = require("./Table.js")
const SeasonOfTable = require("./SeasonOfTable.js")

module.exports = { User, Player, SeasonAverage, Table, SeasonOfTable }
