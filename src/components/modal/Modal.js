import React, { Component, Fragment } from 'react';
import { CSSTransition, transit } from 'react-css-transition';

// TODO: Move this over to javascript-common later
/* element slides up when it comes in and slides down when it goes out */
const transitionStylesInUpOutDownWith50PercentFix = {
    defaultStyle: {
        transform: 'translateY(20%) translateX(-50%)',
        opacity: 0,
    },
    enterStyle: {
        transform: transit('translateY(0) translateX(-50%)', 500, 'ease'),
        opacity: transit(1, 500, 'ease'),
    },
    leaveStyle: {
        transform: transit('translateY(20%) translateX(-50%)', 500, 'ease'),
        opacity: transit(0, 500, 'ease'),
    },
    activeStyle: {
        transform: 'translateY(0) translateX(-50%)',
        opacity: 1,
    },
};

/* element fades in to 0.5 opacity when it comes in and fades out to 0 opacity when it goes out */
const transitionStylesInFadeOutFadeHalfOpacity = {
    defaultStyle: {
        opacity: 0,
    },
    enterStyle: {
        opacity: transit(0.5, 500, 'ease'),
    },
    leaveStyle: {
        opacity: transit(0, 500, 'ease'),
    },
    activeStyle: {
        opacity: 0.5,
    },
};

class ModalWithChildren extends Component {
    constructor(props) {
        super(props);

        this.state = { show: false };

        this.setShowToTrue = this.setShowToTrue.bind(this);
        this.handleTransitionComplete = this.handleTransitionComplete.bind(this);
    }

    componentDidMount() {
        this.setShowToTrue();
    }

    componentDidUpdate(prevProps, prevState) {
        const { modalIsActive, toggleModalIsActive } = this.props;
        const { show } = this.state;
        if (!prevState.show && show && !modalIsActive && !prevProps.modalIsActive && toggleModalIsActive) {
            this.props.toggleModalIsActive(true);
        }
    }

    setShowToTrue() {
        this.setState({ show: true });
    }

    handleTransitionComplete() {
        const { modalIsActive } = this.props;
        if (!modalIsActive) {
            this.setState({ show: false });
        }
    }

    render() {
        const { children, modalIsActive, toggleModalIsActive, modalTransitionStyles, additionalModalOverlayClasses, additionalModalClasses } = this.props;
        const { show } = this.state;

        if (show && children && toggleModalIsActive) {
            const transitionStyles = modalTransitionStyles || transitionStylesInUpOutDownWith50PercentFix;
            return (
                <Fragment>
                    <CSSTransition
                        className={`reactModalOverlay absFull pgBg000 ${additionalModalOverlayClasses || ''}`}
                        {...transitionStylesInFadeOutFadeHalfOpacity}
                        active={modalIsActive}
                    />
                    <CSSTransition
                        className={`reactModalWindow ${additionalModalClasses || ''}`}
                        {...transitionStyles}
                        active={modalIsActive}
                        onTransitionComplete={this.handleTransitionComplete}
                    >
                        {children}
                    </CSSTransition>
                </Fragment>
            );
        }

        return false;
    }
}

export default ModalWithChildren;

// This can be empty. It's a temporary fix to remove the error from React 16+ until the react-css-transition package updates their code and we can pull in a new version
CSSTransition.childContextTypes = {};
