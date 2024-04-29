import useMobile from "../layout/Responsive";

export default function CenteredMiddleColumn(props) {
  const { title, description, marginTop, marginBottom, children } = props;
  const mobile = useMobile();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: marginTop || "20%",
      }}
    >
      <div style={{
        paddingLeft: 30,
        paddingRight: 30,
      }}
      >
        <h5 style={{fontFamily: "Roboto Serif"}}>{title}</h5>
        
        {description && <><p style={{marginBottom: 10, color: "grey", display: "inline-block"}}>Description</p><h6 style={{fontFamily: "Roboto Serif"}}>{description}</h6></>}
        {children}
      </div>
      
    </div>
  );
}
