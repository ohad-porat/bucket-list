import React from "react"
import Chart from "react-google-charts"

const BarChart = ({ selectedPlayers, selectedStats }) => {
  let data = [["Players"]]

  selectedPlayers.forEach((player) => {
    data[0].push(
      `${player.player.first_name} ${player.player.last_name}, ${player.season}`
    )
  })

  selectedStats.forEach((stat, players = selectedPlayers) => {
    let statArray = [stat.abbreviation]
    for (let i = 0; i < selectedPlayers.length; i++) {
      statArray.push(selectedPlayers[i][stat.value])
    }
    data.push(statArray)
  })

  return (
    <div className="chart medium-12 cell">
      <Chart
        width="980px"
        height="392px"
        chartType="BarChart"
        loader={
          <img
            src="https://i.ibb.co/X2V5Fb0/loader.gif"
            alt="loading"
            className="chart-loader"
          />
        }
        data={data}
        options={{
          backgroundColor: { fill: "transparent" },
          textStyle: { color: "#eae7e2" },
          chartArea: { width: "65%", height: "75%" },
          hAxis: {
            textStyle: { color: "#eae7e2" },
            titleTextStyle: { color: "#eae7e2" },
            title: "Stats",
            minValue: 0,
          },
          vAxis: {
            textStyle: { color: "#eae7e2" },
            titleTextStyle: { color: "#eae7e2" },
            title: "Players",
          },
          legend: {
            textStyle: { color: "#eae7e2" },
          },
        }}
        legendToggle
      />
    </div>
  )
}

export default BarChart
