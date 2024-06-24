// BookingForm.js

import React, { useState ,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css';
import './Styles/Grid.css';
import { Input } from '@mui/material';
import NdcGridComponent from './NdcGridComponent';
import Navbar from './Components/Navbar/Navbar';



function BookingForm() {
   
  const [formData, setFormData] = useState({
  tripType: 'One Way',
  origin: '',
  destination: '',
  departure: '',
  returnDate: '',
  classType: 'economy',
  adults: 0,
  children: 0,
  infants: 0,
  paxTypeList: [0, 0, 0], // Initialize with default values
 
  });


  const [showAnotherComponent, setShowAnotherComponent] = useState(false);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in ISO format (YYYY-MM-DD)
    const dateInputs = document.querySelectorAll('input[name="departure"]');
    dateInputs.forEach((input) => {
      input.min = currentDate; // Set minimum date to current date
    });
  }, []); // Run this effect only once, after the component is mounted

  useEffect(() => {
   // const currentDate = new Date().toISOString().split('T')[0]; // Get current date in ISO format (YYYY-MM-DD)
    const dateInput2 = document.querySelectorAll('input[name="returnDate"]');
    dateInput2.forEach((input) => {
        input.min = formData.departure; // Set minimum date to current date
    });
  }, [formData.departure]); // Run this effect only once, after the component is mounted

 
//        ************************** FORM VALIDATIONS STARTS ********************************                   //

  const handletypeofpax = (e) => {
    const { name, value } = e.target;
    const input = e.target;

     // Check if the value is within the range of 1 to 9
  if (name === 'adults' || name === 'children' || name === 'infants') {
    const parsedValue = e.target.type === 'number' ? parseInt(value) : value;
    setFormData((prevData) => ({
        ...prevData,
        [name]: parsedValue,
      }));

   // if (value < 1 || value > 9) {
      // Display an error message or perform any action for invalid input
    //  setError('Value must be between 1 and 9');
    //  return;
    //}
  }
     // Function to calculate the total number of passengers
  const getTotalPassengers = formData.adults + formData.children + formData.infants;
  //console.log("getTotalPassengers:   ",getTotalPassengers);
  // Function to handle the 'Proceed' button click
    // Check if the total number of passengers is less than or equal to 9
    if (getTotalPassengers > 9) {
      // Proceed with further actions
      alert('Maximum 9 passengers allowed.');
      
    } 
  
      // If the field is 'adults', update the 'infants' field based on the number of adults
         // Ensure that the number of infants does not exceed the number of adults
         if (name === 'infants' && parseInt(value) > formData.adults) {
            alert('Each adult can have only one infant.');
            setFormData((prevData) => ({
              ...prevData,
              infants: formData.adults, // Reset the infants count to match the number of adults
            }));
          }
          input.reportValidity(); // Display validation message     

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  //orgin & destination validation......................
  const orgdeschange= (e)=>{
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim().toUpperCase(), // Convert input value to uppercase
    }));


  }
  const validateIataCode = (input) => {
    const validCodes = ["LHR", "NCE", "MAA", "DEL", "BOM", "AKL","ORD","DFW","NYC","BLR","FRA"]; // List of valid city codes
    const value = input.trim().toUpperCase(); // Convert input value to uppercase
    const isValidFormat = /^[A-Z]{3}$/.test(value); // Check if input consists of exactly 3 letters
    const containsOnlyLetters = /^[A-Z]+$/.test(value); // Check if input contains only letters
    const isValidAirportCode = validCodes.includes(value); // Check if input is in the list of valid codes
    return isValidFormat && containsOnlyLetters && isValidAirportCode;
   
  };
  const handleBlur = (e) => {
    const input = e.target;
   
    if (!validateIataCode(input.value)) {
      input.setCustomValidity('Please enter a valid 3-letter IATA airport code.');
    } else {
      input.setCustomValidity('');
    }
    if (input.name === 'destination'){
       // console.log("it enter first if")
        if(input.value === formData.origin){
          //  console.log("it enter second if")
            input.setCustomValidity('Origin and destination cannot be the same.');
        }

    } 
    
    input.reportValidity(); // Display validation message
  };

  const limitInput = (input) => {
    let value = input.trim().toUpperCase(); // Convert input value to uppercase
    value = value.substring(0, 3); // Limit input to 3 characters
    return value;
  };
  // Function to check if all form fields are filled
  const isFormFilled = () => {
    if (formData.tripType === 'One Way') {
      return !!formData.departure && !!formData.adults && !!formData.origin && !!formData.destination ;
    } else {
      return !!formData.departure && !!formData.returnDate && !!formData.adults && !!formData.origin && !!formData.destination;
    }
  };
  
//         ************************** FORM VALIDATIONS ENDS ********************************                   \\

