import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

class StackedColumnChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
          },
        },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "62pt",
            // endingShape: "rounded",
          },
        },

        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "18 Jan",
            "19 Jan",
            "20 Jan",
            "21 Jan",
            "22 Jan",
            "23 Jan",
            "24 Jan",
            "25 Jan",
            "26 Jan",
            "27 Jan",
            "28 Jan",
            "29 Jan",
            // "Jan",
            // "Feb",
            // "Mar",
            // "Apr",
            // "May",
            // "Jun",
            // "Jul",
            // "Aug",
            // "Sep",
            // "Oct",
            // "Nov",
            // "Dec",
          ],
        },
        colors: ["#556ee6", "#f1b44c", "#008F8A"],
        legend: {
          position: "bottom",
        },
        fill: {
          opacity: 1,
        },
      },
      series: [
        {
          name: "Submitted",
          data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
        },
        {
          name: "Not Submitted",
          data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
        },
        {
          name: "Late Submission",
          data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
        },
      ],
    }
  }

  render() {
    return (
      <React.Fragment>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="359"
        />
      </React.Fragment>
    )
  }
}

export default StackedColumnChart
