export default function DesktopView(props) {
  // Uses CSS to only show the desktop view when the screen is large enough.
  const { children } = props;
  return <div className="d-none d-lg-block">{children}</div>;
}
