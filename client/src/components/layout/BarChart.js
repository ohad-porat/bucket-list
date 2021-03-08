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
    <div className="chart">
      <Chart
        width="900px"
        height="392px"
        chartType="BarChart"
        loader={<img src="https://i.ibb.co/X2V5Fb0/loader.gif" alt="loading" className="chart-loader" />}
        data={data}
        options={{
          backgroundColor: { fill:'#2F2F2F', 'fillOpacity': 0.50 },
          textStyle:{color: '#eae7e2'},
          chartArea: { width: "65%", height: "75%" },
          hAxis: {
            textStyle:{color: '#eae7e2'},
            titleTextStyle:{color: '#eae7e2'},
            title: "Players",
            minValue: 0,
          },
          vAxis: {
            textStyle:{color: '#eae7e2'},
            titleTextStyle:{color: '#eae7e2'},
            title: "Stats",
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
