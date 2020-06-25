import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

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
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div>
                    <ul>
                        <li>Name: {dummy.name}</li>
                        <li>Element: {dummy.element}</li>
                        {dummy.friends.map((item) => (
                            <li key={item.id}>
                                Name: {item.name} | Element: {item.element}
                            </li>
                        ))};
                    </ul>
                </div>
            </div>
        );
    }
  }
}

export default App;
