import React, { useEffect, useState } from 'react';
import './ProgressBar.scss';
interface IProgressBarProps {
	value: number;
}
const ProgressBar: React.FC<IProgressBarProps> = ({ value }) => {
	const [fill, setFill] = useState(0);

	useEffect(() => {
		if (value && value > 0) {
			setFill(value);
		}
	}, [fill]);

	return (
		<div className="progress-bar">
			<div
				className="progress-bar__dynamic"
				style={{
					height: '100%',
					width: `${(fill / 255) * 100}%`,
					transition: 'width 0.5s',
				}}
			></div>
		</div>
	);
};

export default ProgressBar;
