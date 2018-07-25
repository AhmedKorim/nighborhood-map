import React from 'react';
import List from "./list";
import ButtonLink from "./ButtonLink";
import Input from "./InputFeild";

const Sidebar = (props) => {
    const {toggleTap, activeTap, filterVal, changeFilter, clean, focus} = props;
    return (
        <aside>
            <div className="wrapper">
                <nav className="aside-nav">
                    <div
                        className={activeTap ? 'active' : ''}>
                        <ButtonLink
                            label={"show list of places"}
                            click={toggleTap}
                        >place</ButtonLink></div>
                    <div
                        className={props.activeTap ? '' : 'active'}>
                        <ButtonLink click={toggleTap}
                                    label={"search for places"}
                        >search</ButtonLink>
                    </div>
                    <div
                        className={["border", activeTap ? "" : "right"].join(' ')}>
                    </div>
                </nav>
                <div className="content">
                    <div className="places">
                        <div>
                            <Input
                                val={filterVal}
                                change={changeFilter}
                                label={'filter places'}
                                placeholder={"Enter to filter"}
                                clean={clean}
                                focus={focus}
                            />
                        </div>
                        <div className="locations list">
                            <List/>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
};
export default Sidebar;

