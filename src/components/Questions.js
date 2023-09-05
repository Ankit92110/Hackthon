// src/components/QuestionCarousel.js
import { LibraryAddCheckOutlined } from '@mui/icons-material';
import React from 'react';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

const QuestionCarousel = ({ questions, index }) => {

  const [selectedOption, setSelectedOption] = useState(null);
  
  
  const handleClick = (optionIndex) => {
    setSelectedOption(optionIndex);
  };
  console.log(questions,"questions in carousel")
  return (
    <>
      
        <div>
          <h2>Question {index + 1}</h2>
          <p>{questions.question}</p>
          <ol type="1">
          <li onClick={handleClick}>{questions.option1}</li>
          <li onClick={handleClick}>{questions.option2}</li>
          <li onClick={handleClick}>{questions.option3}</li>
          <li onClick={handleClick}>{questions.option4}</li>
          </ol>
          {selectedOption && <h4>Correct Answer: {questions.correctOption}</h4>}
        </div>
     
    </>
  );
};

export default QuestionCarousel;
