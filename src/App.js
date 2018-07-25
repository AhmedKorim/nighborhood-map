import React, {Component} from 'react';
import './App.css';
import Map from "./components/Map/Map";
import AppHeader from "./components/Layout/AppHeader";
import Sidebar from "./components/Layout/Sidebar";

class App extends Component {
    state = {
        navExpand: true,
        leftTap: true,
        activeTap: "left",
        filter: '',
        formInput: 'clean'
    };
    changeActiveTap = (e) => {
        e.preventDefault();
        console.log(e.target.closest('.activeTab').classList.contains('activeTab'));
        !e.target.closest('div').classList.contains('activeTab') && this.setState(prevState => ({leftTap: !prevState.leftTap}))
    };
    changeFilterVal = (e) => {
        console.log(e);
        this.setState({filter: e.target.value});
    };

    formInputBlur = (e) => {
        e.target.parentElement.classList.remove('dirty');
        this.setState({formInput: 'clean'});
    };
    formInputFocus = (e) => {
        e.target.parentElement.classList.add('dirty');
        this.setState({formInput: 'dirty'});
    };

    toggleNav = (e) => {
        e.preventDefault();
        console.log('click');
        this.setState(prevState => ({navExpand: !prevState.navExpand}))
    };

    render() {
        return (
            <div>
                <AppHeader navExpand={this.state.navExpand} toggleNav={this.toggleNav}/>
                <main>
                    <div className={["side-wrapper", this.state.navExpand ? 'expanded' : 'hidden'].join(' ')}>
                        <Sidebar
                            toggleTap={this.changeActiveTap}
                            activeTap={this.state.leftTap}
                            navExpand={this.state.navExpand}
                            changeFilter={this.changeFilterVal}
                            filterVal={this.state.filter}
                            blur={this.formInputBlur}
                            focus={this.formInputFocus}
                        />
                    </div>
                    <div className={["map-wrapper", this.state.navExpand ? 'contraction' : 'Expansion'].join(' ')}>
                        <Map/>
                    </div>
                </main>
                <footer>
                </footer>
            </div>
        );
    }
}

export default App;