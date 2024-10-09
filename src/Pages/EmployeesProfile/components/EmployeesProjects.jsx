import { Stack, Typography } from "@mui/material";
import React from "react";

const EmployeesProjects = ({ data }) => {
  return (
    <Stack
      backgroundColor="#fff"
      //   width="40%"
      height="380px"
      borderRadius="20px"
      pb="10px"
      boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
      p="20px"
      m="10px 15px"
    >
      <Stack
        backgroundColor="#F6FDFD"
        borderBottom="1px solid #EAEAEA"
        justifyContent="center"
        height={70}
      >
        <Typography
          fontFamily="DM Sans"
          fontWeight="600"
          fontSize={18}
          pl="20px"
        >
          Proýektler
        </Typography>
      </Stack>
      <Stack>
        {data && data.length == 0 ? (
          <Typography
            fontFamily="DM Sans"
            textAlign="center"
            mt={3}
            fontWeight="400"
            fontSize={18}
          >
            Proýekt ýok
          </Typography>
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  );
};

export default EmployeesProjects;
