import React from 'react';
import List from "./list";
import ButtonLink from "./ButtonLink";

const Sidebar = (props) => {
    return (
        <aside>
            <div className="wrapper">
                <nav className="aside-nav">
                    <div
                        className={props.activeTap ? 'active' : ''}>
                        <ButtonLink click={props.toggleTap}>place</ButtonLink></div>
                    <div
                        className={props.activeTap ? '' : 'active'}>
                        <ButtonLink click={props.toggleTap}>search</ButtonLink>
                    </div>
                    <div
                        className={["border", props.activeTap ? "" : "right"].join(' ')}>
                    </div>
                </nav>
                <div className="locations list">
                    <List/>
                </div>
            </div>
        </aside>
    )
};
export default Sidebar;

