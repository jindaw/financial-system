import React, { Component } from 'react';
import * as AppAPI from '../utils/AppAPI';

class RecordForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            date:"",
            title:"",
            amount:""
        }
    }
    valid(){
        return this.state.date && this.state.title && this.state.amount;
    }
    handleChange(event){
        let name, obj;
        name = event.target.name;
        this.setState((
            obj={},
            obj[""+name] = event.target.value,
            obj
        ));
    }
    handleSubmit(event){
        event.preventDefault();
        AppAPI.create({
            date: Number.parseInt(this.state.date, 0), 
            title:this.state.title,
            amount: Number.parseInt(this.state.amount, 0)
        }).then(
            response=>{
                this.props.handleNewRecord(response.data);
            }
        ).catch(
            error=>console.log(error.message)
        );
    }
    render() {
        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-1">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Date" 
                        name="date" 
                        value={this.state.date}
                        onChange={this.handleChange.bind(this)}>
                    </input>
                </div>
                <div className="form-group mr-1">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Title" 
                        name="title" 
                        value={this.state.title}
                        onChange={this.handleChange.bind(this)}>
                    </input>
                </div>
                <div className="form-group mr-1">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Amount" 
                        name="amount" 
                        value={this.state.amount}
                        onChange={this.handleChange.bind(this)}>
                    </input>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={!this.valid()}
                >Create Record</button>
            </form>
        );
    }
}

export default RecordForm;