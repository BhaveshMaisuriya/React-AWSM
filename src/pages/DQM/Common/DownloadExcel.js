import React, { Component, Fragment } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

class DownloadExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = async() => {
        console.log("downloadData::nm");
        const { tableData, tableName, getLoader, getAlert } = await this.props;
        console.log("downloadData::n", tableData)
        if(tableData.list && tableData.list.length > 0){
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