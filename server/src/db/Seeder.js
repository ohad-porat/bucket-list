/* eslint-disable no-console */
import { connection } from "../boot.js"
import StatSeeder from "./seeders/StatSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding stats")
    await StatSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
