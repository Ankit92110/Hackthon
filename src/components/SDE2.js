import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, Paper, ButtonGroup} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from './Header';
import "./Freshers.css"
import Footer from './Footer';
import { useSnackbar } from "notistack";
import axios from "axios"
import QuestionCarousel from './Questions';


function Freshers() {

  let { enqueueSnackbar } = useSnackbar();
  const levell = 2;
  const [chosen, setChosen] = useState(false)
  const [load, setLoad] = useState(false)
  const [subjectChoosen, setSubjectChoosen] = useState("")
  const [showRightGrid, setShowRightGrid] = useState(false)
  const [question, setQuestion] = useState([])
  const [totalQuestion, setTotalQuestion] = useState([])
  const [level, setLevel] = useState("low")

/**
 * handleClick is defined
 */

const fetchData = async(value)=>{
  try{
    const res = await axios.get('http://localhost:8080/chatgpt/questions',
    {
      params:{
        "Experience":levell,
        "subject":value
      }
    })
    setQuestion(res.data.low);
    setTotalQuestion(res.data)
  }
  catch(e){
    console.log(e);
  }
}

const subjects = [
  'HTML',
  'CSS',
  'JAVA',
  'REACT',
  'NODE',
  'SPRINGBOOT'
];

  const toggleRightGrid = () => {
    setShowRightGrid(!showRightGrid);
  };

  const handleLevel = async(e)=>{
    
    console.log(e.target.name,"name")
    console.log(level,"level")
    if(level == "low")
    {
      if(e.target.name == "increase")
      {
        setLevel("medium");
        setQuestion(totalQuestion.medium)
        console.log(question,"ques")
      }
      if(e.target.name == "decrease")
      {
        enqueueSnackbar("It's easy questions already", {
          variant: "warning",
        });
      }
    }
    else if(level == "medium")
    {
      if(e.target.name == "increase")
      {
        setLevel("high");
        setQuestion(totalQuestion.high)
        console.log(question,"ques")
      }
      if(e.target.name == "decrease")
      {
        setLevel("low");
        setQuestion(totalQuestion.low)
        console.log(question,"ques")
      }
    }
    else if(level == "high")
    {
      if(e.target.name == "increase")
      {
        enqueueSnackbar("It's hard questions already", {
          variant: "warning",
        });
      }
      if(e.target.name == "decrease")
      {
        setLevel("medium");
        setQuestion(totalQuestion.medium)
        console.log(question,"ques")
      }
    }
  }


  const handleClick = async(e) => {
    setChosen(true);
    console.log(e.target.value,"value")
    setLoad(true);
    setSubjectChoosen(e.target.value)

    await fetchData(e.target.value)
}




  return (
    <>
    <Header></Header>
    <h1>SDE2</h1>
    <div className="root">
    
  {!chosen ? (
    <>
      <Typography variant="h4" className="head-heading">
        Choose a Subject:
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {subjects.map((subject) => (
          <Grid item key={subject}>
            <Button
              variant="contained"
              color="primary"
              className="subjectButton"
              value={subject}
              onClick={(e) => handleClick(e)} 
            >
              {subject}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  ) : (
    <>
    <Grid container spacing={2}>
        {/* Left Grid (8:4 ratio) */}
        <Grid item xs={8} className='position-relative'>
        {question.length && question.map((questions,ind)=>
          <QuestionCarousel questions={questions} index={ind} />
         
        )}
          
          <ButtonGroup variant="contained" aria-label="outlined primary button group" className="position-absolute bottom-0 right-0">
      <Button name="increase" onClick={(e)=>handleLevel(e)}>Level Up</Button>
      <Button name="decrease" onClick={(e)=>handleLevel(e)}>Level Down</Button>
      
    </ButtonGroup>
        </Grid>

        {/* Right Grid (8:4 ratio) */}
        <Grid item xs={4}>
  <Paper className="paper">
    {/* Always show the heading */}
    <h2>Select a Subject: {subjectChoosen}</h2>

    {/* Buttons for Subjects */}
    {showRightGrid &&
      subjects.map((subject) => (
        <Button
          key={subject}
          variant="contained"
          color="primary"
          className="subjectButton"
          value={subject}
          onClick={(e) => handleClick(e)}
        >
          {subject}
        </Button>
      ))}
  </Paper>
  <Button
    variant="contained"
    color="secondary"
    className="toggleButton"
    onClick={toggleRightGrid}
  >
    Select Another Subject
  </Button>
</Grid>

        
      </Grid>
    </>
  )}
 
</div>
 <Footer />
</>
  );
}

export default Freshers;
