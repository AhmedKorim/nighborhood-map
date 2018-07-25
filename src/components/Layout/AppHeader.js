import React from "react";
import ButtonLink from "./ButtonLink";

const AppHeader = (props) => {
    return (
        <header className="main-header">
            <div className="side-nav-toggle">
                <ButtonLink
                    classNames={props.navExpand ? "close" : "menu"}
                    click={props.toggleNav}
                label={props.navExpand ? "click to close the side bar" : "click to open side bar"}>
                    {props.navExpand ? "close" : "menu"}
                    </ButtonLink>
            </div>
            <div className='site-header'>
                <h1>late nights</h1>
            </div>
            <div className="app-tools">
                 {/*todo change site colors and map drawing*/}
                {/*<ButtonLink>place</ButtonLink>*/}
                {/*<ButtonLink>format_color_fill</ButtonLink>*/}
            </div>
        </header>
    )
};
export default AppHeader;

