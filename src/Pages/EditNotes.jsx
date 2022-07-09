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
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
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

  

const EditNotes = () => {
  const id = useParams().id;
  const [auth, setAuth] = useState(false);

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  // eslint-disable-next-line
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // eslint-disable-next-line
  useEffect(() => {
    try{
      const token = localStorage.getItem('token');
      if (token !== null ) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }catch(err){
      console.log(err);
    }
    
  }, [])

  useEffect(() => {
    axios.post(`http://localhost:5000/api/notes/single/${id}`,{
      token: localStorage.getItem("token")
    }).then((res) => {
      console.log(res.data);
        setData(res.data);
        setTitle(res.data.Title);
        setDescription(res.data.Description);
        setNotes(res.data.Content);
        

    });
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "" || notes === "") {
      swal("Warning!", "Text fields cannot be empty!", "error");
    } else {
      axios.put(`http://localhost:5000/api/notes/${id}`, {
        Title : title,
        Description : description,
        Content : notes,
        token: localStorage.getItem("token")
      }).then((res) => {
        if (res.status === 200) {
          swal("Success!", "Notes added successfully!", "success");
          navigate(-1);
        }

      }).catch((err) => {
        swal("Error!", "Something went wrong!", "error");
        console.log(err);
      })

    }
}


 


  return (
    <div >
        <Navbar />

        {auth ? <>
      
   

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
                maxRows={10}
                name="Review"
                label="Notes"
                id="Review"
                autoComplete="Your Review"
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>



            <Grid item xs={12} sx={{marginTop: 10}}>
            <Button onClick={(e)=>handleSubmit(e)}  variant="contained" sx={{fontSize:16, fontWeight: 'bold' , backgroundColor: 'black'}}>Update Notes ✍️</Button>

            </Grid>
          </Grid>
         

          
        </form>
      </div>
    
    </Container>
    </> : <> 
    <Box
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
    </Box>
    
    </>}


        <Footer />
    </div>
  )
}

export default EditNotes;