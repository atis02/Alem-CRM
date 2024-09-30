// import {
//   Box,
//   Button,
//   CircularProgress,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import {
//   items,
//   personalItems,
//   StyledTableRow,
//   user,
// } from "../../Components/utils";
// import { getUserMonthWorkTime } from "../../Components/db/Redux/api/ComeTimeSlice";
// import moment from "moment";
// import UserInfo from "./components/UserInfo";

// const index = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const status = useSelector((state) => state.getWorkDate.statusMonth);
//   const error = useSelector((state) => state.getWorkDate.errorMonth);
//   const data = useSelector((state) => state.getWorkDate.employeerTime);
//   console.log(data);

//   useEffect(() => {
//     const body = {
//       userId: id,
//       date: moment().format("YYYY-MM-DD"),
//     };
//     dispatch(getUserMonthWorkTime(body));
//   }, [dispatch]);
//   const style2 = {
//     p: 1,
//     textAlign: "center",
//     fontFamily: "DM Sans",
//     maxWidth: "150px",
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     textAlign: "center",
//   };

//   const workHoursByDate =
//     status === "succeeded" &&
//     data.employeerTime.reduce((acc, entry) => {
//       const date = new Date(entry.comeTime).toISOString().split("T")[0];

//       if (!acc[date]) {
//         acc[date] = {
//           totalMinutes: 0,
//           firstComeTime: entry.comeTime,
//           lastLeaveTime: entry.leaveTime,
//           workSessions: [],
//           note: entry.note,
//         };
//       }

//       if (entry.leaveTime) {
//         const comeDate = new Date(entry.comeTime);
//         const leaveDate = new Date(entry.leaveTime);
//         const diffMinutes = (leaveDate - comeDate) / (1000 * 60); // Difference in minutes
//         acc[date].totalMinutes += diffMinutes;
//         acc[date].workSessions.push({
//           comeTime: entry.comeTime,
//           leaveTime: entry.leaveTime,
//           duration: diffMinutes,
//         });

//         if (acc[date].firstComeTime > entry.comeTime) {
//           acc[date].firstComeTime = entry.comeTime;
//         }
//         if (
//           !acc[date].lastLeaveTime ||
//           acc[date].lastLeaveTime < entry.leaveTime
//         ) {
//           acc[date].lastLeaveTime = entry.leaveTime;
//         }
//       }

//       return acc;
//     }, {});

//   const result = Object.keys(workHoursByDate).map((date) => {
//     const { totalMinutes, firstComeTime, lastLeaveTime, note } =
//       workHoursByDate[date];
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;

//     return {
//       date,
//       totalHours: hours,
//       totalMinutes: Math.ceil(minutes),
//       firstComeTime,
//       lastLeaveTime,
//       workSessions: workHoursByDate[date].workSessions,
//       note,
//     };
//   });

//   console.log(result);

//   return (
//     <Box height="100%" width="100%" backgroundColor="#f2f9fc" overflow="auto">
//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//         p="0 10px 0 0"
//       >
//         <Link
//           to="#"
//           onClick={() => navigate(-1)}
//           style={{
//             textDecoration: "none",
//             color: "#474747",
//           }}
//         >
//           <Typography
//             p="5px 10px"
//             fontSize="20px"
//             fontFamily="Montserrat"
//             fontWeight="600"
//             sx={{
//               "&:hover": { textDecoration: "underline" },
//             }}
//           >
//             Işgärler / Profili
//           </Typography>
//         </Link>
//         {/* <Stack direction="row" alignItems="center" spacing={1}>
//           <Button
//             sx={{
//               color: "#9A93FF",
//               textTransform: "revert",
//               background: "#e7e7fb",
//               "&:hover": { background: "#e7e7fb" },
//               gap: "10px",
//               width: 190,
//               height: 45,
//               borderRadius: "20px",
//             }}
//             variant="outlined"
//             // onClick={handleOpen}
//           >
//             Işgär goşmak
//           </Button>
//         </Stack> */}
//       </Stack>
//       <Stack
//         p={1}
//         direction="row"
//         alignItems="center"
//         justifyContent="space-around"
//       >
//         <UserInfo data={status === "succeeded" && data} />
//         <Stack
//           backgroundColor="#fff"
//           width="57%"
//           height="82vh"
//           borderRadius="20px"
//           pb="20px"
//           boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
//         >
//           <ToastContainer />

