import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import done from "../../../../public/images/done.png";
import cointinue from "../../../../public/images/cointinue.png";
import newAdded from "../../../../public/images/newAdded.png";
import newProject from "../../../../public/images/newProject.png";
import { Stack, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ModalComponent from "./ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../Components/db/Redux/api/ProjectSlice";
function ProjectHead() {
  const [open, setOpen] = useState(false);
  const data = useSelector((state) => state.project.data);

  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const filteredProjectsBuStatus = data.filter((project) => {
    return project.status === "Tamamlanan";
  });

  const filteredProjectsByPriority = data.filter((project) => {
    return project.status === "Dowam edýän";
  });

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Filter the projects whose createdAt date is within the last 7 days
  const filteredProjects = data.filter((project) => {
    const createdAt = new Date(project.createdat);
    return createdAt >= sevenDaysAgo;
  });

  const totalCompletion = data
    .filter((project) => {
      const createdAt = new Date(project.createdat);
      return createdAt >= sevenDaysAgo;
    })
    .reduce((sum, project) => sum + project.completion, 0);

  const details = [
    {
      id: 1,
      img: done,
      title: "Tamamlanan",
      value: filteredProjectsBuStatus.length,
      percentage: null,
      width: 3.5,
    },
    {
      id: 2,

      img: cointinue,
      title: "Dowam edýän",
      value: filteredProjectsByPriority.length,
      percentage: `${Math.ceil(totalCompletion)}%`,
      width: 3.5,
    },
    {
      id: 3,

      img: newAdded,
      title: "Täze goşulan",
      value: filteredProjects.length,
      percentage: null,
      width: 3.5,
    },
    {
      id: 4,

      img: newProject,
      title: "Täze proýekt",
      value: null,
      percentage: null,
      width: 1.5,
    },
  ];
  return (
    <Grid container spacing={2}>
      {details.map((elem, index) => (
        <Grid item xs={12} key={index} sm={12} md={elem.width}>
          <Paper
            sx={{
              height: "105px",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              width="70%"
              sx={{
                ...(elem.id == 4
                  ? {
                      flexDirection: "column",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : ""),
                gap: "16px",
              }}
              justifyContent="center"
              onClick={elem.id == 4 ? handleOpen : ""}
            >
              <Stack
                width={60}
                height={60}
                borderRadius="100%"
                backgroundColor="#F0F7FF"
                alignItems="center"
                justifyContent="center"
              >
                <img src={elem.img} alt="" style={{ width: 40, height: 40 }} />
              </Stack>
              <Stack>
                <Typography
                  color="#222222"
                  fontSize={24}
                  fontFamily="DM Sans"
                  fontWeight={600}
                >
                  {elem.value}
                </Typography>
                <Typography
                  color="#666666"
                  fontSize={16}
                  fontFamily="DM Sans"
                  fontWeight={400}
                >
                  {elem.title}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              mr={2}
              sx={{ ...(elem.percentage == null && { display: "none" }) }}
            >
              <ArrowOutwardIcon sx={{ color: "#00B69B" }} />
              <Typography color="#00B69B">{elem.percentage}</Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
      <ModalComponent open={open} handleClose={handleClose} />
    </Grid>
  );
}

export default ProjectHead;
