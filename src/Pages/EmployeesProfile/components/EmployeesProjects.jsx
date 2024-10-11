import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { projectTitlesFor, StyledTableRow } from "../../../Components/utils";
import moment from "moment";

const EmployeesProjects = ({ data }) => {
  const [projects, setProjects] = useState(data);
  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data]);
  const style2 = {
    p: 2,
    textAlign: "center",
    fontFamily: "DM Sans",
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: 500,
  };
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
        {projects && projects.length == 0 ? (
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
          <Stack
            sx={{
              overflow: "auto",
              height: "94%",
              minHeight: "340px",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#fff",
                      fontFamily: "DM Sans",
                      position: "sticky",
                      top: 0,
                      zIndex: 100,
                      boxShadow: " 0px 12px 7px -14px rgba(71,71,71,1)",
                    }}
                  >
                    {projectTitlesFor.map((elem) => (
                      <TableCell
                        sx={{
                          fontFamily: "DM Sans",
                          color: "#222222",
                          fontWeight: 600,
                          fontSize: 16,
                          textAlign: "center",
                        }}
                        key={elem.id}
                      >
                        {elem.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {projects &&
                    projects.map((elem, index) => (
                      <StyledTableRow key={index} sx={{ cursor: "pointer" }}>
                        <TableCell sx={style2}>{elem.name}</TableCell>
                        <TableCell sx={style2}>
                          {moment(elem.startDate).format("DD.MM.YYYY")} -{" "}
                          {moment(elem.endDate).format("DD.MM.YYYY")}
                        </TableCell>
                        <TableCell sx={style2}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.3}
                          >
                            <Stack
                              sx={{
                                width: "80%",
                                height: "14px",
                                backgroundColor: "#DDDDDD",
                                borderRadius: "100px",
                                gap: "10px",
                              }}
                              direction="row"
                            >
                              <Stack
                                style={{
                                  width: `${Math.floor(elem.completion)}%`,
                                  height: "14px",
                                  backgroundColor: "#00B69B",
                                  borderRadius: "100px",
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              ></Stack>
                            </Stack>
                            <Stack
                              style={{
                                fontSize: 13,

                                color: "#00B69B",
                              }}
                            >
                              {`${Math.floor(elem.completion)}%`}
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell
                          sx={{
                            ...style2,
                          }}
                        >
                          {elem.priority == "Pes" ? (
                            <Typography
                              backgroundColor="#d4f4fc"
                              borderRadius="50px"
                              color="gray"
                              width="100%"
                              textAlign="center"
                            >
                              Pes
                            </Typography>
                          ) : elem.priority == "Orta" ? (
                            <Typography
                              backgroundColor="#E9FAF4"
                              borderRadius="50px"
                              color="#29D697"
                            >
                              Orta
                            </Typography>
                          ) : (
                            <Typography
                              backgroundColor="#9A93FF26"
                              borderRadius="50px"
                              color="#9A93FF"
                            >
                              Ýokary
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell sx={style2}>
                          {elem.status == "Dowam edýän" ? (
                            <Typography
                              backgroundColor="#FFF1E0"
                              borderRadius="50px"
                              color="#E79124"
                              width="100%"
                              textAlign="center"
                            >
                              Dowam edýän
                            </Typography>
                          ) : elem.status == "Tamamlanan" ? (
                            <Typography
                              backgroundColor="#E9FAF4"
                              borderRadius="50px"
                              color="#29D697"
                            >
                              Tamamlanan
                            </Typography>
                          ) : (
                            <Typography
                              backgroundColor="#FFF0ED"
                              borderRadius="50px"
                              color="#FF6A54"
                            >
                              {elem.status}
                            </Typography>
                          )}
                        </TableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default EmployeesProjects;
