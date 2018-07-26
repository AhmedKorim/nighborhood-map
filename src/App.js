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
        filteredData: null,
        ready: false,
        modalViability: false,
        activeLocation: {},
        modalContent: null
    };
    changeActiveTap = (e) => {
        console.log(e);
        !e.target.closest('.Tab').classList.contains('active') && this.setState(prevState => ({leftTap: !prevState.leftTap}))
    };

    changeFilterVal = (e) => {
        console.log(e);
        this.setState({filter: e.target.value});
    };
    closeModal = () => {
        this.setState({modalViability: false})
    }


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

    changeMarker = (e, locId) => {
        this.setState({
            activeLocation: this.state.data.find(el => el.key === locId),
            modalViability: true
        })
    };
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
                            changeMarker={this.changeMarker}
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
                        {this.state.ready && (<Map
                            locations={this.state.data}
                            modalViability={this.state.modalViability}
                            content={this.changeMarker}/>)}
                    </div>
                </main>
                <footer>
                </footer>
                {this.state.modalViability && <Modal
                    close={this.closeModal}
                >
                    <div id="pano"></div>
                </Modal>}
            </div>
        );
    }
}

export default scriptLoader(
    [
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCXbw5wy_UfZMPbf7iKGZO7q0ktmdgLkXw',
    ]
)(App)