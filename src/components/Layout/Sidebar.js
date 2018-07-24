import React from 'react';
import List from "./list";

const Sidebar = () => {
    return (
        <aside>
            <div className="wrapper">
                <div>
                    <input type="text" aria-label="search or filter locations"/>
                </div>
                <div className="locations list">
                    <List/>
                </div>
            </div>
        </aside>
    )
};
export default Sidebar;