//           <Stack>
//             {status === "loading..." ? (
//               <Stack
//                 direction="column"
//                 height="90%"
//                 alignItems="center"
//                 sx={{ gap: "10px", mt: 10 }}
//               >
//                 <CircularProgress />
//                 Loading...
//               </Stack>
//             ) : status === "failed" ? (
//               toast.error(error)
//             ) : status === "succeeded" ? (
//               <Stack>
//                 {
//                   <TableContainer
//                     sx={{
//                       height: "79vh",
//                       overflowY: "scroll",
//                       borderRadius: "20px",
//                     }}
//                     className="times2"
//                   >
//                     <Table>
//                       <TableHead>
//                         <TableRow
//                           sx={{
//                             backgroundColor: "#F6FDFD",
//                             fontFamily: "DM Sans",
//                             position: "sticky",
//                             top: 0,
//                             boxShadow: " 0px 12px 7px -14px rgba(71,71,71,1)",
//                           }}
//                         >
//                           {personalItems.map((elem) => (
//                             <TableCell
//                               sx={{
//                                 color: "#222222",
//                                 fontWeight: 500,
//                                 fontSize: 14,
//                                 textAlign: "center",
//                               }}
//                               key={elem.id}
//                             >
//                               {elem.title}
//                             </TableCell>
//                           ))}
//                         </TableRow>
//                       </TableHead>

//                       <TableBody>
//                         {result.map((user, index) => (
//                           <StyledTableRow key={user.id}>
//                             <TableCell sx={style2}>
//                               {moment(user.date).format("DD.MM.YYYY")}
//                             </TableCell>

//                             <TableCell sx={style2}>
//                               {moment(user.firstComeTime).format("HH:mm")}
//                             </TableCell>
//                             <TableCell sx={style2}>
//                               {moment(user.lastLeaveTime).format("HH:mm")}
//                             </TableCell>

//                             <TableCell sx={style2}>
//                               {user.totalHours}:{user.totalMinutes}
//                             </TableCell>
//                             <TableCell sx={{ ...style2, color: "tomato" }}>
//                               {new Date(user.firstComeTime).getHours() >= 9
//                                 ? new Date(user.firstComeTime).getHours() -
//                                   9 +
//                                   ":" +
//                                   new Date(user.firstComeTime).getMinutes()
//                                 : ""}
//                             </TableCell>
//                             <TableCell sx={style2}>{user.note}</TableCell>
//                           </StyledTableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 }
//               </Stack>
//             ) : (
//               ""
//             )}
//           </Stack>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// };

// export default index;

import {
  Box,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getUserMonthWorkTime } from "../../Components/db/Redux/api/ComeTimeSlice";
import moment from "moment";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import UserInfo from "./components/UserInfo";
import { personalItems } from "../../Components/utils";

