import React,{useEffect, useState} from "react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

  

const ViewNotes = () => {

  const id = useParams().id;
  const [auth, setAuth] = useState(false);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();


  const classes = useStyles();
  
  useEffect(() => {
    axios.post(`http://localhost:5000/api/notes/single/${id}`,{
      token: localStorage.getItem("token")
    }).then((res) => {
      setNotes(res.data);
    });
  }, [id]);

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
    
  }, [id])

  return (
    <div >
        <Navbar />

        {auth ? <>
      
   

        <Container component="main" maxWidth="md" className="review-container">
      <CssBaseline />
      <div className={classes.paper}>
      
        <Typography component="h1" variant="h5">
          <h1>{notes.Title}</h1>
        </Typography>

        <Typography component="h1" variant="h5">
         <h4>{notes.Description}</h4>
        </Typography>

        <Typography sx={{fontSize:12}}>
          <p>{notes.Content}</p>
        </Typography>

        <Button onClick={() => navigate(-1)} variant="contained" sx={{fontSize:16, fontWeight: 'bold' , backgroundColor: 'black'}}>Back🔙</Button>
        
      </div>
    
    </Container>
    </> : 
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
    </Box></>}


        <Footer />
    </div>
  )
}

export default ViewNotes;