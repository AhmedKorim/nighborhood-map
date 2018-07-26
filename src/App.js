import React, {Component} from 'react';
import './App.css';
import Map from "./components/Map/Map";
import AppHeader from "./components/Layout/AppHeader";
import Sidebar from "./components/Layout/Sidebar";
import Modal from "./components/Layout/Modal";

class App extends Component {
    state = {
        navExpand: true,
        leftTap: true,
        activeTap: "left",
        filter: '',
        formInput: 'clean'
    };
    changeActiveTap = (e) => {
        console.log(e);
        !e.target.closest('.Tab').classList.contains('active') && this.setState(prevState => ({leftTap: !prevState.leftTap}))
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
                {/*<Modal>*/}
                    {/*<img src="//via.placeholder.com/500x1200/3000"/>*/}
                {/*</Modal>*/}
            </div>
        );
    }
}

export default App;