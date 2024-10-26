import React, { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";

const LanguageCheckboxes = ({ handleChange, selectedLanguages }) => {
  return (
    <FormGroup>
      <Stack direction="row">
        {["TKM", "RUS", "ENG"].map((language) => (
          <FormControlLabel
            key={language}
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
