import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/NavBar/Navbar";

function Layouts() {
  return (
    <Box display={"flex"} width="100vw" sx={{position: 'fixed'}}>
      <Box flexGrow={1} sx={{
            // overflowY: 'auto',
            // maxHeight: 'calc(100vh - 64px)',
            // padding: '16px',
          }}>
        <Navbar/>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layouts