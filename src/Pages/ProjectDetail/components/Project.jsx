import {
  CircularProgress,
  IconButton,
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
import {
  projectTitles,
  projectTitlesForUser,
  StyledTableRow,
} from "../../../Components/utils";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjectTask,
  getProjectDetail,
} from "../../../Components/db/Redux/api/ProjectDetailSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import deleteIcon from "../../../../public/images/Delete.png";
import UpdateProjectUserModal from "./UpdateProjectUserModal";
import AddTask from "./AddTask";

const Project = ({ setProjectName, setProjectId }) => {
  const [selectedUsers, setSelectedUsers] = useState("");
  const [openUserModal, setOpenUserModal] = useState(false);
  const [workers, setWorkers] = useState([]);
  const { projectId, subId } = useParams();
  const status = useSelector((state) => state.projectDetail.status);
  const error = useSelector((state) => state.projectDetail.error);
  const data = useSelector((state) => state.projectDetail.data);
  const [allData, setAllData] = useState([data]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  useEffect(() => {
    if (status === "succeeded" && data.length) {
      setProjectName(data[0].name);
      setProjectId(data[0].id);
    }
  }, [status, data, setProjectName, setProjectId]);
  useEffect(() => {
    dispatch(getProjectDetail(projectId));
  }, [dispatch]);
  const style2 = {
    p: 2,
    textAlign: "center",
    fontFamily: "DM Sans",
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: 500,
    cursor: "pointer",
  };
  const handleChange = (elem) => {
    setOpenUserModal(true);
    setSelectedUsers(elem);
  };
  const handleDeleteProjectTask = (elem) => {
    const body = {
      projectId: projectId,
      taskId: elem.id,
      responsibleUserId: user.id,
    };
    if (elem && projectId) {
      dispatch(deleteProjectTask({ body: body, age: projectId }));
    }
  };
  return (
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
        <Stack
          sx={{
            overflow: "auto",
            height: "94%",
            minHeight: "340px",
          }}
        >
          {data.length == 0 ? (
            <Typography textAlign="center" mt={5} fontSize={18} width="100%">
              Proýekt ýok
            </Typography>
          ) : (
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
                    {projectTitlesForUser.map((elem) => (
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
                  {data.map(
                    (item) =>
                      item.tasks &&
                      item.tasks.map((elem) => (
                        <StyledTableRow key={elem.id}>
                          <TableCell
                            sx={style2}
                            onClick={() => {
                              navigate(`/projects/${projectId}/${elem.id}`);
                              localStorage.setItem(
                                "subTaskId",
                                JSON.stringify(elem)
                              );
                            }}
                          >
                            {elem.name}
                          </TableCell>
                          <TableCell
                            sx={style2}
                            onClick={() => {
                              navigate(`/projects/${projectId}/${elem.id}`);
                              localStorage.setItem(
                                "subTaskId",
                                JSON.stringify(elem)
                              );
                            }}
                          >
                            {elem.user && elem.user.name}{" "}
                            {elem.user && elem.user.surname}
                          </TableCell>
                          <TableCell
                            sx={style2}
                            onClick={() => {
                              navigate(`/projects/${projectId}/${elem.id}`);
                              localStorage.setItem(
                                "subTaskId",
                                JSON.stringify(elem)
                              );
                            }}
                          >
                            {moment(elem.startDate).format("DD.MM.YYYY")} -{" "}
                            {moment(elem.endDate).format("DD.MM.YYYY")}
                          </TableCell>
                          <TableCell
                            sx={style2}
                            onClick={() => {
                              navigate(`/projects/${projectId}/${elem.id}`);
                              localStorage.setItem(
                                "subTaskId",
                                JSON.stringify(elem)
                              );
                            }}
                          >
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
                                    width: `${elem.completionTask}%`,
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
                                {`${elem.completionTask}%`}
                              </Stack>
                            </Stack>
                          </TableCell>
                          <TableCell
                            sx={style2}
                            onClick={() => {
                              navigate(`/projects/${projectId}/${elem.id}`);
                              localStorage.setItem(
                                "subTaskId",
                                JSON.stringify(elem)
                              );
                            }}
                          >
                            {elem.priority == "Pes" ? (
                              <Typography
                                backgroundColor="#F0F7FF"
                                borderRadius="50px"
                                color="gray"
                                border="1px solid lightblue"
                                width="100%"
                                textAlign="center"
                              >
                                Pes
                              </Typography>
                            ) : elem.priority == "Orta" ? (
                              <Typography
                                border="1px solid #29D697"
                                backgroundColor="#E9FAF4"
                                borderRadius="50px"
                                color="#29D697"
                              >
                                Orta
                              </Typography>
                            ) : (
                              <Typography
                                border="1px solid #9A93FF"
                                backgroundColor="#9A93FF26"
                                borderRadius="50px"
                                color="#9A93FF"
                              >
                                Ýokary
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell
                            sx={style2}
                            onClick={() => {
                              navigate(`/projects/${projectId}/${elem.id}`);
                              localStorage.setItem(
                                "subTaskId",
                                JSON.stringify(elem)
                              );
                            }}
                          >
                            {elem.status == "Dowam edýän" ? (
                              <Typography
                                backgroundColor="#FFF1E0"
                                borderRadius="50px"
                                color="#E79124"
                                border="1px solid #E79124"
                                textAlign="center"
                              >
                                Dowam edýän
                              </Typography>
                            ) : elem.status == "Tamamlanan" ? (
                              <Typography
                                backgroundColor="#E9FAF4"
                                borderRadius="50px"
                                border="1px solid #29D697"
                                color="#29D697"
                              >
                                Tamamlanan
                              </Typography>
                            ) : (
                              <Typography
                                backgroundColor="#FFF0ED"
                                border="1px solid #FF6A54"
                                borderRadius="50px"
                                color="#FF6A54"
                              >
                                {elem.status}
                              </Typography>
                            )}
                          </TableCell>

                          <TableCell sx={{ width: "100px" }}>
                            <Stack direction="row" alignItems="end" spacing={1}>
                              <IconButton
                                sx={{
                                  ...((elem.user && elem.user.id === user.id) ||
                                  user.role === "ADMIN"
                                    ? { display: "flex" }
                                    : { display: "none" }),
                                }}
                                onClick={() =>
                                  handleChange({ task: elem, user: elem.user })
                                }
                              >
                                <BorderColorOutlinedIcon
                                  sx={{
                                    color: "#0099ED",
                                    width: 20,
                                    height: 20,
                                  }}
                                />
                              </IconButton>
                              {user.role === "USER" ? (
                                ""
                              ) : (
                                <IconButton
                                  onClick={() => handleDeleteProjectTask(elem)}
                                >
                                  <img
                                    style={{ width: 20, height: 20 }}
                                    src={deleteIcon}
                                    alt=""
                                  />
                                </IconButton>
                              )}
                            </Stack>
                          </TableCell>
                        </StyledTableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      ) : (
        ""
      )}
      <UpdateProjectUserModal
        user={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        openUserModal={openUserModal}
        handleCloseUserModal={() => setOpenUserModal(false)}
        setWorkers={setWorkers}
      />
    </Stack>
  );
};

export default Project;
