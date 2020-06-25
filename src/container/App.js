import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import SearchBar from '../components/search/SearchBar'

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts: {},
            isLoaded: false,
        }
    }

    componentDidMount() {
        axios.get('https://avatar.labpro.dev/friends/30')
            .then(response => {
                    this.setState({
                        posts: response.data,
                        isLoaded: true
                    });
                    console.log(response)})
            // .then(response => res.json())
            // .then(json => {
            //     this.setState({
            //         isLoaded: true,
            //         items: json
            //     })
            // })
    }

    // > Methods
    searchById = (id) => {
        axios.get('https://avatar.labpro.dev/friends/' + id)
            .then(response => {
                console.log(response.data.status);
                if (response.data.status === 200) {
                    this.setState({
                        posts: response.data,
                        isLoaded: true
                    });
                    // this.props.data = response.data;
                    console.log(response);
                } else {
                    console.log("data not found");
                }}
            )
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        // let {isLoaded, items} = this.state;
        const {posts, isLoaded} = this.state;
        const dummy = posts.payload;

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // console.log(items);
            return (
                <div className="App">
                    <header className="App-header">
                        {/* <img src={logo} className="App-logo" alt="logo" /> */}
                        <h1 className="App-title">Capital City Citizen Network</h1>
                    </header>
                    <div className="expander-container">
                        <div className="graph-container">
                            Graph<br/>will<br/>be<br/>here
                        </div>
                        <div className="search-container">
                            <SearchBar title="Citizen ID" submit={this.searchById}/>
                        </div>
                        <ul>
                            <li>Name: {dummy.name}</li>
                            <li>Element: {dummy.element}</li>
                            {dummy.friends.map((item) => (
                                <li key={item.id}>
                                    Name: {item.name} | Element: {item.element}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }
    }
}

export default App;
