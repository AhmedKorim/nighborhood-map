import React from 'react';

class Map extends React.Component {
    state = {
        map: null,
        locations: null,
        markers: [],
        isRendered: false
    };
    mapInit = () => {
        if (window.google && this.state.map && this.props.locations) {
            // creating map
            const map = new window.google.maps.Map(this.state.map, {
                center: {lat: 40.7413549, lng: -73.9980244},
                zoom: 13,
                mapTypeControl: true,
            });
            // creating info window
            const infoWindow = new window.google.maps.InfoWindow();
            // create map bounds
            const bounds = new window.google.maps.LatLngBounds();
            const markers = [];
            //
            for (const [index, postion] of this.props.locations.entries()) {
                const markerData = {name: postion.name, location: {lat: postion.location.lat, lng: postion.location.lng}};
                const {name, location} = markerData;
                const marker = new window.google.maps.Marker({
                    title: name,
                    position: location,
                    animation: window.google.maps.Animation.DROP,
                    id: index,
                });
                markers.push(marker);
            }

            // this.setState(prevState => ({markers: prevState.markers.concat(markers)}));
            console.log(this.state.markers);
            for (const marker of markers) {
                marker.setMap(map);
                console.log(marker);
                bounds.extend(marker.position);
            }
            map.fitBounds(bounds);
        }
    };

    componentDidMount() {
            this.mapInit();
    }

    render() {

        return (
            <div className={"map"} role="application" ref={(el) => this.state.map = el}></div>
        )

    }
}


export default Map;