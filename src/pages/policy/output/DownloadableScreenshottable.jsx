import Screenshottable from "../../../layout/Screenshottable";
import React from "react";

const DownloadableScreenshottable = React.forwardRef((props, ref) => {
  return (
    <div id="downloadable-content" ref={ref}>
      <Screenshottable {...props} />
    </div>
  );
});
DownloadableScreenshottable.displayName = "DownloadableScreenshottable";

export default DownloadableScreenshottable;
