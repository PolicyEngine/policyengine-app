// Internal package imports
import { useDisplayCategory } from '../../../controls/Responsive.jsx';

// Data imports
import { staff } from '../../../../data/Staff.js';

// Template imports
import {
	sharedStyles,
	desktopStyles,
	tabletStyles,
	mobileStyles
} from '../styles/StaffSectionStyles.jsx';

// Logic and display component, which applies styles from StaffSectionStyles
export default function StaffSection() {

	const display = useDisplayCategory();
	let localStyles = null;

	// Define localStyles based on window size
	switch(display) {
		case 'desktop':
			localStyles = desktopStyles;
			break;
		case 'tablet':
			localStyles = tabletStyles;
			break;
		case 'mobile':
			localStyles = mobileStyles;
			break;
		default:
			throw new Error(`Error within useDisplayCategory() hook; 
			this may be the result of a changed or added display category`);
	}

	// Map over keys from staff
	const staffKeys = Object.keys(staff);

	// Iterate over data in order to create JSX
	const staffCards = staffKeys.map( (member) => {
		return (
			<div key={member}>
				<div style={{...sharedStyles.inner, ...localStyles.inner}}>
					<img src={staff[member].image} style={{...sharedStyles.image, ...localStyles.image}}/>
					<div style={sharedStyles.borderContainer}>
						<p style={sharedStyles.text}>
							{/*Please note the extra space within the span tag*/}
							<span style={sharedStyles.name}>{staff[member].name} </span>{staff[member].bio}
						</p>
					</div>
				</div>
			</div>
		)
	});
	
	return (
		<section style={{...sharedStyles.wrapper, ...localStyles.wrapper}}>
			<h1 style={sharedStyles.header}>Staff</h1>
			{staffCards}
		</section>
	
	)

}