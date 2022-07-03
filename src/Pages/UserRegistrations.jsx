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
import ReactPhoneInput from 'react-phone-input-mui';


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



const UserRegistrations = () => {




  const classes = useStyles();


  return (
    <div >
        <Navbar />
      
   

        <Container component="main" maxWidth="xs" className="review-container">
      <CssBaseline />
      <div className={classes.paper}>
      
        <Typography component="h1" variant="h5">
          <h2>Add user details👤</h2>
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
                label="First Name"
                autoFocus
              />
            </Grid>


            <Grid item xs={12} >
              <TextField
                autoComplete="lname"
                name="Tittle"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoFocus
              />
            </Grid>
        

            <Grid item xs={12} >
              <TextField
                autoComplete="mobile"
                name="Tittle"
                variant="outlined"
                required
                fullWidth
                id="mobile"
                label="Mobile"
                autoFocus
              />
            </Grid>


            


            <Grid item xs={12} >
            <TextField
              id="date"
              label="Date of Birth"
              type="date"
              defaultValue="2017-05-24"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            </Grid>


        




            <Grid item xs={12} sx={{marginTop: 10}}>
            <Button variant="contained" sx={{fontSize:16, fontWeight: 'bold' , backgroundColor: 'black'}}>Send invites 📧</Button>

            </Grid>
          </Grid>
         

          
        </form>
      </div>
    
    </Container>


        <Footer />
    </div>
  )
}

export default UserRegistrations