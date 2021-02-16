import { Stat } from "../models/index.js"

const findStatAndRelateToTable = async (stat, table) => {
  let currentStat = await Stat.query().where({value: stat})
  await table.$relatedQuery("stats").relate(currentStat)
}

export default findStatAndRelateToTable
