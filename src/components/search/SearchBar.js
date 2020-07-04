import React, {Component} from 'react';
import './searchStyles.css';
import {Button, TextField, Box, makeStyles} from '@material-ui/core';

const useStyles = makeStyles( () => ({
    fieldStyles: {
        background: "white"
    }
}));

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
            <form  onSubmit={this.submitHandler} className="searchbar">
                {/* <label className="search-title"></label> */}
                <Box display="flex" flexDirection="row" justifyContent="flex-start" alignContent="center" >
                    <TextField
                    type="text"
                    id="idInput"
                    variant="filled"
                    size="small"
                    color='secondary'
                    label={this.props.title}
                    name="idInput" value={this.state.out}
                    onChange={this.outputHandler}
                    /* placeholder={Math.floor(Math.random()*150)} */ />
                    <Button variant="contained" color="secondary" type="submit" className="btn-primary">Search</Button>
                </Box>
            </form>
        )
    }




}

export default SearchBar;