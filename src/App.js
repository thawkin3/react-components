import React, { Component } from 'react';
import AutocompleteDemo from './demos/AutocompleteDemo';
import ModalDemo from './demos/ModalDemo';
import Button from '@thawkin3/react-component-library/dist/Button';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>react-components</h1>
                    <p>Reusable Components for React</p>
                </header>
                <main>
                    <AutocompleteDemo />
                    <ModalDemo />
                    <h2>Button from @thawkin3/react-component-library</h2>
                    <Button clickHandler={() => { alert('You clicked me!'); }}>
                        Click me to be alerted
                    </Button>
                </main>
            </div>
        );
    }
}

export default App;
