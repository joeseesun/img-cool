import process from 'node:process';
import arch from 'arch';

const check = (bool, key, value) => !bool || !key || key === value;

const osFilterObj = input => {
	return input.filter(x => {
		return [process.platform, arch()].every(
			(y, i) => check(i === 0, x.os, y) && check(i === 1, x.arch, y),
		);
	});
};

export default osFilterObj;
