import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { useState } from "react";
import keys from "config/keys";


import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const [promoHeadline, setPromoHeadline] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  console.log("Nope ", data);
  // Function to handle broadcast button click
  const handleBroadcast = async () => {
    // Perform API call to send the promotional message
    try {
      const response = await fetch(
        `http://${keys.localhost}:3000/api/promotionOffers/sendPromotions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            headline: promoHeadline,
            message: promoMessage,
          }),
        }
      );

      console.log("working: ", response);
      if (response.ok) {
        // Successfully sent the promotional message
        console.log("Promotional message sent.");
      } else {
        // Handle errors in the response
        console.error(
          "Error sending promotional message:",
          response.statusText
        );
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error sending promotional message:", error);
    }
  };

  // const columns = [
  //   {
  //     field: "_id",
  //     headerName: "ID",
  //     flex: 1,
  //   },
  //   {
  //     field: "userId",
  //     headerName: "User ID",
  //     flex: 1,
  //   },
  //   {
  //     field: "createdAt",
  //     headerName: "CreatedAt",
  //     flex: 1,
  //   },
  //   {
  //     field: "products",
  //     headerName: "# of Products",
  //     flex: 0.5,
  //     sortable: false,
  //     renderCell: (params) => params.value.length,
  //   },
  //   {
  //     field: "cost",
  //     headerName: "Cost",
  //     flex: 1,
  //     renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  //   },
  // ];
  const columns = [
    {
      field: "first_name",
      headerName: "First Name",
      flex: 0.5,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 0.5,
    },
    {
      field: "movie_name",
      headerName: "Movie Name",
      flex: 1,
    },
    {
      field: "movietheater_location",
      headerName: "Movie Theater Location",
      flex: 1,
    },
    {
      field: "amountSpent",
      headerName: "Amount Spent",
      flex: 1,
    },
  ];

  const rows = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      movie_name: "The Avengers",
      movietheater_location: "Chicago",
      amountSpent: 595,
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Doe",
      movie_name: "Titanic",
      movietheater_location: "Indianapolis",
      amountSpent: 430,
    },
    {
      id: 3,
      first_name: "Bob",
      last_name: "Smith",
      movie_name: "Star Wars",
      movietheater_location: "Chicago",
      amountSpent: 390,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          
          {/* <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          /> */}
          <DataGrid rows={rows} columns={columns} />
        
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }}>
            Internal Company Data
          </Typography>
          {/* <BreakdownChart isDashboard={true} /> */}
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary[100] }}
            ></Typography>
            <StatBox title="Total No. of Movies" value="30" />
            <StatBox title="Total No. of Customers" value="65" />
            <StatBox title="No. of Employees" value="15" />
            <StatBox title="No. of Theatres" value="5" />
            
          </Typography>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box> */}
      </Box>

      <Box
        gridColumn="span 4"
        gridRow="span 3"
        backgroundColor={theme.palette.background.alt}
        p="1.5rem"
        borderRadius="0.55rem"
      >
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          Send Promotional Message
        </Typography>
        <TextField
          placeholder="Type your promotional headline here"
          fullWidth
          margin="normal"
          value={promoHeadline}
          onChange={(e) => setPromoHeadline(e.target.value)}
          InputProps={{
            disableunderline: true,
            style: {
              color: theme.palette.secondary[200],
            },
          }}
        />
        <TextField
          placeholder="Type your promotional message here"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={promoMessage}
          onChange={(e) => setPromoMessage(e.target.value)}
          InputProps={{
            disableunderline: true,
            style: {
              color: theme.palette.secondary[200],
            },
          }}
        />
        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            marginTop: "1rem",
          }}
          onClick={handleBroadcast}
        >
          Broadcast
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
