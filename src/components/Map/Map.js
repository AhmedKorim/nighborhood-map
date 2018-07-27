import React from 'react';

class Map extends React.Component {
    state = {
        map: null,
        locations: null,
        markers: [],
        isRendered: false,
    };
    createMap = () => {
        this.setState({
                map: new window.google.maps.Map(this.state.map, {
                    center: {lat: 40.7413549, lng: -73.9980244},
                    zoom: 11,
                    mapTypeControl: true,
                }),
                infoWindow: new window.google.maps.InfoWindow(),
                bounds: window.google.maps.LatLngBounds(),
            }, () => {
                this.creatMarkers();
            }
        )
    };
    populateInfoWindow = (marker, infoWindow) => {
        if (infoWindow.marker !== marker) {
            infoWindow.setContent('');
            infoWindow.marker = marker;
            infoWindow.addListener('closeclick', function () {
                infoWindow.marker = null;
            });
            const streetViewService = new window.google.maps.StreetViewService();
            const raduis = 100;

            function getSreetView(data, status) {
                if (status === window.google.maps.StreetViewStatus.OK) {
                    const nearStreetViewLocation = data.location.latLng;
                    const heading = window.google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
                    infoWindow.setContent(`<div> ${marker.title}</div>`);
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
        }
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
                map: that.state.map
            });
            marker.addListener('click', function () {
                that.populateInfoWindow(this, that.state.infoWindow);
                that.props.content()
            });
            that.setState(prevState => ({markers: prevState.markers.concat(marker)}), () => {
                for (const marker of that.state.markers) {
                    marker.setMap(that.state.map);
                    that.state.bounds.extend(marker.position);
                }
                that.state.map.fitBounds(that.setState.bounds);
            });
        }

    };


    mapInit = () => {
        const {content, modalViability} = this.props;
        if (window.google && this.state.map && this.props.locations) {
            this.createMap();

        }
    };

    componentDidMount() {
        this.mapInit();
        console.log('map');
    }


    render() {
        return (
            <div className={"map"} role="application" ref={(el) => this.state.map = el}></div>
        )

    }
}


export default Map;