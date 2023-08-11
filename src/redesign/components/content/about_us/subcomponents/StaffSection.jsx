
// Internal package imports
import { useDisplayCategory } from '../../../controls/Responsive.jsx';

// Responsive template imports
import DesktopStaffSection from '../templates/DesktopStaffSection.jsx';
// import TabletStaffSection from '../templates/TabletStaffSection.jsx';
// import MobileStaffSection from '../templates/MobileStaffSection.jsx';

// Data imports
import { staff } from '../../../../data/Staff.js';

// Constants
const DESKTOP = 'desktop';
const TABLET = 'tablet';
const MOBILE = 'mobile';

// Logic component for the entirety of the staff section, which delegates to
// template components for each breakpoint
export default function StaffSection() {

	const display = useDisplayCategory();
	if (display === DESKTOP) {
		return (<DesktopStaffSection staff={staff}/>);
	}
	// The below will be implemented when the components exist
	else if (display === TABLET) {
		return (<></>);
	}
	else if (display === MOBILE) {
		return (<></>)
	}

}