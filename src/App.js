import React, {Component} from 'react';
import './App.css';
import Map from "./components/Map/Map";
import AppHeader from "./components/Layout/AppHeader";
import Sidebar from "./components/Layout/Sidebar";
import scriptLoader from 'react-async-script-loader';
import Modal from "./components/Layout/Modal";
import {getStyle} from "./data/tools";
import {fetchingPlaces, url} from "./data/Forsquare";
import Alert from "./components/Layout/Alert";

class App extends Component {
    state = {
        navExpand: true,
        leftTap: true,
        activeTap: "left",
        filter: '',
        formInput: 'clean',
        data: null,
        filteredPlaces: null,
        mapReady: false,
        modalViability: false,
        activeLocation: null,
        modalContent: null,
        dimensions: {},
        errorMessage: null
    };
    changeActiveTap = (e) => {
        !e.target.closest('.Tab').classList.contains('active') && this.setState(prevState => ({leftTap: !prevState.leftTap}))
    };


    mapComponent = null;
    alertTimeout = null;

    alertEr = (error) => {
        this.setState({errorMessage: error});
        this.alertTimeout = setTimeout(() => {
            this.setState({errorMessage: null})
        }, 7000);
    };

    closeAlert = () => {
        this.setState({errorMessage: null});
        window.clearTimeout(this.alertTimeout);
    };


    changeFilterVal = (e) => {
        const value = e.target ? e.target.value : null;
        this.setState({
                filter: value,
                filteredPlaces: value === '' ? this.state.data : this.state.data.filter(place => place.name.toLowerCase().indexOf(value.toLowerCase()) >= 0),
                clearedPlaces: value === '' ? [] : this.state.data.filter(place => place.name.toLowerCase().indexOf(value.toLowerCase()) < 0)

            }, () => {
                this.mapComponent.clearMarkers(this.state.clearedPlaces);
            }
        )
    };
    closeModal = () => {
        this.setState({modalViability: false})
    };
    resize = () => {
        (function (appComponent) {

            window.addEventListener('resize', function () {
                appComponent.setState(prevState => ({
                    dimensions: {
                        ...prevState.dimensions,
                        listHeight: {height: `${getStyle('.side-wrapper', 'height') - getStyle('.tools', 'height') - getStyle('.filter', 'height') - 15}px`}
                    }
                }))
            });
        })(this);
    }

    fetch = () => {
        fetchingPlaces(url).then(resp => {
                const data = resp.response.venues.map(place => (
                    {
                        key: place.id,
                        name: place.name,
                        location: place.location,
                        ll: place.location.labeledLatLngs
                    }
                ))
                this.setState({
                    data,
                    filteredPlaces: data,
                    dimensions: {
                        listHeight: {height: `${getStyle('.side-wrapper', 'height') - getStyle('.tools', 'height') - getStyle('.filter', 'height') - 15}px`}
                    }
                })
            }
        ).catch(err => this.alertEr(err));
    };


    componentDidMount() {
        this.resize();
        this.fetch();
    }

    changeMarker = (e, locId) => {
        this.setState({
                activeLocation: this.state.data.find(el => el.key === locId),
                modalViability: !e
            }, () => {
                e && this.mapComponent.openInfoWindow(this.state.activeLocation)
            }
        )
    };


    formInputBlur = (e) => {
        if (e.target.value !== '') return;
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
                    this.setState({mapReady: true});
                }
            }
        } else {
            this.alertEr('map failed')
        }
    };

    render() {
        return (
            <div>
                {
                    this.state.errorMessage && <Alert
                        message={this.state.errorMessage}
                        closeAlert={this.closeAlert}
                    />
                }
                <AppHeader navExpand={this.state.navExpand} toggleNav={this.toggleNav}/>
                <main>
                    <div className={["side-wrapper", this.state.navExpand ? 'expanded' : 'hidden'].join(' ')}>
                        <Sidebar
                            dimensions={this.state.dimensions}
                            changeMarker={this.changeMarker}
                            locations={this.state.filteredPlaces}
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
                        {(this.state.mapReady && this.state.data) && (<Map
                            ref={mapcom => this.mapComponent = mapcom}
                            locations={this.state.filteredPlaces}
                            modalViability={this.state.modalViability}
                            content={this.changeMarker}/>)}
                    </div>
                </main>
                <footer>
                </footer>
                {this.state.modalViability && <Modal
                    close={this.closeModal}
                    alertEr={this.alertEr}
                    activeLocation={this.state.activeLocation}
                >
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