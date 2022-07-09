import React,{useState} from "react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
const axios = require('axios');



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

  

const ResetPassword = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const handleSubmit=() =>{
    if(password === confirmPassword){
      setError("")
     console.log("password match")
     axios.put(`http://localhost:5000/api/user/pass/${id}`, {
       password: password
     }).then((res)=>{
       if (res.status === 200) {
        console.log("password changed");
         navigate(`/userregistrations/${id}`);
         
       }
     }).catch((err)=>{
       console.log(err)
     }
     )
    }
    else{
      setError("passwords does not match")
      console.log("password not match")
    }
  }

 


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const classes = useStyles();


  return (
    <div >
        <Navbar />
      
   

        <Container component="main" maxWidth="xs" className="review-container">
      <CssBaseline />
      <div className={classes.paper}>
      
        <Typography component="h1" variant="h5">
          <h2>Hi user.. <br/> Welcome to the site👋</h2>
          <h4>Please enter your new password</h4>
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="New Password"
                variant="outlined"
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                autoFocus
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type="password"
                fullWidth
                id="repeatPassword"
                label="Re Enter Password"
                name="repassword"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                autoComplete="repassword"
              />
            </Grid>


            <Grid item xs={12}>
            <h3 style={{color: 'red', fontSize: '16px' , textAlign: 'center'}}>{error}</h3>
            </Grid>
            
            <Grid item xs={12} sx={{marginTop: 10}}>
            <Button variant="contained" onClick={()=> handleSubmit()}  sx={{fontSize:16, fontWeight: 'bold' , backgroundColor: 'black'}}>update passsword🔑</Button>

            </Grid>
          </Grid>
         

          
        </form>
      </div>
    
    </Container>


        <Footer />
    </div>
  )
}

export default ResetPassword