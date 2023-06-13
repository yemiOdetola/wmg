import { StackActions } from '@react-navigation/native';

import * as React from 'react';

export const _navigator = React.createRef();

function navigate(name, params) {
	_navigator.current?.navigate(name, params);
}

function reset(route, params) {
	_navigator.current?.dispatch({
		...StackActions.replace(route, params)
	});
}

function pop() {
	const popAction = StackActions.pop(1);
	_navigator.current?.dispatch(popAction);
}

function popToTop() {
	_navigator.current?.dispatch(StackActions.popToTop());
}

export {
	navigate,
	reset,
	pop,
	popToTop
};
