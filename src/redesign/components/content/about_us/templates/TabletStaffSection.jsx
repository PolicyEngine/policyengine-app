// Data imports
import { staff } from '../../../../data/Staff.js';

// Style imports
import { tabletPadding } from '../../../../style/spacing.jsx';

const wrapperStyle = {
	paddingTop: tabletPadding.top,
	paddingBottom: tabletPadding.bottom,
	paddingLeft: tabletPadding.left,
	paddingRight: tabletPadding.right,
	gap: '80px',
};

const innerStyle = {
	gap: '16px',
};

export default function TabletStaffSection(props) {

	// Define props
	const {sharedStyles} = props;

	// Map over keys from staff
	const staffKeys = Object.keys(staff);

	// Iterate over data in order to create JSX
	const staffCards = staffKeys.map( (member) => {
		return (
			<div key={member}>
				<div style={{...sharedStyles.innerStyle, ...innerStyle}}>
					<img src={staff[member].image} style={sharedStyles.imageStyle}/>
					<div style={sharedStyles.borderContainerStyle}>
						<p style={sharedStyles.textStyle}>
							{/*Please note the extra space within the span tag*/}
							<span style={sharedStyles.nameStyle}>{staff[member].name} </span>{staff[member].bio}
						</p>
					</div>
				</div>
			</div>
		)
	});

	return (
		<section style={{...sharedStyles.wrapperStyle, ...wrapperStyle}}>
			<h1 style={sharedStyles.headerStyle}>Staff</h1>
			{staffCards}
		</section>

	)




}