export interface ModalWindowState {
	name: string;
	modalToggle: boolean;
}

export enum ModalWindowActionTypes {
	SET_MODAL_NAME = 'SET_MODAL_NAME',
	SET_MODAL_TOGGLE = 'SET_MODAL_TOGGLE',
}

interface SetModalName {
	type: typeof ModalWindowActionTypes.SET_MODAL_NAME;
	payload: string;
}

interface SetModalToggle {
	type: typeof ModalWindowActionTypes.SET_MODAL_TOGGLE;
	payload: boolean;
}

export type ModalWindowAction = SetModalName | SetModalToggle;
