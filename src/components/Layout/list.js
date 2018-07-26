import React from "react";
import ButtonLink from "./ButtonLink";

const List = (props) => {
    const {locations, changeMarker} = props;
    return (
        <div className="locations">
            <ul>
                {locations && locations.map(location => (<li
                        key={location.key}>
                        <ButtonLink
                            label={`show more information about ${location.name}`}
                            click={(e) => changeMarker(e,location.key)}
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
            </ul>
        </div>
    )
};
export default List;

