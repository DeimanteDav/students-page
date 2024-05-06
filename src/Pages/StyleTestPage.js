import React, { useState } from 'react'
import Container from '../components/General/Container';
import styled from 'styled-components';
import styles from './StyleTestPage.module.scss'
import UseRefTest from '../components/UseRefTest';

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background-color: #fafafa;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  padding: 15px;

  & label {
    font-weight: bold;
    font-size: 30px;
    color: ${props => props.invalid ? 'red' : 'green'};
  }

  & input {
    /* border: 2px solid orange; */
    
    /* Props */
    border: 2px solid ${props => props.invalid ? 'red' : 'orange'};
    background-color: ${props => props.invalid ? 'rgb(254, 176, 176)' : 'transparent'};
  }

  & input:focus {
    background-color: #ffcdcd;
  }


  /* &.invalid input {
    border-color: red;
    background-color: rgb(254, 176, 176);
  }

  &.invalid label {
    color: red;
  } */
`;

const CustomButton = styled.button`
    background-color: green;
`

const StyleTestPage = () => {
    const [goal, setGoal] = useState('');
    const [goals, setGoals] = useState([]);
  
    const [isValid, setIsValid] = useState(true);
     
    const goalHandler = (e) => {
      if (e.target.value.trim().length > 0) {
        setIsValid(true);
      }
      setGoal(e.target.value);
    };
  
    const formSubmitHandler = (e) => {
      e.preventDefault();
  
      if (goal.trim().length === 0) {
        setIsValid(false);
        return;
      }
  
      setGoals(prevState => [goal, ...prevState]);
      setGoal('');
    }
  
    return (
      <Container>
        <form onSubmit={formSubmitHandler}>
          {/* <div className={`form-control ${!isValid ? 'invalid' : ''}`}>
  
            <label 
              style={{color: !isValid ? 'red' : 'black'}}
            >Enter Goal</label>
            <input 
              type="text" 
              onChange={goalHandler} 
              value={goal} 
              style={{
                borderColor: !isValid ? 'red' : 'black', 
                backgroundColor: !isValid ? 'salmon' : 'transparent'
              }} 
            />
          </div> */}
  
          {/* 3. styled components */}
          {/* <FormControl className={`${!isValid && 'invalid'}`}>
            <label>Enter Goal</label>
            <input type="text" onChange={goalHandler} value={goal} />
          </FormControl> */}
          
          {/* Styled components with props */}
          {/* <FormControl invalid={!isValid}>
            <label>Enter Goal</label>
            <input type="text" onChange={goalHandler} value={goal} />
          </FormControl> */}
          {/* <CustomButton type='submit'>Button</CustomButton> */}
  
          {/* CSS MODULES */}
          <div className={`${styles.formControl} ${!isValid ? styles.invalid : ''}`}>
            <label>Enter Goal</label>
            <input type="text" onChange={goalHandler} value={goal} />
          </div>

        </form>

  
        <div className="goals-list-wrapper">
          <ul className="goals-list">
            {goals.map((goalItem, index) => <li key={index}>{goalItem}</li>)}
          </ul>
        </div>

        <UseRefTest></UseRefTest>
      </Container>
    )
  }

export default StyleTestPage