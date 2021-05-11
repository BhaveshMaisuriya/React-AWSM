import Highcharts from 'highcharts/highcharts-gantt'

import HighchartsReact from 'highcharts-react-official'


import React, { Component } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
// Set to 00:00:00:000 today
var today = new Date(),
    day = 1000 * 60 * 60 * 24,
    map = Highcharts.map,
    dateFormat = Highcharts.dateFormat,
    series,
    cars;

// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
today = today.getTime();

cars = [{
    model: 'SW 5662',
    current: 0,
    deals: [{
        rentedTo: 'PDB M',
        from: today - 1 * day,
        to: today + 2 * day
    }, {
        rentedTo: 'PDB KV',
        from: today - 3 * day,
        to: today - 2 * day
    }, {
        rentedTo: 'GELANG',
        from: today + 5 * day,
        to: today + 6 * day
    }]
}, {
    model: 'SD 5663P',
    current: 0,
    deals: [{
        rentedTo: 'PDB M',
        from: today - 2 * day,
        to: today + 1 * day
    }, {
        rentedTo: 'PDB KV',
        from: today - 2 * day,
        to: today + 1 * day
    }, {
        rentedTo: 'GELANG',
        from: today + 2 * day,
        to: today + 6 * day
    }]
}, {
    model: 'SK 5660B',
    current: 0,
    deals: [{
        rentedTo: 'RO',
        from: today + 0 * day,
        to: today + 3 * day
    }, {
        rentedTo: 'PDB M',
        from: today + 3 * day,
        to: today + 4 * day
    }, {
        rentedTo: 'PDB KV',
        from: today + 6 * day,
        to: today + 8 * day
    }]
}, {
    model: 'SW 8767',
    current: 0,
    deals: [{
        rentedTo: 'PDB KV',
        from: today - 1 * day,
        to: today + 1 * day
    }, {
        rentedTo: 'PDB KV',
        from: today - 3 * day,
        to: today - 2 * day
    }, {
        rentedTo: 'PDB KV',
        from: today + 2 * day,
        to: today + 3 * day
    }]
}, {
    model: 'PJ 208',
    current: 0,
    deals: [{
        rentedTo: 'PDB KV',
        from: today - 1 * day,
        to: today + 2 * day
    }, {
        rentedTo: 'PDB KV',
        from: today + 3 * day,
        to: today + 4 * day
    }, {
        rentedTo: 'PDB KV',
        from: today + 5 * day,
        to: today + 6 * day
    }]
}];

// Parse car data into series.
series = cars.map(function (car, i) {
    var data = car.deals.map(function (deal) {
        return {
            id: 'deal-' + i,
            rentedTo: deal.rentedTo,
            start: deal.from,
            end: deal.to,
            y: i
        };
    });
    return {
        name: car.model,
        data: data,
        current: car.deals[car.current]
    };
});
const options = {
    title: {
        text: 'Schedule Optimisation List'
    },
        series,
        tooltip: {
          pointFormat: '<span>: {point.rentedTo}</span><br/><span>From: {point.start:%e. %b}</span><br/><span>To: {point.end:%e. %b}</span>'
      },
      xAxis: {
          currentDateIndicator: true
      },
      yAxis: {
          type: 'category',
          grid: {
              columns: [{
                  title: {
                      text: 'Name'
                  },
                  categories: map(series, function (s) {
                      return s.name;
                  })
              }, {
                  title: {
                      text: 'Product'
                  },
                  categories: map(series, function (s) {
                      return s.current.rentedTo;
                  })
              }, {
                  title: {
                      text: 'From'
                  },
                  categories: map(series, function (s) {
                      return dateFormat('%e. %b', s.current.from);
                  })
              }, {
                  title: {
                      text: 'To'
                  },
                  categories: map(series, function (s) {
                      return dateFormat('%e. %b', s.current.to);
                  })
              }]
          }
      }
    // series: [{
    //     name: 'Product 1',
    //     data: [{
    //     		id: 's',
    //         name: 'SW 5670',
    //         start: Date.UTC(2014, 10, 18),
    //         end: Date.UTC(2014, 10, 20)
    //     }, {
    //     		id: 'b',
    //         name: 'SK 55688',
    //         start: Date.UTC(2014, 10, 20),
    //         end: Date.UTC(2014, 10, 25),
    //         // dependency: 's'
    //     }, {
    //     		id: 'a',
    //         name: 'QS 5587J',
    //         start: Date.UTC(2014, 10, 23),
    //         end: Date.UTC(2014, 10, 26)
    //     }, {
    //         name: 'STA 5855A',
    //         start: Date.UTC(2014, 10, 27),
    //         end: Date.UTC(2014, 10, 29),
    //         // dependency: ['a', 'b']
    //     }]
    // }]
}

class HighCharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }


  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={'AWSM'}
              breadcrumbItem={'HighCharts'}
            />
              <HighchartsReact
    highcharts={Highcharts}
    constructorType={'ganttChart'}

    options={options}
  />
        </Container>
      </div>
      </React.Fragment>
    )
  }
}

export default HighCharts
