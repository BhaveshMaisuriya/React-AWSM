import {
	isMonday,
	isTuesday,
	isWednesday,
	isThursday,
	isFriday,
	isSaturday,
	isSunday,
} from 'date-fns';
import { DateUtils } from 'react-day-picker';

export default function getArrayDays(month, dayname) {
	switch (dayname) {
		case 'Monday':
			return month.filter(
				(day) => isMonday(day) && !DateUtils.isPastDay(day, new Date())
			);
		case 'Tuesday':
			return month.filter(
				(day) => isTuesday(day) && !DateUtils.isPastDay(day, new Date())
			);
		case 'Wednesday':
			return month.filter(
				(day) => isWednesday(day) && !DateUtils.isPastDay(day, new Date())
			);
		case 'Thursday':
			return month.filter(
				(day) => isThursday(day) && !DateUtils.isPastDay(day, new Date())
			);
		case 'Friday':
			return month.filter(
				(day) => isFriday(day) && !DateUtils.isPastDay(day, new Date())
			);
		case 'Saturday':
			return month.filter(
				(day) => isSaturday(day) && !DateUtils.isPastDay(day, new Date())
			);
		case 'Sunday':
			return month.filter(
				(day) => isSunday(day) && !DateUtils.isPastDay(day, new Date())
			);
		default:
			break;
	}
}
