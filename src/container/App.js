import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import '../components/search/searchStyles.css'
import '../components/graph/graphStyles.css'
import SearchBar from '../components/search/SearchBar'
import GraphContainer from '../components/graph/GraphContainer'
import waterSVG from '../components/graph/water.svg'
import earthSVG from '../components/graph/earth.svg'
import fireSVG from '../components/graph/fire.svg'
import airSVG from '../components/graph/air.svg'
import neutralSVG from '../components/graph/neutral.svg'
import _ from 'lodash'


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: {},
            isLoaded: false,
            selected: {}
        }
    }

    componentDidMount() {
        // axios.get('https://avatar.labpro.dev/friends/30')
        //     .then(response => {
        //             this.setState({
        //                 selected: response.data,
        //                 isLoaded: true
        //             });
        //             console.log(response)})
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
                // console.log(response.data.status);
                if (response.data.status === 200) {
                    const raw = response.data.payload;
                    raw.friends = _.uniqBy(raw.friends, 'id');
                    _.remove(raw.friends, friend => friend.id === raw.id);
                    this.setState({
                        selected: raw,
                        isLoaded: true
                    });
                } else {
                    this.setState({
                        isLoaded:null
                    });
                    console.log("Data not found");
                }}
            )
            .catch((error) => {
                this.setState({
                    isLoaded:null
                });
                // console.log(error);
            });
    }

    getElementHandler = (elm) => {
        switch (elm) {
            case 'water':
                return waterSVG;
            case 'earth':
                return earthSVG;
            case 'fire':
                return fireSVG;
            case 'air':
                return airSVG;
            default:
                return neutralSVG;
        }
    }

    getColorHandler = (elm) => {
        const colors = getComputedStyle(document.body)
        switch (elm) {
            case 'water':
                return colors.getPropertyValue('--water');
            case 'earth':
                return colors.getPropertyValue('--earth');
            case 'fire':
                return colors.getPropertyValue('--fire');
            case 'air':
                return colors.getPropertyValue('--air');
            default:
                return colors.getPropertyValue('--fire');
        }
    }

    getGraphDataHandler = () => {
        const raw = this.state.selected;
        const friends = raw.friends.map(friend => ({
            ...friend,
            color: this.getColorHandler(friend.element),
            svg: this.getElementHandler(friend.element)
        }));
        return {
                nodes: [
                    // ...prev.nodes,
                    {
                    id: raw.id,
                    name: raw.name,
                    element: raw.element,
                    color: this.getColorHandler(raw.element),
                    svg: this.getElementHandler(raw.element),
                    },
                    ...friends
                    
                ],
                links: 
                    friends.map(item => ({
                            source: raw.id,
                            target: item.id,
                        })
                    )
            }
    }

    // > Render
    render() {
        // let {isLoaded, items} = this.state;
        const {selected, isLoaded} = this.state;

        let list = null;
        let graph = null;

        // 1> Rendering List
        if (isLoaded) {
            list = (
            <ul>
                <li>Name: {selected.name}</li>
                <li>Element: {selected.element}</li>
                {selected.friends.map((item) => 
                    <li className="res-friend" key={item.id}>
                        Name: {item.name} | Element: {item.element}
                    </li>
                )}
            </ul>    
            )
        } else if (isLoaded === null) {
            list = (
                <p>Please enter a valid id</p>
            )
        }

        // 1> Rendering Graph
        if (isLoaded) {
            let graphData = this.getGraphDataHandler();
            graph = <GraphContainer data={graphData}/>
        } else if (isLoaded === null) {
            graph = null;
        }


        return (
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h1 className="App-title">Capital City Citizen Network</h1>
                </header>
                <div className="expander-container">
                    <div className="graph-container">
                        <div className="graph-content">
                            {graph}
                        </div>
                    </div>
                    <div className="search-container">
                        <div className="search-utils">
                            <SearchBar title="Citizen ID" submit={this.searchByIdHandler}/>
                        </div>
                        <div className="search-res">
                            {list}
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default App;
