import React,{useEffect, useState} from "react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from "axios";
import swal from 'sweetalert';
import { Link, useNavigate} from "react-router-dom";




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

  

const AddUser = () => {

  const classes = useStyles();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const sendInvite = () => {
    console.log(name, email);
    axios.post(`http://localhost:5000/api/tempUser`, {
      name: name,
      email: email,
      status: false,
      accountType: "user",
      token: localStorage.getItem("token")
    }).then((res) => {
      console.log(res.data);
      swal("Success!", "Invite sent!", "success");
      navigate(-1);
      
    }).catch((err) => {
      swal("Error!", "Something went wrong!", "error");
      console.log(err);
    });
  }

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

        <Container component="main" maxWidth="xs" className="review-container">
      <CssBaseline />
      <div className={classes.paper}>
      
        <Typography component="h1" variant="h5">
          <h2>Add new user 👤</h2>
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="Tittle"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
        

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>




            <Grid item xs={12} sx={{marginTop: 10}}>
            <Button onClick={()=>sendInvite()} variant="contained" sx={{fontSize:16, fontWeight: 'bold' , backgroundColor: 'black'}}>Send invites 📧</Button>

            </Grid>
          </Grid>
         

          
        </form>
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
    <h1> please Login as an Admin to the system to use this feature !</h1>
    <Link to="/">
    <Button variant="contained" sx={{fontSize:16, fontWeight: 'bold' , backgroundColor: 'black'}}>Login</Button>
    </Link>
    </Box></>}

        <Footer />
    </div>
  )
}

export default AddUser