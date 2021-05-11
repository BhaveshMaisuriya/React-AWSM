import React, { Component } from 'react'
import { Button } from 'reactstrap';
import InformationModal from "./InformationModal";

class RoadTanker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isTableInformationVisible: false
        }
    }
   
    render() {
        const onButtonClicked=()=>{
            this.setState({isTableInformationVisible: true})
        }

        const onCancle = () =>{
            this.setState({isTableInformationVisible: false})
        }

        const { isTableInformationVisible } = this.state;

        return (
            <React.Fragment>
                <div className="page-content">
                    <div> RoadTanker </div>
                    <Button onClick={()=>onButtonClicked()}>Road Tanker</Button>
                    <InformationModal
                        visible = {isTableInformationVisible}
                        onCancle = {onCancle}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default RoadTanker