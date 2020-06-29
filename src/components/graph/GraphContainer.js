import React, {Component} from 'react';
import { Graph } from 'react-d3-graph'
import './graphStyles.css';

class GraphContainer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            parentData: {}
        }
    }

    


    render() {
      
          // the graph configuration, you only need to pass down properties
          // that you want to override, otherwise default ones will be used
          const myConfig = {
            nodeHighlightBehavior: true,
            focusAnimationDuration: 0.5,
            // automaticRearrangeAfterNodeDrop: true,
            node: {
              color: getComputedStyle(document.body).getPropertyValue('--primary'),
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
        return(
        <div>
            <Graph id="graph-id" className="graph" data={this.props.data} config={myConfig} />
        </div>
        )
    }




}

export default GraphContainer;