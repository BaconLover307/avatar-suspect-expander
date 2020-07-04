import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import '../components/search/searchStyles.css'
import '../components/graph/graphStyles.css'
import SearchBar from '../components/search/SearchBar'
import GraphContainer from '../components/graph/GraphContainer'
import _ from 'lodash'
import {Box, Typography} from "@material-ui/core"
import Header from '../components/modules/Header'
import Citizen from '../components/modules/Citizen'
import Footer from '../components/modules/Footer'
import waterSVG from '../components/modules/assets/water.svg'
import earthSVG from '../components/modules/assets/earth.svg'
import fireSVG from '../components/modules/assets/fire.svg'
import airSVG from '../components/modules/assets/air.svg'
import neutralSVG from '../components/modules/assets/neutral.svg'
import LogoCCCN from './cccn-long.png'
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles'
import theme from './theme.js';


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

    expandNodeHandler = (nodeID) => {
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
        let graph = <img src={LogoCCCN} alt='' className="logo" />;

        // 1> Rendering List
        if (isLoaded) {
            list = (
                <Box>
                    <Citizen
                        key={selected.id}
                        id={selected.id}
                        name={selected.name}
                        element={selected.element}
                        color={this.getColorHandler(selected.element)}
                        svg={this.getElementHandler(selected.element)}
                        onClick={() => this.expandNodeHandler(selected.id)}
                        />
                    <Typography align="center" variant="h6"> -- Friends -- </Typography>
                    {selected.friends.map((item) => 
                        <Citizen
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            element={item.element}
                            color={this.getColorHandler(item.element)}
                            svg={this.getElementHandler(item.element)}
                            onClick={() => this.expandNodeHandler(item.id)}
                        />
                    )}
                </Box>
            )
        } else if (isLoaded === null) {
            list = (
                <p style={{textAlign: 'center', fontSize: 18, padding: '0.5rem'}}>Please enter a valid id</p>
            )
        }

        // 1> Rendering Graph
        if (isLoaded) {
            graph = <Box className="graph-content">
                        <GraphContainer data={data} clickNode={this.expandNodeHandler}/>
                    </Box>;
        } else if (isLoaded === null) {
            graph = <img src={LogoCCCN} alt='' className="logo" />;
        }


        return (
            <div>
                <ThemeProvider theme={theme}>
                    <StylesProvider injectFirst>
                        <div className="App">
                            <Header />
                            <Box className="expander-container">
                                <Box className="graph-container">
                                    <Box className="graph-content">
                                        {graph}
                                    </Box>
                                </Box>
                                <Box className="search-container">
                                    <Box className="search-utils">
                                        <SearchBar title="Citizen ID" submit={this.searchByIdHandler}/>
                                    </Box>
                                    <Box className="search-res">
                                        {list}
                                    </Box>
                                </Box>
                            </Box>
                            <Footer />
                        </div>
                    </StylesProvider>
                </ThemeProvider>
            </div>
        );
    }
}

export default App;
