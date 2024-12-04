import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { Grow, Zoom } from "@mui/material";

function FadeTooltip({ data, value }) {
  return (
    <Tooltip
      title={value}
      TransitionComponent={Grow}
      TransitionProps={{ timeout: 600 }}
      sx={{ fontSize: 25 }}
      placement="right"
      arrow
    >
      {data}
    </Tooltip>
  );
}

export default FadeTooltip;
