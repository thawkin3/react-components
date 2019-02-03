import React from 'react';

// In order to support the autocomplete clickable functionality in IE, all elements below must have the "autocompleteClickableArea" class on them
const AutocompleteListItem = (props) => {
    const { element, index, currentIndex, selectionHandler, selectionKeyPressHandler } = props;
    return (
        <li
            className="autocomplete-list-item ui-menu-item left pink-text autocompleteClickableArea"
            role="menuitem"
            id={element}
        >
            <button
                className={`text-link left clr-fix ui-corner-all autocomplete-item autocompleteClickableArea ${currentIndex === index ? 'focused' : ''}`}
                tabIndex="-1"
                onClick={() => selectionHandler(element)}
                onKeyPress={e => selectionKeyPressHandler(element, e)}
            >
                <span className="autocompleteClickableArea">{element}</span>
            </button>
        </li>
    );
};

export default AutocompleteListItem;
