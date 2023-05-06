const titleCase = (str: string): string => {
	const splitStr = str.split('-');
	for (let i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);
	}
	return splitStr.join(' ');
};

export default titleCase;
