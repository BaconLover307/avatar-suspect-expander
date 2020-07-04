import React from 'react';
import { Graph } from 'react-d3-graph'
import './graphStyles.css';

const GraphContainer = ( props ) => {
    const myConfig = {
        nodeHighlightBehavior: true,
        // automaticRearrangeAfterNodeDrop: true,
        // collapsible: true,
        directed: true,
        node: {
            color: getComputedStyle(document.body).getPropertyValue('--neutral'),
            size: 500,
            highlightStrokeColor: "blue",
            fontSize: 20,
            highlightFontSize: 20,
            highlightFontWeight: "bold",
        },
        link: {
            highlightColor: "lightblue",
            strokeWidth: 4,
            
        },
        d3: {
            gravity: -400,
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