//         **************************     API CALLS         ********************************                   \\

// Collecting data from ui fields  and calling api REQUEST XML FROM 'http://localhost:8081/api/submit'

  const handleGetXML = async () => {
    formData.paxTypeList=[parseInt(formData.adults),parseInt(formData.children),parseInt(formData.infants)];
    console.log("formData          " ,formData);
    setShowAnotherComponent(true);
   
 
    
  };
  // After getting request xml ,calling 'http://localhost:8080/ndcoffer/airShoppingRequest2'
  useEffect(() => {
    setShowAnotherComponent(false);
  }, [formData]);
  
  return (
    <div className='container-fluid'>
      <Navbar />
      {/* <div className='appBar'>
      <AppBar position="static">
        <Toolbar>
          <img src="https://www.tpfsoftware.com/assets/common/tsi-logo.png" alt="Logo" className="logo" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
        </Toolbar>
      </AppBar>
      </div> */}
      <div className='bookingDiv'> 
      <form onSubmit={(e) => e.preventDefault()} className="booking">
      <div>
        <FormControl component="fieldset">
          
          <RadioGroup
            row
            aria-label="tripType"
            name="tripType"
            value={formData.tripType}
            onChange={handleChange}
          >
            <FormControlLabel value="One Way" control={<Radio />} label="One Way" id='bkoptions' />
            <FormControlLabel value="Round Trip" control={<Radio />} label="Round Trip" id='bkoptions' />
          </RadioGroup>
        
        </FormControl>
        </div>
        <div className="row">
          <div className='col' id='bkoptions'>
          <TextField
            name="origin"
            label="From"
            value={formData.origin}
            onChange={(e) => orgdeschange(e)}
            required
            
            onBlur={handleBlur}
            onInput={(e) => {
             e.target.value = limitInput(e.target.value);
             }}
             InputLabelProps={{
                shrink: true
              }}
          />
          </div>
          <div className='col' id='bkoptions'>
          <TextField
            name="destination"
            label="To"
            value={formData.destination}
            onChange={(e) => orgdeschange(e)}
            required
           
            onBlur={handleBlur}
            onInput={(e) => {
             e.target.value = limitInput(e.target.value);
             }}
             InputLabelProps={{
                shrink: true
              }}
            
          />
          </div>
          <div className='col' id='bkoptions'>
          <TextField
            name="departure"
            label="Departure"
            type="date"
            value={formData.departure}
            onChange={handleChange}
           // min={currentDate} // Set minimum date to current date
            required

              InputLabelProps={{
                shrink: true
              }}
            
          />
          </div>
          <div className='col' id='bkoptions'>
            <TextField
            name="returnDate"
            label="Return"
            type="date"
            value={formData.returnDate} 
            onChange={handleChange}
            InputLabelProps={{
              shrink: true, // Ensure the label doesn't overlap with the input value
            }}
            
            
            disabled={formData.tripType === 'One Way'}
            />
            </div>
          <div className='col' id='bkoptions'>
            <Select
            className='box1'
            name="classType"
            label="Class"
            value={formData.classType}
            onChange={handleChange}
            required
            InputLabelProps={{
                shrink: true,
              }}
          >
            <MenuItem value="economy">Economy</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="first">First</MenuItem>
          </Select>
          </div>
          <div className='col' id='bkoptions'>
          <TextField
            name="adults"
            label="Adults"
            type="number"
            value={formData.adults}
            onChange={handletypeofpax}
            inputProps={{ min: 1, max: 9, step: 1 }}
            sx={{ width: '100px' }} // Adjust width as needed
            required
          />
          </div>
          <div className='col' id='bkoptions'>
          <TextField
            name="children"
            label="Children"
            type="number"
            value={formData.children}
            onChange={handletypeofpax}
            inputProps={{ min: 1, max: 9}}
            sx={{ width: '100px' }} // Adjust width as needed
            required
          />
          </div>
          <div className='col' id='bkoptions'>
          <TextField
            name="infants"
            label="Infants"
            type="number"
            value={formData.infants}
            onChange={handletypeofpax}
            inputProps={{ min: 1, max: 9 }}
            sx={{ width: '100px' }} // Adjust width as needed
            required
          />
          </div>
          
        </div>
        <div className='row'>
        <div className='col'>  
        <div className='searchDiv'>
            <Button className='searchbtn' onClick={handleGetXML} disabled={!isFormFilled()}  variant="contained" color="primary">
              Search Offers
            </Button>
            </div>      
          </div>
        </div>
        <div>
       
        
    
        </div>
        <div>
        {showAnotherComponent && <NdcGridComponent formData={formData} />}
        </div>
      </form> 
      </div>
    </div>
  );
}

export default BookingForm;
