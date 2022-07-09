import React, { useEffect } from 'react'
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
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import { pink } from '@mui/material/colors';
import {Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert';
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
  


const StudentPage = () => {
  const id = useParams().id;
  const [auth, setAuth] = React.useState(false);
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    try{
      const token = localStorage.getItem('token');
      if (token !== null) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }catch(err){
      console.log(err);
    }
    
  }, [])


  useEffect(()=>{
    try{
      axios.get(`http://localhost:5000/api/notes/${id}`).then((res)=>{
        console.log(res.data);
        setData(res.data);
      }).catch((err)=>{
        console.log(err);
      }
      )
    }catch(err){
      console.log(err);
    }
  },[])

  const gotoNotes = (subid) => {
    navigate(`/viewnotes/${subid}`);
    console.log(subid);

  }


  const editNotes = (subid) => {
    navigate(`/editnotes/${subid}`);
    console.log(subid);

  }


  

  const deleteNotes = (subid) =>{

    swal({
        text : "Are you sure you want to delete?",
        buttons: true,
        dangerMode: true,
    }).then( (willDelete)=>{
        if(willDelete){
            axios.delete(`http://localhost:5000/api/notes/${subid}`).then(
                (response)=>{
                    swal({
                        title : 'Done !',
                        text  : 'Note is deleted',
                        icon  : 'success',
                        timer : 2000,
                        button : false,
                    })
                    try{
                      axios.get(`http://localhost:5000/api/notes/${id}`).then((res)=>{
                        console.log(res.data);
                        setData(res.data);
                      }).catch((err)=>{
                        console.log(err);
                      }
                      )
                    }catch(err){
                      console.log(err);
                    }
                }
            )
        } else {
            swal({
                text : "Note is not deleted !",
                timer:2000,
                buttons:false,
            })
        }
    })
     
}




  return (
    <div >
        <Navbar />
        {auth ? 
        <>
        <Box
        isplay="flex"
        justifyContent="center"
        alignItems="flex-start"
        width="100%"
        gap={2}
        marginTop={15}
        >
        <h1> Hi 👋.Welcome user!</h1>
        </Box>
    
        <Link style={{left: '90%', alignItems: 'end',}} to={`/notespage/${id}`}>
        <Button variant="contained" sx={{fontSize:16,left:'42%' ,margin:5,alignSelf:'', fontWeight: 'bold' , backgroundColor: 'black'}}>Add+</Button>
        </Link>
        <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="45vh"
         component="span" sx={{ p: 2,justify: 'center',align: 'center' }}>
            
        <TableContainer component={Paper} sx={{width: '90%'}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Created</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.Title}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Description}</StyledTableCell>
              <StyledTableCell align="center">{row.createdAt}</StyledTableCell>
              <StyledTableCell align="center">
                <Button onClick={()=>gotoNotes(row._id)} ><ArticleIcon/></Button>
                <Button onClick={()=>editNotes(row._id)} ><EditIcon/></Button>
                <Button onClick={()=>deleteNotes(row._id)} ><DeleteIcon sx={{ color: pink[500] }}/></Button>
                
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
    :
    <> <Box
    isplay="flex"
    justifyContent="center"
    alignItems="flex-start"
    width="100%"
    gap={2}
    marginTop={15}
    >
    <h1> please Login to the system to use this feature !</h1>
    <Link to="/">
    <Button variant="contained" sx={{fontSize:16, fontWeight: 'bold' , backgroundColor: 'black'}}>Login</Button>
    </Link>
    </Box></>
    }



        <Footer />
    </div>
  )
}

export default StudentPage



