import React from 'react';

class Map extends React.Component {
    state = {
        locations: null,
        markers: [],
        isRendered: false,
        bounds: null
    };
    mapConatienr = null;
    bounds = new window.google.maps.LatLngBounds();
    createMap = () => {

        this.setState({
                map: new window.google.maps.Map(this.mapConatienr, {
                    center: {lat: 52.520008, lng: 13.404954},
                    zoom: 9,
                    mapTypeControl: true,
                }),
                infoWindow: new window.google.maps.InfoWindow(),

            }, () => {
                this.creatMarkers();
            }
        )
    };
    populateInfoWindow = (marker, infoWindow) => {
        const streetViewService = new window.google.maps.StreetViewService();
        const raduis = 100;

        function getSreetView(data, status) {
            if (status === window.google.maps.StreetViewStatus.OK) {
                const nearStreetViewLocation = data.location.latLng;
                const heading = window.google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
                const panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 30
                    }
                };
                const panorama = new window.google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
            }
        }

        streetViewService.getPanoramaByLocation(marker.position, raduis, getSreetView);

    };
    creatMarkers = () => {
        const that = this;
        for (const [index, postion] of this.props.locations.entries()) {
            const markerData = {name: postion.name, location: {lat: postion.location.lat, lng: postion.location.lng}};
            const {name, location} = markerData;
            const marker = new window.google.maps.Marker({
                title: name,
                position: location,
                animation: window.google.maps.Animation.DROP,
                id: index,
            });
            marker.addListener('click', (function (e, postion) {
                return function () {
                    that.populateInfoWindow(this, that.state.infoWindow);
                    that.state.infoWindow.marker = null;
                    that.state.infoWindow.close();
                    that.props.content(e, postion.key);
                }

            })(null, postion));
            that.setState(prevState => ({markers: prevState.markers.concat(marker)}), () => {
                that.drawMarkers();
            });
        }

    };

    drawMarkers = () => {
        if (!this.state.map) return;

        for (const marker of this.state.markers) {
            marker.setMap(this.state.map);
            this.bounds.extend(marker.position);
        }
        this.state.map.fitBounds(this.bounds);

    };
    clearMarkers = (cleardMarkers) => {
        if (!this.state.map) return;
        this.drawMarkers();
        const markersToClear = this.state.markers.filter(marker => cleardMarkers.find(cleardMarker => cleardMarker.name === marker.title));
        for (const marker of markersToClear) {
            marker.setMap(null);
            this.bounds.extend(marker.position);
        }
        this.state.map.fitBounds(this.bounds);
    };


    mapInit = () => {
        if (window.google && this.mapConatienr && this.props.locations) {

            this.createMap();
        }
    };
    openStreatVeiw = (ActiveMarker) => {
        const marker = this.state.markers.find(marker => marker.title === ActiveMarker.name);
        this.populateInfoWindow(marker);
    };


    openInfoWindow = (ActiveMarker) => {
        if (!this.state.map) return;
        const marker = this.state.markers.find(marker => marker.title === ActiveMarker.name);
        const {infoWindow} = this.state;
        infoWindow.setContent(`${marker.title} <br> <small>click the marker for more info</small>`);
        infoWindow.marker = marker;
        infoWindow.addListener('closeclick', function () {
            infoWindow.marker = null;
        });
        this.state.infoWindow
            .open(this.state.map, marker)
    };


    componentDidMount() {
        this.mapInit();
        window.gm_authFailure = () => {
            this.props.alertEr('google maps error')
        }
    }

    shouldComponentUpdate(nexProps, PrevState) {
        return nexProps.locations === nexProps.locations;
    }

    render() {
        return (
            <div className={"map"} role="application" ref={(el) => this.mapConatienr = el}></div>
        )

    }
}


export default Map;