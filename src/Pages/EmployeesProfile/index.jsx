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
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getUserMonthWorkTime } from "../../Components/db/Redux/api/ComeTimeSlice";
import moment from "moment";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import UserInfo from "./components/UserInfo";
import {
  personalItems,
  personalItems2,
  personalItemsWithTime,
} from "../../Components/utils";
import EmployeesProjects from "./components/EmployeesProjects";
import Projects from "../Projects/components/Projects";
import UserProjects from "./UserProjects";
import Project from "../UserProjects/components/Project";
import ProjectDetail from "../ProjectDetail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomDatePicker from "../Employees/components/Datepicker";
import dayjs from "dayjs";

const Index = () => {
  const [date, setDate] = useState(dayjs());

  const [projectName, setProjectName] = useState("");
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.getWorkDate.statusMonth);
  const error = useSelector((state) => state.getWorkDate.errorMonth);
  const data = useSelector((state) => state.getWorkDate.employeerTime);
  const params = searchParams.get("date");

  // State to track which day is expanded
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => {
    const body = {
      userId: id,
      date: moment(date).format("YYYY-MM-DD"),
    };
    dispatch(getUserMonthWorkTime(body));
  }, [date, dispatch]);

  const handleExpandClick = (day) => {
    setExpandedDay((prevDay) => (prevDay === day ? null : day));
  };
  console.log(data.user);

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
          note: entry.note,
          workSessions: [],
        };
      }

      if (entry.comeTime && entry.id) {
        const comeDate = new Date(entry.comeTime);
        const leaveDate = new Date(entry.leaveTime);
        let diffMinutes = (leaveDate - comeDate) / (1000 * 60);
        if (diffMinutes < 0) {
          diffMinutes = 0;
        }
        acc[date].totalMinutes += diffMinutes;
        acc[date].workSessions.push({
          comeTime: entry.comeTime,
          leaveTime: entry.leaveTime,
          duration: diffMinutes,
          note: entry.note,
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
        if (!acc[date].note && entry.note) {
          acc[date].note = entry.note;
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
  console.log(data);

  const calculateLateTime = (comeTime, referenceStartTime) => {
    if (!referenceStartTime) {
      console.error("Reference start time is null or undefined");
      return null;
    }
    const comeDate = new Date(comeTime);
    const referenceDate = new Date(comeTime);

    const [refHours, refMinutes] = referenceStartTime.split(":").map(Number);
    referenceDate.setHours(refHours, refMinutes, 0, 0);

    if (comeDate > referenceDate) {
      const lateMilliseconds = comeDate - referenceDate;
      const lateMinutes = Math.floor(lateMilliseconds / (1000 * 60));
      const lateHours = Math.floor(lateMinutes / 60);
      const remainingMinutes = lateMinutes % 60;

      return lateMinutes;
    }

    return null;
  };

  const calculateTotalLateTime = (times, referenceStartTime) => {
    return times.reduce((total, comeTime) => {
      return total + calculateLateTime(comeTime, referenceStartTime);
    }, 0);
  };

  const totalLateTime =
    status === "succeeded" &&
    calculateTotalLateTime(
      data.employeerTime?.map((item) => item.comeTime) || [],
      data.user?.workTime?.startTime || null
    );
  console.log("Total Late Time:", totalLateTime);

  const totalData = personalItems2(data, totalLateTime);
  console.log(totalData);

  const userWorkTime = personalItemsWithTime(
    data.user?.workTime?.startTime || null,
    data.user?.workTime?.endTime || null
  );
  console.log(userWorkTime);

  return (
    <Box backgroundColor="#fff" overflow="auto" height="100vh">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        pr={2}
        // p="0 10px 0 0"
      >
        <Link
          to="#"
          onClick={() => navigate(-1)}
          style={{
            textDecoration: "none",
            color: "#474747",
            display: "flex",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <ArrowBackIcon />
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
        <CustomDatePicker selectedDay={date} setDateNote={setDate} />
      </Stack>

      <Stack
        pb={1}
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
          // pb="20px"
          boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
        >
          <Stack width="100%">
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
              <TableContainer
                sx={{
                  height: "82.5vh",
                  overflowY: "scroll",
                  borderRadius: "20px",
                }}
                className="times2"
              >
                <Table sx={{ justifyContent: "space-between", height: "100%" }}>
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
                      {userWorkTime.map((elem) => (
                        <TableCell
                          sx={{
                            color: "#222222",
                            fontWeight: 500,
                            fontSize: 14,
                            textAlign: "center",
                            p: 1.4,
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
                          <TableCell
                            sx={{
                              ...style2,
                              direction: "row",
                              justifyContent: "space-between",
                            }}
                          >
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
                              <Typography color="tomato">-</Typography>
                            ) : (
                              moment(user.lastLeaveTime).format("HH:mm")
                            )}
                          </TableCell>
                          <TableCell sx={style2}>
                            {
                              // user.leaveTime != null?
                              `${user.totalHours}:${user.totalMinutes}`
                              // : ""
                            }
                          </TableCell>

                          <TableCell sx={{ ...style2, color: "tomato" }}>
                            {(() => {
                              const lateTime = calculateLateTime(
                                user.firstComeTime,
                                data?.user?.workTime?.startTime || null // Safe chaining and fallback
                              );

                              return lateTime
                                ? `${
                                    Math.floor(lateTime / 60) > 0
                                      ? `${Math.floor(lateTime / 60)}(sag):`
                                      : ""
                                  }${lateTime % 60}(min)`
                                : "-";
                            })()}
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
                                      <TableCell>Belligi</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {user.workSessions.map((session, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell>
                                          {session.comeTime
                                            ? moment(session.comeTime).format(
                                                "HH:mm"
                                              )
                                            : "-"}
                                        </TableCell>
                                        <TableCell>
                                          {session.leaveTime
                                            ? moment(session.leaveTime).format(
                                                "HH:mm"
                                              )
                                            : "-"}
                                        </TableCell>
                                        <TableCell>
                                          {session.leaveTime
                                            ? `${Math.floor(
                                                session.duration / 60
                                              )}(sag):${Math.ceil(
                                                session.duration % 60
                                              )}(min)`
                                            : "-"}
                                        </TableCell>
                                        <TableCell>
                                          {session.note ? session.note : ""}
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

                  <TableRow
                    sx={{
                      backgroundColor: "#F6FDFD",
                      fontFamily: "DM Sans",
                      position: "sticky",
                      bottom: 0,
                      zIndex: 100,
                      boxShadow: "0px -2px 10px 0px rgba(199,199,199,1)",
                      height: 35,
                      p: 0,
                      width: "100%",
                    }}
                  >
                    {totalData.map((elem) => (
                      <TableCell
                        sx={{
                          color: "#222222",
                          fontWeight: 500,
                          fontSize: 14,
                          textAlign: "center",
                          boxShadow: "0px -6px 9px 0px rgba(199,199,199,1)",
                          p: 0.6,
                        }}
                      >
                        {elem.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </Table>
              </TableContainer>
            ) : (
              ""
            )}
          </Stack>
        </Stack>
      </Stack>
      <UserProjects data={data.user} />
    </Box>
  );
};

export default Index;
