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
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
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

  

const NotesPage = () => {
  const id = useParams().id;

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "" || notes === "") {
      swal("Warning!", "Text fields cannot be empty!", "error");
    } else {
      axios.post(`http://localhost:5000/api/notes/`, {
        SubId : id,
        Title : title,
        Description : description,
        Content : notes
      }).then((res) => {
        if (res.status === 200) {
          swal("Success!", "Notes added successfully!", "success");
          navigate(`/studentpage/${id}`);
        }

      }).catch((err) => {
        swal("Error!", "Something went wrong!", "error");
        console.log(err);
      })
    
      

    console.log(id,title, description, notes);
    setTitle("");
    setDescription("");
    setNotes("");
    }
  }


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
                value={title}
                required
                fullWidth
                id="firstName"
                label="Title"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={description}
                required
                type="email"
                fullWidth
                id="email"
                label="Description"
                name="email"
                autoComplete="email"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

          


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={notes}
                required
                fullWidth
                multiline
                maxRows={5}
                name="Review"
                label="Notes"
                id="Review"
                autoComplete="Your Review"
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>



            <Grid item xs={12} sx={{marginTop: 10}}>
            <Button onClick={(e)=>handleSubmit(e)} variant="contained" sx={{fontSize:16, fontWeight: 'bold' , backgroundColor: 'black'}}>Save Notes ➕</Button>

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