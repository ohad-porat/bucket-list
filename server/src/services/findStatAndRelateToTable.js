import { Stat } from "../models/index.js"

const findStatAndRelateToTable = async (stat, table) => {
  let currentStat = await Stat.query().where({ id: stat.id })
  await table.$relatedQuery("stats").relate(currentStat)
}

export default findStatAndRelateToTable
