import fonts from '../../../../style/fonts.jsx';
import colors from '../../../../style/colors.jsx';
import { 
	standardBorder,
	desktopPadding,
	tabletPadding,
	mobilePadding
} from '../../../../style/spacing.jsx';

/* ---------- SHARED STYLES ---------- */
const desktopImageHeight = '250px';

// Padding values and gap will be overwritten in child components
const wrapper = {
	paddingTop: '100px',
	paddingBottom: '100px',
	paddingLeft: '100px',
	paddingRight: '100px',
	display: 'flex',
	flexDirection: 'column',
	gap: '80px',
	borderBottom: standardBorder
};

const header = {
	fontFamily: fonts.HEADER_FONT,
	color: colors.BLUE_PRESSED,
	fontWeight: 'medium',
	padding: 0,
	margin: 0
};

const borderContainer = {
	height: desktopImageHeight,
	width: '100%',
	borderBottom: standardBorder,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center'
};

// Gap will be overwritten in each component;
// added here to default in case of CSS issues
const inner = {
	gap: '100px',
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	alignItems: 'center',
	justifyContent: 'center'
}

const text = {
	width: '100%',
	fontFamily: fonts.BODY_FONT,
	fontSize: '1rem',
	padding: 0,
	marginBottom: 0,
	color: colors.DARKEST_BLUE,
};

const image = {
	height: desktopImageHeight,
	aspectRatio: '1/1',
	objectFit: 'cover'
};

const name = {
	fontFamily: fonts.BODY_FONT,
	textTransform: 'uppercase',
	fontSize: '1.25rem',
	fontWeight: 600,
	paddingRight: '0.25em'
};

export const sharedStyles = {
	wrapper,
	header,
	borderContainer,
	text,
	image,
	name,
	inner
};

/* ---------- DESKTOP STYLES ---------- */

export const desktopStyles = {
	wrapper: {
		paddingTop: desktopPadding.top,
		paddingBottom: desktopPadding.bottom,
		paddingLeft: desktopPadding.left,
		paddingRight: desktopPadding.right,
		gap: '80px',
	},
	inner: {
		gap: '106px',
	}
};

/* ---------- TABLET STYLES ---------- */

export const tabletStyles = {
	wrapper: {
		paddingTop: tabletPadding.top,
		paddingBottom: tabletPadding.bottom,
		paddingLeft: tabletPadding.left,
		paddingRight: tabletPadding.right,
		gap: '80px',
	},
	inner: {
		gap: '16px',
	}
};

/* ---------- MOBILE STYLES ---------- */

export const mobileStyles = {
	wrapper: {
		paddingTop: mobilePadding.top,
		paddingBottom: mobilePadding.bottom,
		paddingLeft: mobilePadding.left,
		paddingRight: mobilePadding.right,
		gap: '48px'
	},
	inner: {
		gap: '0px',
		flexDirection: 'column',
		height: '100%',
		alignItems: 'flex-start'
	},
	image: {
		width: '60%',
		height: 'unset',
		aspectRation: '1.0'
	}
};