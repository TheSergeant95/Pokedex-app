import maleSymbol from '../static/svg_male-symbol.svg';
import femaleSymbol from '../static/svg_female-symbol.svg';

const getGenders = (rate: number): string[] => {
	switch (rate) {
		case -1:
			return ['Unknown'];
		case 0:
			return [maleSymbol];
		case 8:
			return [femaleSymbol];
		default:
			return [femaleSymbol, maleSymbol];
	}
};

export default getGenders;
