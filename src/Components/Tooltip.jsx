import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

function FadeTooltip({ data, value }) {
  return (
    <Tooltip
      title={value}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      sx={{ fontSize: 25 }}
    >
      {data}
    </Tooltip>
  );
}

export default FadeTooltip;
