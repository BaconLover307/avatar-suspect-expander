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
            highlightStrokeColor: "blue",
            highlightStrokeWidth: 3,
            // highlightFontWeight: "bold",
        },
        link: {
            highlightColor: "lightblue",
            strokeWidth: 4,
            
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