import React from 'react';
import DayPicker from 'react-day-picker';
import './basic.scss';

import 'react-day-picker/lib/style.css';
import Weekday from './Weekday';
import Navbar from './NavBar';

const SinglePicker = ({
	daynames,
	setDaynames,
	setStartDayOfMonth,
	setIsMulti,
	onSelectDayName,
	selectedMulti,
	setSelectedMulti,
	calendarMonth,
	selectedDay,
	handleDayClick,
}) => {
	return (
		<DayPicker
			onDayClick={handleDayClick}
			selectedDays={selectedDay}
			weekdayElement={
				<Weekday
					daynames={daynames}
					setDaynames={setDaynames}
					setIsMulti={setIsMulti}
					onSelectDayName={onSelectDayName}
					selectedMulti={selectedMulti}
					setSelectedMulti={setSelectedMulti}
					calendarMonth={calendarMonth}
				/>
			}
			navbarElement={<Navbar setStartDayOfMonth={setStartDayOfMonth} />}
			disabledDays={[
				{
					before: new Date(),
				},
			]}
		/>
	);
};
export default SinglePicker;
