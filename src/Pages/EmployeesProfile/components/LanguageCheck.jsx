import React, { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";

const LanguageCheckboxes = ({ handleChange, selectedLanguages }) => {
  return (
    <FormGroup>
      <Stack direction="row" flexWrap="wrap">
        {["TKM", "RUS", "ENG", "TR", "CHN", "DEU"].map((language) => (
          <FormControlLabel
            key={language}
            sx={{ height: 28 }}
            control={
              <Checkbox
                checked={selectedLanguages.includes(language)}
                onChange={handleChange}
                name={language}
              />
            }
            label={language}
          />
        ))}
      </Stack>
    </FormGroup>
  );
};

export default LanguageCheckboxes;
