import React, {Component} from 'react';
import './App.css';
import Map from "./components/Map/Map";
import AppHeader from "./components/Layout/AppHeader";
import Sidebar from "./components/Layout/Sidebar";

class App extends Component {
    state = {
        navExpand: true
    }
    toggleNav = (e) => {
        e.preventDefault();
        console.log(e);
        this.setState(prevState => ({navExpand: !prevState.navExpand}))
    }

    render() {
        return (
            <div>
                <AppHeader navExpand={this.state.navExpand} toggleNav={this.toggleNav}/>
                <main>
                    <div className={["side-wrapper", this.state.navExpand ? 'expanded' : 'hidden'].join(' ')}>
                        <Sidebar navExpand={this.state.navExpand}/>
                    </div>
                    <div className={["map-wrapper", this.state.navExpand ? 'contraction' : 'Expansion'].join(' ')}>
                        <Map/>
                    </div>
                </main>
                <footer>
                </footer>
            </div>
        );
    }
}

export default App;