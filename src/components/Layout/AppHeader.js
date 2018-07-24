import React from "react";
import ButtonLink from "./ButtonLink";

const AppHeader = (props) => {
    return (
        <header className="main-header">
            <div className="side-nav-toggle">
                <ButtonLink classNames={props.navExpand ? "close" : "menu"} click={props.toggleNav}>{props.navExpand ? "close" : "menu"}</ButtonLink>
            </div>
            <div className='site-header'>
                <h1>neighborhood maps</h1>
            </div>
            <div className="app-tools">
                <ButtonLink>format_color_fill</ButtonLink>
                <ButtonLink>place</ButtonLink>
            </div>
        </header>
    )
};
export default AppHeader;

