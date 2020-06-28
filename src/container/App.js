import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import '../components/search/searchStyles.css'
import '../components/graph/graphStyles.css'
import SearchBar from '../components/search/SearchBar'
import GraphContainer from '../components/graph/GraphContainer'
import fireSVG from '../components/graph/fire.svg'


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts: {},
            isLoaded: false,
            selected: {}
        }
    }

    componentDidMount() {
        axios.get('https://avatar.labpro.dev/friends/30')
            .then(response => {
                    this.setState({
                        selected: response.data,
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
    searchByIdHandler = (id) => {
        axios.get('https://avatar.labpro.dev/friends/' + id)
            .then(response => {
                console.log(response.data.status);
                if (response.data.status === 200) {
                    this.setState({
                        selected: response.data,
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

    getElementHandler = (elm) => {
        switch (elm) {
            case 'fire':
                return fireSVG;
            // case earth:
            //     return earthSVG;
            // case fire:
            //     return fireSVG;
            // case fire:
            //     return fireSVG;
            default:
                return fireSVG;
                // return circle;
        }
    }

    // > Render
    render() {
        // let {isLoaded, items} = this.state;
        const {selected, isLoaded} = this.state;
        const dummy = selected.payload;

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
                            <div className="graph-content">
                                <GraphContainer     />
                            </div>
                        </div>
                        <div className="search-container">
                            <div className="search-utils">
                                <SearchBar title="Citizen ID" submit={this.searchByIdHandler}/>
                            </div>
                            <div className="search-res">
                                <ul>
                                    <li>Name: {dummy.name}</li>
                                    <li>Element: {dummy.element}</li>
                                    {dummy.friends.map((item) => (
                                        <li className="res-friend" key={item.id}>
                                            Name: {item.name} | Element: {item.element}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
            );
        }
    }
}

export default App;
