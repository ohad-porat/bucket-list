import React from "react"
import Chart from "react-google-charts"

const BarChart = ({selectedPlayers, selectedStats}) => {
  debugger
  let data = [["Stats"]]
  selectedStats.forEach((stat) => {
    data[0].push(stat.abbreviation)
  });
  
  if (selectedPlayers[0].first_name !== undefined) {
    selectedPlayers.forEach((player, stats = selectedStats) => {
      let playerArray =[`${player.first_name} ${player.last_name}, ${player.stats.season}`]
      for (let i = 0; i < selectedStats.length; i++) {
        playerArray.push(player.stats[selectedStats[i].value])
      }
      data.push(playerArray)
    });
  } else {
    selectedPlayers.forEach((player, stats = selectedStats) => {
      let playerArray =[`${player.player.first_name} ${player.player.last_name}, ${player.season}`]
      for (let i = 0; i < selectedStats.length; i++) {
        playerArray.push(player[selectedStats[i].value])
      }
      data.push(playerArray)
    });
  }

  return (
    <div className="chart">
      <Chart
        width="700px"
        height="700px"
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          backgroundColor: { fill:'#2F2F2F', 'fillOpacity': 0.50 },
          chartArea: { width: "50%" },
          hAxis: {
            textStyle:{color: '#eae7e2'},
            title: "Players",
            minValue: 0,
          },
          vAxis: {
            textStyle:{color: '#eae7e2'},
            title: "Stats",
          },
        }}
        legendToggle
      />
    </div>
  )
}

export default BarChart
