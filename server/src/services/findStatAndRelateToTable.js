import { Stat } from "../models/index.js"

const findStatAndRelateToTable = async (stat, table) => {
  debugger
  let currentStat = await Stat.query().where({ id: stat.id })
  debugger
  await table.$relatedQuery("stats").relate(currentStat)
}

export default findStatAndRelateToTable
