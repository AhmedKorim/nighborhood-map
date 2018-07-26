import React from 'react';
import scriptLoader from 'react-async-script-loader';

class Map extends React.Component {
    state = {
        map: null,
        locations: null,
    };

    componentDidMount() {
        this.setState({locations: this.props.locations}, () => {
                console.log(this.state.locations);
            }
        )
    }

    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                // if (window.google && this.state.map) {
                //     const map = new window.google.maps.Map(this.state.map, {
                //         center: {lat: 40.7413549, lng: -73.9980244},
                //         zoom: 13,
                //         mapTypeControl: true,
                //         styles: this.state.styles
                //     });
                //     const markers = [];
                //     for (const [index, postion] of this.state.locations.entries()) {
                //         const {title, location} = postion;
                //         const marker = new window.google.maps.Marker({
                //             title: title,
                //             position: location,
                //             animation: window.google.maps.Animation.DROP,
                //             id: index,
                //         });
                //         markers.push(marker);
                //     }
                //     for (const marker of markers) {
                //         marker.setMap(map);
                //     }
                //
                // }
            }
            else this.props.onError()
        }
    }


    render() {
        return (
            <div className={"map"} role="application" ref={(el) => this.state.map = el}></div>
        )
    }
}

export default scriptLoader(
    [
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCXbw5wy_UfZMPbf7iKGZO7q0ktmdgLkXw',
    ]
)(Map)