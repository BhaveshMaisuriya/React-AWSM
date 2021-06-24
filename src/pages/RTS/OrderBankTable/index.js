import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from "../../../components/Common/DataTable/filter"
import { tableColumns, tableMapping, tempData } from './tableMapping'
import { CustomInput } from 'reactstrap';
import MoreVertIcon from "@material-ui/icons/MoreVert"
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import "./index.scss"

class index extends Component {
    constructor(props) {
        super(props);
        this.state={
            fixedHeaders:['id'],
            filterData:{}
        }
    }

    headerTableConfiguration = () =>{
        const { fixedHeaders,filterData } = this.state
        return tableColumns.map((v)=>{
            return (<th>{tableMapping[v].label.toUpperCase()} <Filter dataFilter={filterData} dataKey={fixedHeaders[0]}/></th>)
        })
    }

    bodyTableConfiguration = (data) =>{
        return tableColumns.map((v)=>{
            let typeOfColumn = tableMapping[v].type
            switch (typeOfColumn) {
                case "priority_type":
                    return <td>{data[v] && data[v].map((e)=>{
                        return (<span className={`circle ${e}`}>{e}</span>)})}
                            </td>
                case "dn_status":
                    return <td>{data[v] && data[v].map((e)=>{
                        return (<span className={`status ${e}`}>{e}</span>)})}
                            </td>
                default:
                    return <td>{data[v]}</td>;
            }
        })
    }

    DataOfTableFixed = () =>{
        return ['1','2','3','4','5','6','7'].map((v)=><tr><td>
        <DragIndicatorIcon 
         style={{ color: "#D9D9D9" }}
        />
        <IconButton
          color="primary"
          aria-label="Setting"
          component="span"
          className="setting_icon"
          fontSize="large"
          style={{ color: "rgba(0,0,0,0.5)" }}
          aria-haspopup="true"
        //   onClick={settingClick}
        > 
        <MoreVertIcon />
       </IconButton>{<CustomInput type="checkbox" id={`customRadio${v}`} name={`customRadio${v}`} />}</td></tr>)
    }

    render() {
        return (
            <div className="rts-table-container">
            <div className="container" style={{ maxWidth: "100%" }}>
                <table className="fixed">
                    <thead>
                        <tr><th> <CustomInput type="checkbox" id="customRadio" name="customRadio" /></th></tr>
                    </thead>
                    <tbody>
                       {this.DataOfTableFixed()}
                    </tbody>
                </table>
                <div className="scroll">
                    <table className="scrollable">
                    <thead>
                        <tr>{this.headerTableConfiguration()}</tr>
                    </thead>
                    <tbody>
                        { tempData.map((v)=>{
                            return <tr>{this.bodyTableConfiguration(v)}</tr>
                        }) }
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        );
    }
}

index.propTypes = {

};

export default index;