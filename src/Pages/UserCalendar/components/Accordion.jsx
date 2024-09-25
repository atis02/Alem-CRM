import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import { Capitalize, user } from "../../../Components/utils";
import CreateIcon from "@mui/icons-material/Create";

const MyAccordion = ({ data }) => {
  // Filter out items with null notes and group by date
  const groupedByDate = data.reduce((acc, item) => {
    if (item.note !== null) {
      // Only consider items with a non-null note
      const date = moment(item.comeTime).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
    }
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedByDate).map((date, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              width="100%"
            >
              <Typography
                color="#202224"
                fontFamily="Montserrat"
                fontSize={15}
                fontWeight={600}
              >
                {moment(date).format("DD.MM.YYYY")}
              </Typography>
              <Stack
                width={30}
                height={30}
                backgroundColor="#90BAEB"
                color="#fff"
                alignItems="center"
                justifyContent="center"
                fontFamily="Montserrat"
                borderRadius="100%"
              >
                {groupedByDate[date].length}
              </Stack>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            {
              // user.role === "USER"
              // ? monthWorkData
              //     .filter((item) => item.note !== null)
              //     .map((dateKey) => (
              //       <>
              //         <Stack
              //           key={dateKey.id}
              //           sx={{
              //             padding: "10px",
              //             borderRadius: "5px",
              //             margin: "5px 0",
              //           }}
              //           direction="row"
              //           alignItems="center"
              //           gap="15px"
              //           mb="20px"
              //         >
              //           <Stack
              //             borderRadius="100%"
              //             width={38}
              //             height={38}
              //             backgroundColor={dateKey.color}
              //           ></Stack>
              //           <Stack direction="column">
              //             <Typography
              //               color="#202224"
              //               fontSize={15}
              //               fontWeight={600}
              //             >
              //               {Capitalize(dateKey.note)}
              //             </Typography>
              //             <Typography
              //               color="#797a7c"
              //               fontSize={14}
              //               fontWeight={500}
              //             >
              //               {moment(dateKey.comeTime).format(
              //                 "DD.MM.YYYY HH:mm"
              //               )}
              //             </Typography>
              //           </Stack>
              //         </Stack>
              //         <Divider sx={{ width: "100%" }} />
              //       </>
              //     ))
              data.map((dateKey) => (
                <>
                  <Stack
                    key={dateKey.id}
                    sx={{
                      padding: "10px",
                      borderRadius: "5px",
                      margin: "5px 0",
                    }}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="15px"
                    mb="20px"
                  >
                    <Stack
                      borderRadius="100%"
                      width={38}
                      height={38}
                      backgroundColor={dateKey.color}
                    ></Stack>
                    <Stack direction="column">
                      <Typography
                        color="#202224"
                        fontSize={15}
                        fontWeight={600}
                      >
                        {Capitalize(dateKey.title)}
                      </Typography>
                      <Typography
                        color="#797a7c"
                        fontSize={14}
                        fontWeight={500}
                      >
                        {moment(dateKey.date).format("DD.MM.YYYY HH:mm")}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                      <IconButton
                        onClick={() => handleUpdateNote(dateKey)}
                        sx={{ mr: -1 }}
                      >
                        <CreateIcon sx={{ color: "#9FC2A6" }} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteNote(dateKey.id)}>
                        <img
                          style={{ width: 24, height: 24 }}
                          src="/images/Delete.png"
                          alt=""
                        />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Divider sx={{ width: "100%" }} />
                </>
              ))
            }
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
// {
//   filteredByDate.map((dateKey) => (
//     <>
//       <Stack
//         key={dateKey.id}
//         sx={{
//           padding: "10px",
//           borderRadius: "5px",
//           margin: "5px 0",
//         }}
//         direction="row"
//         alignItems="center"
//         gap="15px"
//         mb="20px"
//       >
//         <Stack
//           borderRadius="100%"
//           width={38}
//           height={38}
//           // backgroundColor={event[dateKey].color}
//         ></Stack>
//         <Stack direction="column">
//           <Typography color="#202224" fontSize={15} fontWeight={600}>
//             {Capitalize(dateKey.note)}
//           </Typography>
//           <Typography color="#797a7c" fontSize={14} fontWeight={500}>
//             {moment(dateKey.comeTime).format("DD.MM.YYYY HH:mm")}
//           </Typography>
//         </Stack>
//       </Stack>
//       <Divider sx={{ width: "100%" }} />
//     </>
//   ));
// }
export default MyAccordion;
