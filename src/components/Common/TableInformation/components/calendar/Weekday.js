import React, { useEffect } from 'react';
import 'react-day-picker/lib/style.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import getArrayDays from './monthArr';

export default function Weekday({
	weekday,
	className,
	localeUtils,
	locale,
	setDaynames,
	setIsMulti,
	daynames,
	selectedMulti,
	setSelectedMulti,
	calendarMonth,
}) {
	const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);

	function handleClickAway() {
		setIsMulti(false);
	}
	useEffect(() => {
		const arrSelected = daynames.map((dayname) => {
			const arr = getArrayDays(calendarMonth, dayname);
			return arr;
		});
		// console.log(arrSelected.flat());

		setSelectedMulti(arrSelected.flat());
	}, [daynames.length]);
	// console.log(selectedMulti);

	const onSelectDayName = (day) => {
		const newDaynames = [...daynames];
		const index = newDaynames.indexOf(day);
		if (index >= 0) {
			newDaynames.splice(index, 1);
		} else {
			newDaynames.push(day);
		}
		setDaynames(newDaynames);
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div
				className={className}
				title={weekdayName}
				style={{ cursor: 'pointer' }}
				onClick={() => {
					setIsMulti(true);
					onSelectDayName(weekdayName);
				}}
			>
				<abbr>{weekdayName.slice(0, 2)}</abbr>
			</div>
		</ClickAwayListener>
	);
}
