import React from "react"
import Chart from "react-google-charts"

const BarChart = ({selectedPlayers, selectedStats}) => {
  let data = [["Stats"]]
  selectedStats.forEach((stat) => {
    data[0].push(stat.abbreviation)
  });
  
    selectedPlayers.forEach((player, stats = selectedStats) => {
      let playerArray =[`${player.player.first_name} ${player.player.last_name}, ${player.season}`]
      for (let i = 0; i < selectedStats.length; i++) {
        playerArray.push(player[selectedStats[i].value])
      }
      data.push(playerArray)
    });

  return (
    <div className="chart medium-12 cell">
      <Chart
        width="980px"
        height="392px"
        chartType="BarChart"
        loader={<img src="https://i.ibb.co/X2V5Fb0/loader.gif" alt="loading" className="chart-loader" />}
        data={data}
        options={{
          backgroundColor: { fill:'transparent' },
          textStyle:{color: '#eae7e2'},
          chartArea: { width: "65%", height: "75%" },
          hAxis: {
            textStyle:{color: '#eae7e2'},
            titleTextStyle:{color: '#eae7e2'},
            title: "Stats",
            minValue: 0,
          },
          vAxis: {
            textStyle:{color: '#eae7e2'},
            titleTextStyle:{color: '#eae7e2'},
            title: "Players",
          },
          legend: {
            textStyle:{color: '#eae7e2'},
          }
        }}
        legendToggle
      />
    </div>
  )
}

export default BarChart
