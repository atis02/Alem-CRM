import { Avatar, Divider, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { user } from "../../../Components/utils";
import call from "../../../../public/images/Phone.png";
import mail from "../../../../public/images/Envelope.png";
import send from "../../../../public/images/PaperPlaneRight.png";
import buildings from "../../../../public/images/Buildings.png";
import calendar from "../../../../public/images/Calendar2.png";
import Call from "../../../../public/images/call.png";
import globus from "../../../../public/images/globus.png";
import location from "../../../../public/images/location.png";
import mail2 from "../../../../public/images/mail.png";
import portfel from "../../../../public/images/portfel.png";
import DescriptionIcon from "@mui/icons-material/Description";
import moment from "moment";
const UserInfo = ({ data }) => {
  const userButtonsData = [
    {
      img: call,
      title: "Jaň ",
      link: `tel:${data.user && data.user.phoneNumber}`,
    },
    {
      img: mail,
      title: "Poçta",
      link: `mailto:${data.user && data.user.mail}`,
    },
    { img: send, title: "Sms", link: "" },
  ];

  return (
    <Stack
      backgroundColor="#fff"
      width="40%"
      height="82vh"
      borderRadius="20px"
      pb="10px"
      boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
      p="30px 24px 17px"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing="30px"
        height="65%"
      >
        <Stack width="40%" alignItems="center">
          <Stack alignItems="center">
            <IconButton sx={{ height: 96, width: 96 }}>
              {data.user && data.user.img === null ? (
                <Avatar
                  alt={data.user && data.user.name}
                  src={data.user && data.user.img}
                  sx={{ background: "#9FC2A6", height: 96, width: 96 }}
                />
              ) : (
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "100px",
                  }}
                  src={`http://192.168.1.46/images/${
                    data.user && data.user.img
                  }`}
                  alt=""
                />
              )}
            </IconButton>
            <Typography
              fontFamily="DM Sans"
              fontWeight="400"
              mt={1}
              fontSize={18}
            >
              {data.user && data.user.name} {data.user && data.user.surname}
            </Typography>
          </Stack>
          <Stack
            mt={3}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {userButtonsData.map((elem, index) => (
              <Stack key={index} width={60} alignItems="center">
                <IconButton
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "100%",
                    border: "1px solid #000",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <a href={elem.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={elem.img}
                      style={{ width: 25, height: 25 }}
                      alt=""
                    />
                  </a>
                </IconButton>
                <Typography
                  mt="7px"
                  textAlign="center"
                  fontSize={14}
                  color="#727272"
                >
                  {elem.title}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack width="60%">
          <Typography
            fontFamily="DM Sans"
            fontWeight="500"
            mt={1}
            fontSize={16}
          >
            Hasap maglumatlary
          </Typography>
          <Stack>
            <Stack direction="row" alignItems="center" spacing={1} mt="16px">
              <img src={mail2} style={{ width: 25, height: 25 }} alt="mail2" />
              <Typography
                mt="7px"
                textAlign="center"
                fontSize={16}
                color="#727272"
              >
                {data.user && data.user.mail}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} mt="10px">
              <img src={Call} style={{ width: 25, height: 25 }} alt="mail2" />
              <Typography
                mt="7px"
                textAlign="center"
                fontSize={16}
                color="#727272"
              >
                {data.user && data.user.phoneNumber}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} mt="10px">
              <img src={globus} style={{ width: 25, height: 25 }} alt="mail2" />
              <Typography
                mt="7px"
                textAlign="center"
                fontSize={16}
                color="#727272"
              >
                {data.user && data.user.languages}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} mt="10px">
              <img
                src={portfel}
                style={{ width: 25, height: 25 }}
                alt="mail2"
              />
              <Typography
                mt="7px"
                textAlign="center"
                fontSize={16}
                color="#727272"
              >
                {data.user && data.user.whereStudy}
              </Typography>
            </Stack>
          </Stack>
          <Typography
            fontFamily="DM Sans"
            fontWeight="500"
            mt={3}
            fontSize={16}
          >
            Şahsy maglumatlar
          </Typography>
          <Stack>
            <Stack direction="row" alignItems="center" spacing={1} mt="16px">
              <img
                src={calendar}
                style={{ width: 25, height: 25 }}
                alt="mail2"
              />
              <Typography
                mt="7px"
                textAlign="center"
                fontSize={16}
                color="#727272"
              >
                {moment(data.user && data.user.birthday).format("DD/MM/YYYY")}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} mt="10px">
              <img
                src={location}
                style={{ width: 25, height: 25 }}
                alt="mail2"
              />
              <Typography
                mt="7px"
                textAlign="center"
                fontSize={16}
                color="#727272"
              >
                {data.user && data.user.whereLive}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack>
        <Typography mt={2} fontFamily="DM Sans" fontWeight="400" fontSize={18}>
          Resminamalar
        </Typography>
        {data.documents && data.documents.length == 0 ? (
          <Typography
            color="#727272"
            textAlign="center"
            mt={5}
            fontSize={18}
            fontFamily="DM Sans"
          >
            Resminama ýok
          </Typography>
        ) : (
          data.documents &&
          data.documents.map((item, index) => (
            <Stack
              spacing="18px"
              key={item.id}
              direction="row"
              alignItems="center"
              mt="25px"
            >
              <Typography color="#727272" fontFamily="DM Sans">
                {index + 1}.
              </Typography>

              <DescriptionIcon sx={{ color: "#727272" }} />
              <Typography color="#727272" fontFamily="DM Sans">
                {item.title}
              </Typography>
            </Stack>
          ))
        )}
      </Stack>
    </Stack>
  );
};

export default UserInfo;
