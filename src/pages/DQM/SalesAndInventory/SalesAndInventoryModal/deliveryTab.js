import React, { Component } from 'react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
export default class DeliveryTab extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

    componentWillUnmount() {

    }

    // Prototype methods, Bind in Constructor (ES2015)
    handleEvent() { }

    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }

    render() {
        return (
            <>
                <b>Past Delivery</b>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th><b>DATE</b><Tooltip title="1 week historical data"><InfoOutlinedIcon /></Tooltip></th>
                            <th><b>VOLUME (L)</b><Tooltip title="1 week historical data"><InfoOutlinedIcon /></Tooltip></th>
                            <th><b>VOLUME ADJUSTMENT (L)</b><Tooltip title="1 week historical data taken from Yesterday Delivery Adjustment (L)"><InfoOutlinedIcon /></Tooltip></th>
                            <th><b>TOTAL DELIVERY (L)</b><Tooltip title="1 week historical data taken Total Delivery = Past Delivery Volume + Past Delivery Volume Adjustment"><InfoOutlinedIcon /></Tooltip></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>25 apr 2021</td>
                            <td>1000</td>
                            <td>900</td>
                            <td>1900</td>
                        </tr>
                        <tr>
                            <td>25 apr 2021</td>
                            <td>1000</td>
                            <td>900</td>
                            <td>1900</td>
                        </tr>
                        <tr>
                            <td>25 apr 2021</td>
                            <td>1000</td>
                            <td>900</td>
                            <td>1900</td>
                        </tr>
                        <tr>
                            <td>25 apr 2021</td>
                            <td>1000</td>
                            <td>900</td>
                            <td>1900</td>
                        </tr>
                        <tr>
                            <td>25 apr 2021</td>
                            <td>1000</td>
                            <td>900</td>
                            <td>1900</td>
                        </tr>

                    </tbody>
                </table>
            </>
        )
    }
}
