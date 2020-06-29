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
            isLoaded: false,
            selected: {},
            data: {},
        }
    }

    // > Methods
    searchByIdHandler = (id) => {
        axios.get('https://avatar.labpro.dev/friends/' + id)
            .then(response => {
                // console.log(response.data.status);
                if (response.data.status === 200) {
                    this.setState({
                        data: {},
                        isLoaded: false
                    })
                    const {newData, selectedData} = this.graphDataHandler(response.data.payload);
                    this.setState({
                        selected: selectedData,
                        isLoaded: true,
                        data: newData
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

    expandNode = (nodeID) => {
        axios.get('https://avatar.labpro.dev/friends/' + nodeID)
            .then(response => {
                if (response.data.status === 200) {
                    const {newData, selectedData} = this.graphDataHandler(response.data.payload);
                    this.setState({
                        selected: selectedData,
                        data: newData,
                    });
                } else {
                    this.setState({
                        isLoaded:null
                    });
                    console.log("Data not found");
                }}
            )
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

    graphDataHandler = (raw) => {
        raw.friends = _.uniqBy(raw.friends, 'id');
        _.remove(raw.friends, friend => friend.id === raw.id);
        let selected = raw;
        const friends = raw.friends.map(friend => ({
            ...friend,
            color: this.getColorHandler(friend.element),
            // svg: this.getElementHandler(friend.element)
        }));
        let newNodes = [
            {
                id: raw.id,
                    name: raw.name,
                    element: raw.element,
                    color: this.getColorHandler(raw.element),
                    // svg: this.getElementHandler(raw.element),
            },
            ...friends
        ];
        newNodes = _.unionWith(newNodes, this.state.data.nodes, _.isEqual);
        
        let newLinks = friends.map(item => ({
            source: raw.id,
            target: item.id,
        }))
        newLinks = _.unionWith(newLinks, this.state.data.links, _.isEqual);
        
        return {
            newData: {
                nodes: newNodes,
                links: newLinks
            },
            selectedData: selected
        }
    }

    // > Render
    render() {
        const {data, selected, isLoaded} = this.state;

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
            graph = <GraphContainer data={data} clickNode={this.expandNode}/>
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
