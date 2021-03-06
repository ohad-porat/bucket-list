import React from "react"
import Chart from "react-google-charts"

const MyChart = ({selectedPlayers, selectedStats}) => {
  // debugger
  return (
    <div className="chart">
      <Chart
        width="700px"
        height="700px"
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["City", "2010 Population", "2000 Population", "200 pss"],
          ["New York City, NY", 8175000, 8008000, 808000],
          ["Los Angeles, CA", 3792000, 3694000, 3008000],
          ["Chicago, IL", 2695000, 2896000, 1008000],
          ["Houston, TX", 2099000, 1953000, 2008000],
          ["Philadelphia, PA", 1526000, 1517000, 4008000],
        ]}
        options={{
          title: "Population of Largest U.S. Cities",
          titleTextStyle: {color: '#c7513a'},
          textStyle:{color: '#eae7e2'},
          backgroundColor: { fill:'#2F2F2F', 'fillOpacity': 0.50 },
          chartArea: { width: "50%" },
          hAxis: {
            textStyle:{color: '#eae7e2'},
            title: "Total Population",
            minValue: 0,
          },
          vAxis: {
            textStyle:{color: '#eae7e2'},
            title: "City",
          },
        }}
        legendToggle
      />
    </div>
  )
}

export default MyChart
