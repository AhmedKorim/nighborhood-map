import React from 'react';
import List from "./list";
import ButtonLink from "./ButtonLink";
import Input from "./InputFeild";

const Sidebar = (props) => {
    const {toggleTap, activeTap, filterVal, changeFilter, focus, blur, locations, changeMarker} = props;

    return (
        <aside>
            <div className="wrapper">
                <div className="tools">
                    <nav className="aside-nav">
                        <div
                            className={['Tab', activeTap ? 'active' : ''].join(' ')}>
                            <ButtonLink
                                label={"show list of places"}
                                click={toggleTap}
                            >place</ButtonLink></div>
                        <div
                            className={['Tab', activeTap ? '' : 'active'].join(' ')}>
                            <ButtonLink click={toggleTap}
                                        label={"search for places"}
                            >search</ButtonLink>
                        </div>
                        <div
                            className={["border", activeTap ? "" : "right"].join(' ')}>
                        </div>
                    </nav>
                </div>
                <div className="content">
                    <div className="places">
                        <div className="filter">
                            <Input
                                val={filterVal}
                                change={changeFilter}
                                label={'filter places'}
                                placeholder={"Enter to filter"}
                                blur={blur}
                                focus={focus}
                            >filter_list</Input>
                        </div>
                        <div className="locations list"
                             >
                            <List
                                changeMarker={changeMarker}
                                locations={locations}/>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
};
export default Sidebar;

