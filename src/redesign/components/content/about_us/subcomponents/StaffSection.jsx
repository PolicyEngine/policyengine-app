
// Internal package imports
import { useDisplayCategory } from '../../../controls/Responsive.jsx';

// Responsive template imports
import DesktopStaffSection from '../templates/DesktopStaffSection.jsx';
import TabletStaffSection from '../templates/TabletStaffSection.jsx';
// import MobileStaffSection from '../templates/MobileStaffSection.jsx';

// Data imports

// Style imports
import fonts from '../../../../style/fonts.jsx';
import colors from '../../../../style/colors.jsx';
import { standardBorder } from '../../../../style/spacing.jsx';

// Constants
const DESKTOP = 'desktop';
const TABLET = 'tablet';
const MOBILE = 'mobile';

// Shared styles
const imageHeight = '250px';

// Padding values and gap will be overwritten in child components
const wrapperStyle = {
	paddingTop: '100px',
	paddingBottom: '100px',
	paddingLeft: '100px',
	paddingRight: '100px',
	display: 'flex',
	flexDirection: 'column',
	gap: '80px',
	borderBottom: standardBorder
};

const headerStyle = {
	fontFamily: fonts.HEADER_FONT,
	color: colors.BLUE_PRESSED,
	fontWeight: 'medium',
	padding: 0,
	margin: 0
};

const borderContainerStyle = {
	height: imageHeight,
	width: '100%',
	borderBottom: standardBorder,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center'
};

// Gap will be overwritten in each component;
// added here to default in case of CSS issues
const innerStyle = {
	gap: '100px',
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	alignItems: 'center',
	justifyContent: 'center'
}

const textStyle = {
	width: '100%',
	fontFamily: fonts.BODY_FONT,
	fontSize: '1rem',
	padding: 0,
	marginBottom: 0,
	color: colors.DARKEST_BLUE,
};

const imageStyle = {
	height: imageHeight,
	aspectRatio: '1/1',
	objectFit: 'cover'
};

const nameStyle = {
	fontFamily: fonts.BODY_FONT,
	textTransform: 'uppercase',
	fontSize: '1.25rem',
	fontWeight: 600
};

const sharedStyles = {
	wrapperStyle,
	headerStyle,
	borderContainerStyle,
	textStyle,
	imageStyle,
	nameStyle,
	innerStyle
};

// Shared styling component for the entirety of the staff section, which delegates to
// breakpoint components that handle logic
export default function StaffSection() {

	const display = useDisplayCategory();
	if (display === DESKTOP) {
		return (<DesktopStaffSection sharedStyles={sharedStyles}/>);
	}
	// The below will be implemented when the components exist
	else if (display === TABLET) {
		return (<TabletStaffSection sharedStyles={sharedStyles} />);
	}
	else if (display === MOBILE) {
		return (<></>)
	}

}