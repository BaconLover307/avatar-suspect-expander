import React, {Component} from 'react';
// import axios from 'axios'
import './searchStyles.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state ={
            out: ''
        }
    }

    outputHandler = (event) => {
        this.setState({
            out: event.target.value
        })
    }

    submitHandler = (event) => {
        this.props.submit(this.state.out);
        event.preventDefault();
    }

    render() {
        return(
        <div>
            <form  onSubmit={this.submitHandler} className="searchbar">
                <label className="search-title">{this.props.title}</label>
                <div>
                    <input className="input" type="text" id="idInput" name="idInput" value={this.state.out} onChange={this.outputHandler}/>
                    <input type="submit" className="btn-primary" value="Search" />
                </div>
            </form>
        </div>
        )
    }




}

export default SearchBar;