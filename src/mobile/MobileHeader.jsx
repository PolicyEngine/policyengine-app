import { TopLeftLogo, HEADER_HEIGHT } from "../Header";
import style from "../style";
import Spinner from "../layout/Spinner";

export default function MobileHeader(props) {
  // The top header bar, with the logo, search bar and social links
  const { countryId, loading } = props;
  return (
    <>
      <div
        style={{
          backgroundColor: style.colors.BLUE,
          height: HEADER_HEIGHT,
          paddingLeft: 10,
          position: "fixed",
          width: "100%",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TopLeftLogo countryId={countryId} />
        {loading && (
          <div
            style={{
              paddingLeft: 20,
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Spinner style={{ color: "white", fontSize: 30 }} />
          </div>
        )}
      </div>
      <div style={{ height: HEADER_HEIGHT }} />
    </>
  );
}
