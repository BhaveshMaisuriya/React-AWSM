import React, { Component } from 'react'

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
                <h6>Past Delivery</h6>
                <table className="table">
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>VOLUME (L)</th>
                            <th>VOLUME ADJUSTMENT (L)</th>
                            <th>TOTAL DELIVERY (L)</th>
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
