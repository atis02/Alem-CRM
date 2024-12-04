import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSubTasks } from "../../../Components/db/Redux/api/SubTaskSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SubTask = () => {
  const [task, setTask] = useState(() =>
    JSON.parse(localStorage.getItem("subTaskId"))
  );
  const status = useSelector((state) => state.subTask.status);
  const error = useSelector((state) => state.subTask.error);
  const data = useSelector((state) => state.subTask.data.data);

  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      taskId: task.id,
      userId: task.user && task.user.id,
    };
    dispatch(getSubTasks(body));
  }, [dispatch]);
  console.log(data);

  return (
    <Box>
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
            {!data.length ? (
              <Typography textAlign="center" mt={5} fontSize={18} width="100%">
                Ýumuş ýok
              </Typography>
            ) : (
              <></>
              // <TableContainer>
              //   <Table>
              //     <TableHead>
              //       <TableRow
              //         sx={{
              //           backgroundColor: "#fff",
              //           fontFamily: "DM Sans",
              //           position: "sticky",
              //           top: 0,
              //           zIndex: 100,
              //           boxShadow: " 0px 12px 7px -14px rgba(71,71,71,1)",
              //         }}
              //       >
              //         {projectTitlesForUser.map((elem) => (
              //           <TableCell
              //             sx={{
              //               fontFamily: "DM Sans",
              //               color: "#222222",
              //               fontWeight: 600,
              //               fontSize: 16,
              //               textAlign: "center",
              //             }}
              //             key={elem.id}
              //           >
              //             {elem.title}
              //           </TableCell>
              //         ))}
              //       </TableRow>
              //     </TableHead>
              //     <TableBody>
              //       {data.map(
              //         (item) =>
              //           item.tasks &&
              //           item.tasks.map((elem) => (
              //             <StyledTableRow key={elem.id}>
              //               {console.log(item)}

              //               <TableCell
              //                 sx={style2}
              //                 onClick={() => {
              //                   navigate(`/projects/${projectId}/${elem.id}`);
              //                   localStorage.setItem(
              //                     "subTaskId",
              //                     JSON.stringify(elem)
              //                   );
              //                 }}
              //               >
              //                 {elem.name}
              //               </TableCell>
              //               <TableCell
              //                 sx={style2}
              //                 onClick={() => {
              //                   navigate(`/projects/${projectId}/${elem.id}`);
              //                   localStorage.setItem(
              //                     "subTaskId",
              //                     JSON.stringify(elem)
              //                   );
              //                 }}
              //               >
              //                 {console.log(elem)}
              //                 {elem.user && elem.user.name}{" "}
              //                 {elem.user && elem.user.surname}
              //               </TableCell>
              //               <TableCell
              //                 sx={style2}
              //                 onClick={() => {
              //                   navigate(`/projects/${projectId}/${elem.id}`);
              //                   localStorage.setItem(
              //                     "subTaskId",
              //                     JSON.stringify(elem)
              //                   );
              //                 }}
              //               >
              //                 {moment(elem.startDate).format("DD.MM.YYYY")} -{" "}
              //                 {moment(elem.endDate).format("DD.MM.YYYY")}
              //               </TableCell>
              //               <TableCell
              //                 sx={style2}
              //                 onClick={() => {
              //                   navigate(`/projects/${projectId}/${elem.id}`);
              //                   localStorage.setItem(
              //                     "subTaskId",
              //                     JSON.stringify(elem)
              //                   );
              //                 }}
              //               >
              //                 <Stack
              //                   direction="row"
              //                   alignItems="center"
              //                   spacing={0.3}
              //                 >
              //                   <Stack
              //                     sx={{
              //                       width: "80%",
              //                       height: "14px",
              //                       backgroundColor: "#DDDDDD",
              //                       borderRadius: "100px",
              //                       gap: "10px",
              //                     }}
              //                     direction="row"
              //                   >
              //                     <Stack
              //                       style={{
              //                         width: `${elem.completionTask}%`,
              //                         height: "14px",
              //                         backgroundColor: "#00B69B",
              //                         borderRadius: "100px",
              //                         color: "#fff",
              //                         display: "flex",
              //                         alignItems: "center",
              //                         justifyContent: "center",
              //                       }}
              //                     ></Stack>
              //                   </Stack>
              //                   <Stack
              //                     style={{
              //                       fontSize: 13,

              //                       color: "#00B69B",
              //                     }}
              //                   >
              //                     {`${elem.completionTask}%`}
              //                   </Stack>
              //                 </Stack>
              //               </TableCell>
              //               <TableCell
              //                 sx={style2}
              //                 onClick={() => {
              //                   navigate(`/projects/${projectId}/${elem.id}`);
              //                   localStorage.setItem(
              //                     "subTaskId",
              //                     JSON.stringify(elem)
              //                   );
              //                 }}
              //               >
              //                 {elem.priority == "Pes" ? (
              //                   <Typography
              //                     backgroundColor="#F0F7FF"
              //                     borderRadius="50px"
              //                     color="gray"
              //                     border="1px solid lightblue"
              //                     width="100%"
              //                     textAlign="center"
              //                   >
              //                     Pes
              //                   </Typography>
              //                 ) : elem.priority == "Orta" ? (
              //                   <Typography
              //                     border="1px solid #29D697"
              //                     backgroundColor="#E9FAF4"
              //                     borderRadius="50px"
              //                     color="#29D697"
              //                   >
              //                     Orta
              //                   </Typography>
              //                 ) : (
              //                   <Typography
              //                     border="1px solid #9A93FF"
              //                     backgroundColor="#9A93FF26"
              //                     borderRadius="50px"
              //                     color="#9A93FF"
              //                   >
              //                     Ýokary
              //                   </Typography>
              //                 )}
              //               </TableCell>
              //               <TableCell
              //                 sx={style2}
              //                 onClick={() => {
              //                   navigate(`/projects/${projectId}/${elem.id}`);
              //                   localStorage.setItem(
              //                     "subTaskId",
              //                     JSON.stringify(elem)
              //                   );
              //                 }}
              //               >
              //                 {elem.status == "Dowam edýän" ? (
              //                   <Typography
              //                     backgroundColor="#FFF1E0"
              //                     borderRadius="50px"
              //                     color="#E79124"
              //                     border="1px solid #E79124"
              //                     textAlign="center"
              //                   >
              //                     Dowam edýän
              //                   </Typography>
              //                 ) : elem.status == "Tamamlanan" ? (
              //                   <Typography
              //                     backgroundColor="#E9FAF4"
              //                     borderRadius="50px"
              //                     border="1px solid #29D697"
              //                     color="#29D697"
              //                   >
              //                     Tamamlanan
              //                   </Typography>
              //                 ) : (
              //                   <Typography
              //                     backgroundColor="#FFF0ED"
              //                     border="1px solid #FF6A54"
              //                     borderRadius="50px"
              //                     color="#FF6A54"
              //                   >
              //                     {elem.status}
              //                   </Typography>
              //                 )}
              //               </TableCell>

              //               <TableCell sx={{ width: "100px" }}>
              //                 <Stack
              //                   direction="row"
              //                   alignItems="end"
              //                   spacing={1}
              //                 >
              //                   <IconButton
              //                     sx={{
              //                       ...((elem.user &&
              //                         elem.user.id === user.id) ||
              //                       user.role === "ADMIN"
              //                         ? { display: "flex" }
              //                         : { display: "none" }),
              //                     }}
              //                     onClick={() =>
              //                       handleChange({
              //                         task: elem,
              //                         user: elem.user,
              //                       })
              //                     }
              //                   >
              //                     <BorderColorOutlinedIcon
              //                       sx={{
              //                         color: "#0099ED",
              //                         width: 20,
              //                         height: 20,
              //                       }}
              //                     />
              //                   </IconButton>
              //                   {user.role === "USER" ? (
              //                     ""
              //                   ) : (
              //                     <IconButton
              //                       onClick={() =>
              //                         handleDeleteProjectTask(elem)
              //                       }
              //                     >
              //                       <img
              //                         style={{ width: 20, height: 20 }}
              //                         src={deleteIcon}
              //                         alt=""
              //                       />
              //                     </IconButton>
              //                   )}
              //                 </Stack>
              //               </TableCell>
              //             </StyledTableRow>
              //           ))
              //       )}
              //     </TableBody>
              //   </Table>
              // </TableContainer>
            )}
          </Stack>
        ) : (
          ""
        )}
        {/* <UpdateProjectUserModal
        user={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        openUserModal={openUserModal}
        handleCloseUserModal={() => setOpenUserModal(false)}
        setWorkers={setWorkers}
      /> */}
      </Stack>
    </Box>
  );
};

export default SubTask;
