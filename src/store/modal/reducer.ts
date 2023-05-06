import { ModalWindowState, ModalWindowAction, ModalWindowActionTypes } from './types';

const initialModalWindowState: ModalWindowState = {
	name: '',
	modalToggle: false,
};

export const modalWindowReducer = (
	state: ModalWindowState = initialModalWindowState,
	action: ModalWindowAction,
): ModalWindowState => {
	switch (action.type) {
		case ModalWindowActionTypes.SET_MODAL_NAME:
			return {
				...state,
				name: action.payload,
			};
		case ModalWindowActionTypes.SET_MODAL_TOGGLE:
			return {
				...state,
				modalToggle: action.payload,
			};
		default:
			return state;
	}
};
