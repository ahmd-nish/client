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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";



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


const id = useParams().id;  
var today = new Date();
const [selectedDate, setSelectedDate] = useState(new Date(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()));
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [mobileNumber, setMobileNumber] = useState("");
const navigate = useNavigate();


const handleDateChange = (date) => {
  
  setSelectedDate(new Date(date).toISOString().split("T")[0]);
};

const handleSubmit=() =>{
  axios.put(`http://localhost:5000/api/user/${id}`, {
    firstName: firstName,
    lastName: lastName,
    mobile: mobileNumber,
    dateOfBirth: selectedDate,
    status:true,
    token : localStorage.getItem("token")
  }).then((res)=>{
    if (res.status === 200) {
     console.log("user registration updated");
      navigate(`/`);
      localStorage.removeItem("token");
      
    }
  }).catch((err)=>{
    console.log(err)
  })
 

};


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
                onChange={(e) => setFirstName(e.target.value)}
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
                onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setMobileNumber(e.target.value)}
                id="mobile"
                label="Mobile"
                autoFocus
              />
            </Grid>


            


            <Grid item xs={12} >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
               margin="normal"
               id="date-picker-dialog"
               label="Date picker dialog"
               format="MM/dd/yyyy"
               value={selectedDate}
               onChange={handleDateChange}
               KeyboardButtonProps={{
                 'aria-label': 'change date',
               }}
             />
              </MuiPickersUtilsProvider>
            </Grid>


        




            <Grid item xs={12} sx={{marginTop: 10}}>
            <Button variant="contained" onClick={()=> handleSubmit()} sx={{fontSize:16, fontWeight: 'bold' , backgroundColor: 'black'}}>Save Details</Button>

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