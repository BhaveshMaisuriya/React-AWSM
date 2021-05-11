import React, { Component } from "react"
import { Radar } from "react-chartjs-2"

class RadarChart extends Component {
  render() {
    const data = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running",
      ],
      datasets: [
        {
          label: "Desktops",
          backgroundColor: "rgba(52, 195, 143, 0.2)",
          borderColor: "#008F8A",
          pointBackgroundColor: "#008F8A",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#008F8A",
          data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
          label: "Tablets",
          backgroundColor: "rgba(85, 110, 230, 0.2)",
          borderColor: "#556ee6",
          pointBackgroundColor: "#556ee6",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#556ee6",
          data: [28, 48, 40, 19, 96, 27, 100],
        },
      ],
    }

    return (
      <React.Fragment>
        <Radar width={474} height={300} data={data} />
      </React.Fragment>
    )
  }
}

export default RadarChart
