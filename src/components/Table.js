import React, { Component } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Styles.css';
import packageJson from '../../package.json';


// function App() {
//   return (
//     <div className="App">
//     Ajay Babu
//     </div>
//   );
// }
let gridAPI;
class Table extends Component
{

  constructor(props)
  {
    super(props);
     
    this.state={
      gridOptions:{
        defaultColDef: {
            sortable:true,
            flex:1,
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            rowDrag:true,
            autoHeight: true,
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200
            }
      },
       // enables pagination in the grid
    pagination: true,

    // sets 10 rows per page (default is 100)
    paginationPageSize: 50,
      columnDefs:[
        {headerName:'ID',field:'id'},
        {headerName:'Name',field:'name'},
        {headerName:'Email',field:'email'},
        {headerName:'Body',field:'body'}
      ]      
    }
    };

  }
  onGridReady(params) {
    fetch(packageJson.apiURL).then(resp=>resp.json()).then(resp=>{
        params.api.applyTransaction({add:resp})
    })
    gridAPI=params.api;
  }
  onExportClick(params) {
    gridAPI.exportDataAsCsv();
  }
  onPageSizeChanged = (newPageSize) => {
    var value = document.getElementById('page-size').value;
    gridAPI.paginationSetPageSize(Number(value));
  };
  handleQuickFilter = (event,params) => {
    gridAPI.setQuickFilter(event.target.value);
  };
  render()
  {
    return(
        <div className="tableDIV" style={{height:'100%'}}>
        <div style={{display:'flex'}}>
        <button className="exportBtnCSV" onClick={this.onExportClick}>ExportToCSV</button>
          <label className="pageLbl">Page Size:</label>
          <select onChange={() =>this.onPageSizeChanged()} id="page-size">
            <option value="10" >
              10
            </option>
            <option value="50" selected="true">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
          <label className="pageLbl">Quick Filter:</label>
                <input
        type="text"
        placeholder="Quick Filter"
        onChange={this.handleQuickFilter}
      />
        </div>
       <div className='ag-theme-balham' style={{height:'100%'}}>
       
         <AgGridReact 
         columnDefs={this.state.columnDefs} 
         //rowData={this.state.rowData}
         gridOptions={this.state.gridOptions}
         rowSelection="multiple"
         animateRows={true} 
         rowDragManaged="true"
         detailRowAutoHeight={true}
         paginationNumberFormatter={function (params) {
          return '[' + params.value.toLocaleString() + ']';
        }}
         onGridReady={this.onGridReady}
/> 
       </div>
       </div>
    )
  }
} 

export default Table;