const Index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.getWorkDate.statusMonth);
  const error = useSelector((state) => state.getWorkDate.errorMonth);
  const data = useSelector((state) => state.getWorkDate.employeerTime);

  // State to track which day is expanded
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => {
    const body = {
      userId: id,
      date: moment().format("YYYY-MM-DD"),
    };
    dispatch(getUserMonthWorkTime(body));
  }, [dispatch]);

  const handleExpandClick = (day) => {
    setExpandedDay((prevDay) => (prevDay === day ? null : day));
  };

  const style2 = {
    p: 0,
    textAlign: "center",
    fontFamily: "DM Sans",
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const workHoursByDate =
    status === "succeeded" &&
    data.employeerTime.reduce((acc, entry) => {
      const date = new Date(entry.comeTime).toISOString().split("T")[0];

      if (!acc[date]) {
        acc[date] = {
          totalMinutes: 0,
          firstComeTime: entry.comeTime,
          lastLeaveTime: entry.leaveTime,
          workSessions: [],
          note: entry.note,
        };
      }

      if (entry.leaveTime) {
        const comeDate = new Date(entry.comeTime);
        const leaveDate = new Date(entry.leaveTime);
        const diffMinutes = (leaveDate - comeDate) / (1000 * 60); // Difference in minutes
        acc[date].totalMinutes += diffMinutes;
        acc[date].workSessions.push({
          comeTime: entry.comeTime,
          leaveTime: entry.leaveTime,
          duration: diffMinutes,
        });

        if (acc[date].firstComeTime > entry.comeTime) {
          acc[date].firstComeTime = entry.comeTime;
        }
        if (
          !acc[date].lastLeaveTime ||
          acc[date].lastLeaveTime < entry.leaveTime
        ) {
          acc[date].lastLeaveTime = entry.leaveTime;
        }
      }

      return acc;
    }, {});

  const result = Object.keys(workHoursByDate).map((date) => {
    const { totalMinutes, firstComeTime, lastLeaveTime, note } =
      workHoursByDate[date];
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return {
      date,
      totalHours: hours,
      totalMinutes: Math.ceil(minutes),
      firstComeTime,
      lastLeaveTime,
      workSessions: workHoursByDate[date].workSessions,
      note,
    };
  });
  console.log(result);

  return (
    <Box height="100%" width="100%" backgroundColor="#f2f9fc" overflow="auto">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p="0 10px 0 0"
      >
        <Link
          to="#"
          onClick={() => navigate(-1)}
          style={{
            textDecoration: "none",
            color: "#474747",
          }}
        >
          <Typography
            p="5px 10px"
            fontSize="20px"
            fontFamily="Montserrat"
            fontWeight="600"
            sx={{
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Işgärler / Profili
          </Typography>
        </Link>
      </Stack>
      <Stack
        p={1}
        direction="row"
        alignItems="center"
        justifyContent="space-around"
      >
        <UserInfo data={data} />
        <Stack
          backgroundColor="#fff"
          width="57%"
          height="82vh"
          borderRadius="20px"
          pb="20px"
          boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
        >
          <ToastContainer />

          <Stack>
            {status === "loading..." ? (
              <Stack
                direction="column"
                height="90%"
                alignItems="center"
                sx={{ gap: "10px", mt: 10 }}
              >
                <CircularProgress />
                Loading...
              </Stack>
            ) : status === "failed" ? (
              toast.error(error)
            ) : status === "succeeded" ? (
              <Stack>
                <TableContainer
                  sx={{
                    height: "79vh",
                    overflowY: "scroll",
                    borderRadius: "20px",
                  }}
                  className="times2"
                >
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          backgroundColor: "#F6FDFD",
                          fontFamily: "DM Sans",
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          boxShadow: " 0px 12px 7px -14px rgba(71,71,71,1)",
                        }}
                      >
                        {personalItems.map((elem) => (
                          <TableCell
                            sx={{
                              color: "#222222",
                              fontWeight: 500,
                              fontSize: 14,
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
                      {result.map((user, index) => (
                        <>
                          <TableRow key={user.date}>
                            <TableCell sx={style2}>
                              <IconButton
                                onClick={() => handleExpandClick(user.date)}
                              >
                                {expandedDay === user.date ? (
                                  <KeyboardArrowUp />
                                ) : (
                                  <KeyboardArrowDown />
                                )}
                              </IconButton>
                              {moment(user.date).format("DD.MM.YYYY")}
                            </TableCell>
                            <TableCell sx={style2}>
                              {moment(user.firstComeTime).format("HH:mm")}
                            </TableCell>
                            <TableCell sx={style2}>
                              {user.lastLeaveTime == null ? (
                                <Typography color="tomato">
                                  Bellik ýok
                                </Typography>
                              ) : (
                                moment(user.lastLeaveTime).format("HH:mm")
                              )}
                            </TableCell>
                            <TableCell sx={style2}>
                              {user.totalHours}:{user.totalMinutes}
                            </TableCell>
                            <TableCell sx={{ ...style2, color: "tomato" }}>
                              {new Date(user.firstComeTime).getHours() >= 9
                                ? new Date(user.firstComeTime).getHours() -
                                  9 +
                                  ":" +
                                  new Date(user.firstComeTime).getMinutes()
                                : ""}
                            </TableCell>
                            <TableCell sx={style2}>{user.note}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              colSpan={7}
                              sx={{ paddingBottom: 0, paddingTop: 0 }}
                            >
                              <Collapse
                                in={expandedDay === user.date}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Box margin={1}>
                                  <Typography variant="h6">
                                    Işlän wagtlary:
                                  </Typography>
                                  <Table size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Gelen wagty</TableCell>
                                        <TableCell>Giden wagty</TableCell>
                                        <TableCell>Işlän sagady</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {user.workSessions.map((session, idx) => (
                                        <TableRow key={idx}>
                                          <TableCell>
                                            {moment(session.comeTime).format(
                                              "HH:mm"
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            {moment(session.leaveTime).format(
                                              "HH:mm"
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            {Math.floor(session.duration / 60)}:
                                            {Math.ceil(session.duration % 60)}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            ) : (
              ""
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Index;
