import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as AppAPI from '../utils/AppAPI';

class Record extends Component {
    constructor(){
        super();
        this.state = {
            edit:false
        };
    }
    handleTogle(){
        this.setState({
            edit:!this.state.edit,
        });
    }
    handleEdit(event){
        event.preventDefault();
        const record = {
            date: Number.parseInt(this.refs.date.value),
            title:this.refs.title.value,
            amount: Number.parseInt(this.refs.amount.value),
        }
        AppAPI.update(this.props.record.id, record).then(
            response=>{
                this.handleTogle();
                this.props.handleEditRecord(this.props.record, response.data);
            }
        ).catch(
            error=>console.log(error.message)
        );
    }
    handleDelete(event){
        event.preventDefault();
        AppAPI.remove(this.props.record.id).then(
            response=>{
                this.props.handleDeleteRecord(this.props.record);
            }
        ).catch(
            error=>{
                console.log(error.message);
            }
        );
    }
    recordRow(){
        return (
            <tr>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleTogle.bind(this)}>Edit</button>
                    <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        );
    }
    recordForm(){
        return(
            <tr>
                <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date" /></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title" /></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.amount} ref="amount" /></td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleEdit.bind(this)}>Update</button>
                    <button className="btn btn-danger" onClick={this.handleTogle.bind(this)}>Cancel</button>
                </td>
            </tr>
        );
    }
    render() {
        if (this.state.edit) {
            return this.recordForm();
        }else{
            return this.recordRow();
        }
    }
}

export default Record;

Record.propTypes = {
    id:PropTypes.string,
    date:PropTypes.number,
    title:PropTypes.string,
    amount:PropTypes.number
}