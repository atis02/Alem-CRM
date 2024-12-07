import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import SidebarNav from "./Sidebar";
// import Login from './Login'

export default function LandingPageLayout() {
  // const admin = localStorage.getItem("token");
  // const data = useSelector((state) => state.postDocument.data);
  // const sendingData = useSelector((state) => state.userCreatedDocs.data);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getDocument());
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(userSendedDocuments());
  // }, [dispatch]);

  return (
    <Box>
      {/* <Navbar /> */}
      <Stack direction="row" maxHeight="100vh">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <SidebarNav
        // data={data} sendingData={sendingData}
        />
        <Stack direction="column" width="100%">
          <Navbar />
          <Outlet />
        </Stack>
      </Stack>
    </Box>
  );
}
