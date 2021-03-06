import React from "react";
import ButtonLink from "./ButtonLink";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'


const List = (props) => {
    const {locations, changeMarker, listHeight, openModalKey} = props;
    return (
        <div className="locations"
             style={listHeight}>
            <PerfectScrollbar>
                {locations && <ul aria-live="assertive" aria-label={`${locations.length} places found`}>
                    {locations.map(location => (<li
                            key={location.key}>
                            <ButtonLink
                                label={`show more information about ${location.name}`}
                                click={(e) => changeMarker(e, location.key)}
                                keyPressed={(e) => openModalKey(e, location.key)}
                            >
                                <div className="list-content">
                                    <div className="icon">
                                        <i className="material-icons " aria-hidden="true">place</i>
                                    </div>
                                    <div className="loc-title">{location.name}</div>
                                </div>
                            </ButtonLink>
                        </li>)
                    )}
                </ul>}
            </PerfectScrollbar>
        </div>
    )
};
export default List;

