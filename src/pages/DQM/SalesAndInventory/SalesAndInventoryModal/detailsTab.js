import React, { Component } from 'react'

export default class DetailsTab extends Component {
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
            <div>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>SHIP TO PARTY</label>
                        <input defaultValue="Eshah Filling Station"
                            className="form-control"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>PRODUCT</label>
                        <input defaultValue="Primax 95 Premeum"
                            className="form-control"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>DATA SOURCE</label>
                        <input defaultValue="Operation" className="form-control"></input>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>STATION RANK STATUS</label>
                        <input defaultValue="LV1" className="form-control"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 form-group">
                        <label>REMARKS</label>
                        <input defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus neque et rhoncus vehicula. Vestibulum ac velit rutrum" className="form-control"></input>
                    </div>
                </div>
            </div>
        )
    }
}
