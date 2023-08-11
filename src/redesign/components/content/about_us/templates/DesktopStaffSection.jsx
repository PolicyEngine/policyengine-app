
// Style imports
import { desktopPadding } from '../../../../style/spacing.jsx';

const wrapperStyles = {
	paddingTop: desktopPadding.top,
	paddingBottom: desktopPadding.bottom,
	paddingLeft: desktopPadding.left,
	paddingRight: desktopPadding.right
};

export default function DesktopStaffSection(/*props*/) {

	// Define props
	// const staff = {props};


	// Iterate over data in order to create JSX
	// const staffCards = staff.map( (member) => {
	// 	// Class names are temporary
	// 	<div className='staffCard'>
	// 		<img src={member.image} />
	// 		<p className='staffCard_text'>
	// 			{/*Please note the extra space within the span tag*/}
	// 			<span className='staffCard_name'>{member.name} </span>{member.bio}
	// 		</p>
	// 	</div>
	// })

	return (
		<section style={wrapperStyles}>

			<h1>Test</h1>
		</section>

	)




}