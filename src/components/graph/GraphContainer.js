import React from 'react';
import { Graph } from 'react-d3-graph'
import './graphStyles.css';

const GraphContainer = ( props ) => {
    const myConfig = {
        nodeHighlightBehavior: true,
        focusedNodeId: "nodeIdToTriggerZoomAnimation",
        directed: true,
        node: {
            color: getComputedStyle(document.body).getPropertyValue('--neutral'),
            size: 800,
            fontSize: 20,
            highlightFontSize: 22,
            highlightStrokeColor: "#37777B",
            highlightStrokeWidth: 3,
            // highlightFontWeight: "bold",
        },
        link: {
            strokeWidth: 4,
            color: '#A9CFD1',
            highlightColor: "#37777B",
            
        },
        d3: {
            gravity: -350,
        },
        height:1000,
        width:1000,
    };

    const expandNode = (nodeId) => props.clickNode(nodeId);

    return (
        <Graph
        id="graph-id"
        data={props.data}
        config={myConfig} 
        onClickNode={expandNode}/>
    )
}

export default GraphContainer;