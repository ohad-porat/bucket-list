// include all of your models here using CommonJS requires
const User = require("./User.js")
const Player = require("./Player.js")
const SeasonAverage = require("./SeasonAverage.js")
const Table = require("./Table.js")
const PlayerOfTable = require("./PlayerOfTable.js")

module.exports = { User, Player, SeasonAverage, Table, PlayerOfTable }
