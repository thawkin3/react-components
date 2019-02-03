import React, { Component } from 'react';
import Autocomplete from '../components/autocomplete/Autocomplete';
import AutocompleteListItem from '../components/autocomplete/AutocompleteListItem';

class AutocompleteDemo extends Component {
    static resultsArray = [
        'C',
        'C++',
        'C#',
        'CSS',
        'HTML',
        'Java',
        'JavaScript',
        'Perl',
        'PHP',
        'Python',
        'Ruby',
        'Scala',
        'Typescript',
    ];
    
    constructor(props) {
        super(props);

        this.state = {
            selectedValue: '',
            filteredResults: AutocompleteDemo.resultsArray,
        };

        this.clearResults = this.clearResults.bind(this);
        this.selectionHandler = this.selectionHandler.bind(this);
        this.searchFunction = this.searchFunction.bind(this);
    }
    
    clearResults() {
        this.setState({ filteredResults: AutocompleteDemo.resultsArray });
    }

    selectionHandler(element) {
        this.setState({ selectedValue: element });
    }

    searchFunction(query) {
        console.log(query);
        const filteredResults = AutocompleteDemo.resultsArray.filter(value => value.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        console.log(filteredResults);
        this.setState({ filteredResults });
    }

    render() {
        const { selectedValue, filteredResults } = this.state;
        return (
            <div className="Autocomplete-Demo">
                <h2>Autocomplete</h2>
                <div>
                    <Autocomplete
                        minLength="3"
                        selectionHandler={this.selectionHandler}
                        searchFunction={this.searchFunction}
                        clearResultsFunction={this.clearResults}
                        resultsArray={filteredResults}
                        placeholderText="Ex. JavaScript"
                        labelText="Search for a programming language"
                        idName="autocompleteDemo"
                    >
                        <AutocompleteListItem />
                    </Autocomplete>
                </div>
                <p>You selected: {selectedValue}</p>
            </div>
        );
    }
}

export default AutocompleteDemo;
