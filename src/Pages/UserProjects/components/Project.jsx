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
  projectTitlesFor,
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
// import UpdateProjectUserModal from "./UpdateProjectUserModal";
import {
  deleteProject,
  deleteProjectForUser,
  getProjectForUser,
} from "../../../Components/db/Redux/api/ProjectSlice";
import UpdateProjectUserModal from "../../ProjectDetail/components/UpdateProjectUserModal";
import UpdateModalComponent from "./UpdateProjectUserModal";

const Project = ({ setProjectName }) => {
  const [selectedUsers, setSelectedUsers] = useState("");
  const [openUserModal, setOpenUserModal] = useState(false);
  const [workers, setWorkers] = useState([]);
  const { id } = useParams();
  const status = useSelector((state) => state.projectDetail.status);
  const error = useSelector((state) => state.projectDetail.error);
  const data = useSelector((state) => state.projectDetail.data);
  const [allData, setAllData] = useState([data]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProjectForUser(user.id));
  }, [dispatch]);

  status === "succeeded" ? setProjectName(data) : "";
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
  const handleChange = (elem) => {
    setOpenUserModal(true);
    setSelectedUsers(elem);
  };
  // const handleDeleteProjectTask = (elem) => {
  //   const body = {
  //     projectId: id,
  //     taskId: elem.id,
  //     responsibleUserId: user.id,
  //   };
  //   console.log(elem);

  //   if (elem && id) {
  //     dispatch(deleteProjectTask({ body: body, age: id }));
  //   }
  // };
  const handleDeleteProject = (id) => {
    if (id) {
      const body = {
        projectId: id,
        responsibleUserId: user.id,
      };
      dispatch(deleteProjectForUser(body));
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
                  {data.map((elem, index) => (
                    <StyledTableRow key={index} sx={{ cursor: "pointer" }}>
                      <TableCell
                        onClick={() =>
                          navigate(
                            `/projects/${
                              elem.project_id ? elem.project_id : elem.id
                            }`
                          )
                        }
                        sx={{ ...style2, width: "35%" }}
                      >
                        {elem.name}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(
                            `/projects/${
                              elem.project_id ? elem.project_id : elem.id
                            }`
                          )
                        }
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {moment(elem.startDate).format("DD.MM.YYYY")} -{" "}
                        {moment(elem.endDate).format("DD.MM.YYYY")}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(
                            `/projects/${
                              elem.project_id ? elem.project_id : elem.id
                            }`
                          )
                        }
                        sx={style2}
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
                        onClick={() =>
                          navigate(
                            `/projects/${
                              elem.project_id ? elem.project_id : elem.id
                            }`
                          )
                        }
                        sx={{
                          // ...style2,
                          textAlign: "center",
                          width: "15%",
                        }}
                      >
                        {elem.priority == "Pes" ? (
                          <Typography
                            backgroundColor="#d4f4fc"
                            borderRadius="50px"
                            border="1px solid blue"
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
                            border="1px solid #29D697"
                            color="#29D697"
                          >
                            Orta
                          </Typography>
                        ) : (
                          <Typography
                            backgroundColor="#9A93FF26"
                            borderRadius="50px"
                            color="#9A93FF"
                            border="1px solid #9A93FF"
                          >
                            Ýokary
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          navigate(
                            `/projects/${
                              elem.project_id ? elem.project_id : elem.id
                            }`
                          )
                        }
                        sx={{ textAlign: "center", width: "15%" }}
                      >
                        {elem.status == "Dowam edýän" ? (
                          <Typography
                            backgroundColor="#FFF1E0"
                            borderRadius="50px"
                            border="1px solid #E79124"
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
                            border="1px solid #29D697 "
                          >
                            Tamamlanan
                          </Typography>
                        ) : (
                          <Typography
                            backgroundColor="#FFF0ED"
                            borderRadius="50px"
                            color="#FF6A54"
                            border="1px solid #FF6A54 "
                          >
                            {elem.status}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell
                        // onClick={() =>
                        //   navigate(
                        //     `/projects/${
                        //       elem.project_id ? elem.project_id : elem.id
                        //     }`
                        //   )
                        // }
                        sx={{ width: "100px" }}
                      >
                        <Stack direction="row" alignItems="end" spacing={1}>
                          <IconButton
                            onClick={() =>
                              handleChange({ task: elem, user: user })
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
                          <IconButton
                            onClick={() => handleDeleteProject(elem.id)}
                          >
                            <img
                              style={{ width: 20, height: 20 }}
                              src={deleteIcon}
                              alt=""
                            />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      ) : (
        ""
      )}
      {/* <UpdateProjectUserModal
        user={user}
        setSelectedUsers={setSelectedUsers}
        openUserModal={openUserModal}
        handleCloseUserModal={() => setOpenUserModal(false)}
        setWorkers={setWorkers}
      /> */}
      <UpdateModalComponent
        open={openUserModal}
        handleClose={() => setOpenUserModal(false)}
        details={selectedUsers?.task}
      />
    </Stack>
  );
};

export default Project;
