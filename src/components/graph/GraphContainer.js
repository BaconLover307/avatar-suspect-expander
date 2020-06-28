import React, {Component} from 'react';
import { Graph } from 'react-d3-graph'
import './graphStyles.css';

class GraphContainer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            out: ''
        }
    }


    render() {
        const data = {
            nodes: [{ id: "1" }, { id: "Sally" }, { id: "Alice" }],
            links: [
              { source: "1", target: "Sally" },
              { source: "1", target: "Alice" },
              { source: "Sally", target: "Alice" }
            ]
          };
      
          // the graph configuration, you only need to pass down properties
          // that you want to override, otherwise default ones will be used
          const myConfig = {
            nodeHighlightBehavior: true,
            node: {
              color: "lightgreen",
              size: 500,
              highlightStrokeColor: "blue",
              fontSize: 20
            },
            link: {
              highlightColor: "lightblue",
              
            },
            height:1000,
            width:1000,
          };
      
        return(
        <div>
            <Graph id="graph-id" data={data} config={myConfig} />
        </div>
        )
    }




}

export default GraphContainer;