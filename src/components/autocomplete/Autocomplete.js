import React, { Component } from 'react';
import './Autocomplete.css';

const debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
        const context = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
};

class Autocomplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldShowAutocompleteMenu: false,
            currentIndex: -1,
            autocompleteInputValue: '',
        };

        this.debouncedSearch = this.debouncedSearch.bind(this);
        this.autocompleteSearchInputChangeHandler = debounce(this.autocompleteSearchInputChangeHandler.bind(this), 300);
        this.hideAutocompleteMenu = this.hideAutocompleteMenu.bind(this);
        this.showAutocompleteMenu = this.showAutocompleteMenu.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.setSelection = this.setSelection.bind(this);
        this.setSelectionThroughKeyPress = this.setSelectionThroughKeyPress.bind(this);
    }

    componentDidMount() {
        this.props.clearResultsFunction();
    }

    setSelection(element) {
        this.props.selectionHandler(element);
        this.props.clearResultsFunction();
        this.setState({
            shouldShowAutocompleteMenu: false,
            autocompleteInputValue: element,
        });
    }

    setSelectionThroughKeyPress(element, e) {
        if (e.key === 'Enter') {
            this.setSelection(element);
        }
    }

    autocompleteSearchInputChangeHandler(e) {
        this.props.clearResultsFunction();
        this.props.searchFunction(e.target.value);
    }

    debouncedSearch(e) {
        this.setState({
            autocompleteInputValue: e.target.value,
        });
        if (e.target.value.length >= Number(this.props.minLength)) {
            e.persist();
            this.autocompleteSearchInputChangeHandler(e);
        } else {
            this.props.clearResultsFunction();
        }
    }

    hideAutocompleteMenu(e) {
        // IE doesn't support e.relatedTarget on the blur event, so we have to use document.activeElement in that case
        // All other browsers support e.relatedTarget on the blur event, so we can use e.relatedTarget in those cases
        if ((e.relatedTarget === null && document.activeElement !== null && !document.activeElement.classList.contains('autocompleteClickableArea')) ||
            (e.relatedTarget !== null && !e.relatedTarget.classList.contains('autocompleteClickableArea'))) {
            this.setState({
                shouldShowAutocompleteMenu: false,
            });
        }
    }

    showAutocompleteMenu() {
        this.setState({
            shouldShowAutocompleteMenu: true,
            currentIndex: -1,
        });
    }

    handleKeyDown(e) {
        const { resultsArray } = this.props;
        switch (e.which) {
            case 38: // Up
                e.preventDefault();
                this.setState(prevState => ({
                    currentIndex: prevState.currentIndex === -1 ? (resultsArray.length - 1) : (prevState.currentIndex - 1),
                }));
                break;
            case 40: // Down
                e.preventDefault();
                this.setState(prevState => ({
                    currentIndex: prevState.currentIndex === resultsArray.length - 1 ? -1 : (prevState.currentIndex + 1),
                }));
                break;
            case 13: // Enter
                if (this.state.currentIndex !== -1) {
                    this.setSelection(resultsArray[this.state.currentIndex]);
                } else {
                    e.preventDefault();
                }
                break;
            default:
            // Do nothing
        }
    }

    render() {
        const { resultsArray, labelText, idName, placeholderText } = this.props;

        if (resultsArray) {
            return (
                <div className="autocomplete-container">
                    <label htmlFor={idName} className="autocomplete-label">{labelText}</label>
                    <input
                        type="text"
                        name={idName}
                        id={idName}
                        className="autocomplete-input"
                        tabIndex="0"
                        placeholder={placeholderText}
                        autoComplete="off"
                        value={this.state.autocompleteInputValue}
                        onChange={this.debouncedSearch}
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.hideAutocompleteMenu}
                        onFocus={this.showAutocompleteMenu}
                    />
                    { resultsArray.length > 0 && this.state.shouldShowAutocompleteMenu && (
                        <ul className="autocomplete-results-container ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all pAbs no-margin block pgBgFFF">
                            { resultsArray.map((element, index) => (
                                React.cloneElement(this.props.children, {
                                    element,
                                    index,
                                    // search query and index do make a stable unique key combination, so this eslint rule is mistaken
                                    // eslint-disable-next-line
                                    key: `${this.state.autocompleteInputValue}_${index}`,
                                    currentIndex: this.state.currentIndex,
                                    selectionHandler: this.setSelection,
                                    selectionKeyPressHandler: this.setSelectionThroughKeyPress,
                                })
                            ))}
                        </ul>
                    )}
                </div>
            );
        }

        return false;
    }
}

export default Autocomplete;
