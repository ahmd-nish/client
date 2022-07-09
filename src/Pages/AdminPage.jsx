import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import axios from 'axios';






const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
 

  

const Adminpage = () => {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/api/user/').then((res) => {
      console.log(res.data);
      setData(res.data);
    })
  }, []);
  

  useEffect(() => {
    try{
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('accountType');
      if (token !== null && user === 'admin') {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }catch(err){
      console.log(err);
    }
    
  }, [])

  return (
    <div >
        <Navbar />
        {auth ? <>
        <Box
        isplay="flex"
        justifyContent="center"
        alignItems="flex-start"
        width="100%"
        gap={2}
        marginTop={15}
        >
        <h1> Hi 👋 Welcome Admin!</h1>
        </Box>
    
        
        <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="45vh"
         component="span" sx={{ p: 2,justify: 'center',align: 'center' }}>
        <Button onClick={() => navigate('/adduser')}  variant="contained" sx={{fontSize:16,left:'42%' ,margin:5,alignSelf:'', fontWeight: 'bold' , backgroundColor: 'black'}}>Add+</Button>
        <TableContainer component={Paper} sx={{width: '90%'}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell align="center">Lastname</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
              <StyledTableCell align="center">{row.lastName}</StyledTableCell>
              <StyledTableCell align="center">
              {row.accountType === "admin" ? (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#75E6DA", color: "black" , fontWeight: 'bold'}}
                    size="small"
                  >
                    Admin
                  </Button>
                )  : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#FFCB2E" , color: "black" , fontWeight: 'bold'}}
                    size="small"
                  >
                    User
                  </Button>
                )}
              
              </StyledTableCell>
              <StyledTableCell align="center">
              {row.status === true ? (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#90EE90", color: "black" , fontWeight: 'bold'}}
                    size="small"
                  >
                    Active
                  </Button>
                )  : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#ffcccb" , color: "black" , fontWeight: 'bold'}}
                    size="small"
                  >
                    Invited
                  </Button>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button >View</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </> : 
    <> <Box
    isplay="flex"
    justifyContent="center"
    alignItems="flex-start"
    width="100%"
    gap={2}
    marginTop={15}
    >
    <h1> please Login as an Admin to the system to use this feature !</h1>
    <Link to="/">
    <Button variant="contained" sx={{fontSize:16, fontWeight: 'bold' , backgroundColor: 'black'}}>Login</Button>
    </Link>
    </Box></>}


        <Footer />
    </div>
  )
}

export default Adminpage