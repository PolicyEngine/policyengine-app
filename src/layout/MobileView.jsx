export default function MobileView(props) {
  // Uses CSS to only show the mobile view when the screen is small enough.
  const { children } = props;
  return <div className="d-lg-none">{children}</div>;
}
