import React, { Component, Fragment } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { removeKeywords } from 'pages/DQM/Common/helper';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

class DownloadExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = async() => {
        
        const { tableData, tableName, getLoader, getAlert } = await this.props;
        if(tableData.list && tableData.list.length > 0){
            tableData.list.map((item, index) => {
                if(item.terminal_operating_days_value){
                    item.terminal_operating_days_value = removeKeywords(item.terminal_operating_days_value);
                }                          
            })
          const ws = XLSX.utils.json_to_sheet(tableData.list);
          const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
          const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          const data = new Blob([excelBuffer], {type: fileType});
          FileSaver.saveAs(data, tableName + fileExtension);
          getLoader();
        } else {
          getAlert();
          getLoader();
        }
    }

    render() { 
        return (
            <Fragment></Fragment>
        );
    }
}
 
export default DownloadExcel;