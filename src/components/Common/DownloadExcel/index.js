import React, { Component, Fragment } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { removeKeywords, isValidDate } from '../../../pages/DQM/Common/helper';

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
                if(item.terminal_operating_days_value) {
                    item.terminal_operating_days_value = removeKeywords(item.terminal_operating_days_value);
                }
                if(item.temporary_product_date_range) {
                    item.temporary_product_date_range = removeKeywords(item.temporary_product_date_range);
                }
                if(item.inactive_date_range_value) {
                    item.inactive_date_range_value = removeKeywords(item.inactive_date_range_value);
                } 
                if(item.no_delivery_interval_1_value) {
                    item.no_delivery_interval_1_value = removeKeywords(item.no_delivery_interval_1_value);
                } 
                if(item.no_delivery_interval_2_value) {
                    item.no_delivery_interval_2_value = removeKeywords(item.no_delivery_interval_2_value);
                } 
                if(item.no_delivery_interval_3_value) {
                    item.no_delivery_interval_3_value = removeKeywords(item.no_delivery_interval_3_value);
                } 
                if(item.no_delivery_interval_4_value) {
                    item.no_delivery_interval_4_value = removeKeywords(item.no_delivery_interval_4_value);
                } 
                if(item.actual_open_time_1_value) {
                    item.actual_open_time_1_value = (item.actual_open_time_1_value).join(',');
                } 
                if(item.actual_open_time_2_value) {
                    item.actual_open_time_2_value = removeKeywords(item.actual_open_time_2_value);
                } 
                if(item.actual_open_time_3_value) {
                    item.actual_open_time_3_value = removeKeywords(item.actual_open_time_3_value);
                } 
                if(item.no_delivery_interval_3_value) {
                    item.no_delivery_interval_3_value = removeKeywords(item.no_delivery_interval_3_value);
                } 
                if(item.no_delivery_interval_4_value) {
                    item.no_delivery_interval_4_value = removeKeywords(item.no_delivery_interval_4_value);
                } 
                if(item.no_delivery_interval_5_value) {
                    item.no_delivery_interval_5_value = removeKeywords(item.no_delivery_interval_5_value);
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