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

  

const NotesPage = () => {

  const classes = useStyles();


  return (
    <div >
        <Navbar />
      
   

        <Container component="main" maxWidth="xs" className="review-container">
      <CssBaseline />
      <div className={classes.paper}>
      
        <Typography component="h1" variant="h5">
          <h2>Add your Notes..✍️ </h2>
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
                label="Title"
                autoFocus
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type="email"
                fullWidth
                id="email"
                label="Description"
                name="email"
                autoComplete="email"
              />
            </Grid>

          


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                maxRows={5}
                name="Review"
                label="Notes"
                id="Review"
                autoComplete="Your Review"
              />
            </Grid>



            <Grid item xs={12} sx={{marginTop: 10}}>
            <Button variant="contained" sx={{fontSize:16, fontWeight: 'bold' , backgroundColor: 'black'}}>Save Notes ➕</Button>

            </Grid>
          </Grid>
         

          
        </form>
      </div>
    
    </Container>


        <Footer />
    </div>
  )
}

export default NotesPage