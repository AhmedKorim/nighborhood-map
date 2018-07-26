import React, {Component} from 'react';
import './App.css';
import Map from "./components/Map/Map";
import AppHeader from "./components/Layout/AppHeader";
import Sidebar from "./components/Layout/Sidebar";
import scriptLoader from 'react-async-script-loader';

import {url} from "./data/Forsquare";
import Modal from "./components/Layout/Modal";

class App extends Component {
    state = {
        navExpand: true,
        leftTap: true,
        activeTap: "left",
        filter: '',
        formInput: 'clean',
        data: null,
        ready: false
    };
    changeActiveTap = (e) => {
        console.log(e);
        !e.target.closest('.Tab').classList.contains('active') && this.setState(prevState => ({leftTap: !prevState.leftTap}))
    };

    changeFilterVal = (e) => {
        console.log(e);
        this.setState({filter: e.target.value});
    };

    componentDidMount() {
        if (!localStorage.getItem('ahmed')) {
            fetch(url)
                .then(resp => resp.json())
                .then(data => localStorage.setItem('ahmed', JSON.stringify(data)));
        } else {
            const apiData = JSON.parse(localStorage.getItem('ahmed'));
            this.setState({
                data: apiData.response.venues.map(place => (
                    {
                        key: place.id,
                        name: place.name,
                        location: place.location,
                        ll: place.location.labeledLatLngs
                    }
                ))
            })
        }
    }

    formInputBlur = (e) => {
        e.target.parentElement.classList.remove('dirty');
        this.setState({formInput: 'clean'});
    };
    formInputFocus = (e) => {
        e.target.parentElement.classList.add('dirty');
        this.setState({formInput: 'dirty'});
    };

    toggleNav = (e) => {
        this.setState(prevState => ({navExpand: !prevState.navExpand}))
    };

    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                if (window.google) {
                    this.setState({ready: true});
                }
            }
        } else this.props.onError()
    };

    render() {
        return (
            <div>
                <AppHeader navExpand={this.state.navExpand} toggleNav={this.toggleNav}/>
                <main>
                    <div className={["side-wrapper", this.state.navExpand ? 'expanded' : 'hidden'].join(' ')}>
                        <Sidebar
                            locations={this.state.data}
                            toggleTap={this.changeActiveTap}
                            activeTap={this.state.leftTap}
                            navExpand={this.state.navExpand}
                            changeFilter={this.changeFilterVal}
                            filterVal={this.state.filter}
                            blur={this.formInputBlur}
                            focus={this.formInputFocus}
                        />
                    </div>
                    <div className={["map-wrapper", this.state.navExpand ? 'contraction' : 'Expansion'].join(' ')}>
                        {this.state.ready && (<Map locations={this.state.data} leftTap={this.state.leftTap}/>)}
                    </div>
                </main>
                <footer>
                </footer>
                {/* <Modal>
                    <img src="//via.placeholder.com/500x1200/3000"/>
                </Modal>*/}
            </div>
        );
    }
}

export default scriptLoader(
    [
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCXbw5wy_UfZMPbf7iKGZO7q0ktmdgLkXw',
    ]
)(App)