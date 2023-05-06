import { ModalWindowAction, ModalWindowActionTypes } from './types';

export const SetModalName = (name: string): ModalWindowAction => ({
	type: ModalWindowActionTypes.SET_MODAL_NAME,
	payload: name,
});

export const SetModalToggle = (toggle: boolean): ModalWindowAction => ({
	type: ModalWindowActionTypes.SET_MODAL_TOGGLE,
	payload: toggle,
});
