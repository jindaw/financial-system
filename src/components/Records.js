import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import AmountBox from "./AmountBox";
import * as AppAPI from '../utils/AppAPI';

class Records extends Component {
  constructor(){
    super();
    this.state = {
      error:null,
      isLoaded:false,
      records:[]
    }
  }

  componentDidMount(){
    AppAPI.getAll().then(
      response=>this.setState({
        records:response.data,
        isLoaded:true
      })).catch(
        error => this.setState({
          isLoaded: true,
          error: error
        })
      );
  }
  handleNewRecord(record){
    console.log(record);
    this.setState({
      error:null,
      isLoaded:true,
      records:[
        ...this.state.records,
        record
      ]
    });
  }
  updateRecord(record, data){
    const recordIndex = this.state.records.indexOf(record);
    const newRecord = this.state.records.map((item, index)=>{
      if (index !== recordIndex) {
        return item;
      }
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records:newRecord
    });
  }

  deleteRecord(record){
    const recordIndex = this.state.records.indexOf(record);
    console.log(record, recordIndex);
    const newRecord = this.state.records.filter((item, index) => index !== recordIndex);
    this.setState({
      records: newRecord
    });
  }
  credits(){
    let credits = this.state.records.filter((record)=>{
      return record.amount >= 0;
    })
    return credits.reduce(((prev, curr)=>{
      return prev + Number.parseInt(curr.amount, 0);
    }), 0);
  }
  debit(){
    let credits = this.state.records.filter((record)=> {
      return record.amount < 0;
    })
    return credits.reduce(((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }), 0);
  }
  balance(){
    return this.state.records.reduce(((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }), 0);
  }

  render() {
    const {error, isLoaded, records} = this.state;
    let recordsComponent;

    if (error) {
      recordsComponent = <div>Error:{error.message}</div>;
    }else if(!isLoaded)
    {
      recordsComponent = <div>Loading...</div>
    }else{
      recordsComponent = (
        <div className="Records">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => 
              (<Record key={record.id} 
                      record={record} 
                      handleEditRecord={this.updateRecord.bind(this)}
                      handleDeleteRecord={this.deleteRecord.bind(this)}
              />))}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.credits()}/>
          <AmountBox text="Debit" type="danger" amount={this.debit()}/>
          <AmountBox text="Balance" type="info" amount={this.balance()}/>
        </div>
        <RecordForm handleNewRecord={this.handleNewRecord.bind(this)}/>
        {recordsComponent}
      </div>
    );
  }
}

export default Records;
