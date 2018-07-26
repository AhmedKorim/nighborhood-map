import React from "react";
import {locaions} from '../../data/locations'
import ButtonLink from "./ButtonLink";

const List = () => {
    return (
        <div className="locations">
            <ul>
                {locaions.map(location => (<li
                        key={location.title}>
                        <ButtonLink
                            label={`show more information about ${location.title}`}
                        >
                            <div className="list-content">
                                <div className="icon">
                                    <i className="material-icons " aria-hidden="true">place</i>
                                </div>
                                <div className="loc-title">{location.title}</div>
                            </div>
                        </ButtonLink>
                    </li>)
                )}
            </ul>
        </div>
    )
};
export default List;

