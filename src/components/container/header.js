import React, { Component } from 'react';
import { NavBar } from 'components/presentational/';
import $ from 'jquery';

import { connect } from 'react-redux'
import * as ACTIONS from 'redux-store/action-types';

class Header extends Component {
    onHandleClick = (e) => {
        const event_name = e.target.innerHTML;
        console.log(e.target)

        // console.log(event_name);
        // console.log($(e.target));
        $(e.target);
        if (event_name === 'Clear Grid') {
            this.props.clearGrid();
        } else if (event_name === 'Visualize') {
            const { selected } = this.props.algorithm;
            if (!selected) {
                this.props.setAlgorithm(null, null, 'Pick an Algorithm!');
                
                return;
            }
            this.props.visualizeAlgorithm(true);
        }
    };
    onHandleSelect = (e) => {
        const algo = e.target.innerHTML, 
        dropdownItemKey = e.target.dataset.key
        this.props.setAlgorithm(algo, dropdownItemKey, 'Visualize');
    };
    render() {
        // console.log(this.props);
        const { selected } = this.props.algorithm;
        const { btnVisualize, selectedDropdownItemKey } = this.props;

        return ( <
            NavBar dropDownTitle = {!selected ? 'algoritms' : selected }
            selectedDropdownItemKey = { selectedDropdownItemKey }
            btnVisualizeTitle = { btnVisualize }
            onSelect = { this.onHandleSelect }
            onClick = { this.onHandleClick }
            />
        );
    }


}


const mapStateToProps = state => ({
    algorithm: state.algorithm,
    btnVisualize: state.btnVisualize,
    selectedDropdownItemKey: state.selectedDropdownItemKey
});

function mapDispatchToProps(dispatch) {
    return {

        setAlgorithm: (algo, dropdownItemKey, title) => {
            dispatch({
                type: ACTIONS.SET_ALGORITHM,
                payload: {
                    algo: algo,
                    dropdownItemKey: dropdownItemKey,
                    btntitle: title
                }
            })
        },
        clearGrid: () => {
            dispatch({
                type: ACTIONS.RESET_GRID,
            })
        },
        visualizeAlgorithm: (visualize) => {
			dispatch({
				type: ACTIONS.VISUALIZE,
				payload: {
					visualize: visualize
				}
			});
		}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);