import React from 'react';
import './Spinner.scss';
import './SpinnerList.scss';
import icon from '../../../static/png_pokeball-icon-min.png';

interface ISpinner {
	text: string;
	mainPage: boolean;
}

const Spinner: React.FC<ISpinner> = ({ text, mainPage }) => {
	return (
		<div className={mainPage ? 'spinner' : 'spinner-list'}>
			<div className={mainPage ? 'spinner__container' : 'spinner-list__container'}>
				<img
					className={mainPage ? 'spinner__icon' : 'spinner-list__icon'}
					src={icon}
					alt={'spinner'}
				/>
				<div className={mainPage ? 'spinner__title' : 'spinner-list__title'}>{text}</div>
			</div>
		</div>
	);
};

export default Spinner;
