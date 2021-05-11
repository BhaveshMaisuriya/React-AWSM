import { format, isSameMonth } from 'date-fns';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function Navbar({
	onPreviousClick,
	onNextClick,
	month,
	setStartDayOfMonth,
}) {
	const header = format(month, 'MMMM yyyy');
	setStartDayOfMonth(month);
	return (
		<div
			className='d-flex justify-content-between mt-3'
			style={{ marginBottom: '-2em' }}
		>
			<ChevronLeftIcon
				onClick={() => {
					onPreviousClick();
				}}
				style={
					!isSameMonth(month, new Date())
						? { cursor: 'pointer' }
						: { cursor: 'pointer', visibility: 'hidden' }
				}
			/>

			<div>{header.toUpperCase()}</div>
			<ChevronRightIcon
				onClick={() => {
					onNextClick();
				}}
				style={{ cursor: 'pointer' }}
			/>
		</div>
	);
}
