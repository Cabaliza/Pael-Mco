import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/GlobalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';


function Form() {
  const { addIncome, getIncomes} = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const { title, amount, date, category, description } = inputState;
  const handleInput = name => e => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addIncome(inputState);
    getIncomes()
    setInputState({
      title: '',
      amount: '',
      date: '',
      category: '',
      description: '',
    })
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={'title'}
          placeholder="Salary Title"
          onChange={handleInput('title')}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name={'amount'}
          placeholder={'Salary Amount'}
          onChange={handleInput('amount')}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id='date'
          placeholderText='Enter A Date'
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={date => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className="selects input-control">
        <select 
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput('category')}
        >
          <option value="" disabled>Select Option</option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investments</option>
          <option value="stocks">Stocks</option>
          <option value="other">Other</option>
          <option value="Pesos">Pesos</option>
          <option value="bank">Bank</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder='Add A Reference'
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput('description')}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name={'Add Income'}
          icon={plus}
          bPad={'.8rem 1.6rem'}
          bRad={'30px'}
          bg={'var(--color-accent)'}
          color={'#fff'}
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .input-control {
    display: flex;
    flex-direction: column;
    position: relative;

    input,
    textarea {
      width: 100%;
      padding: 1rem 2rem;
      font-size: 1.6rem;
      background-color: transparent;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    position: relative;

    select {
      color: rgba(34, 34, 96, 0.4);
      padding: 1rem 2rem;
      font-size: 1.6rem;
      background-color: transparent;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    display: flex;
    justify-content: flex-end;

    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }

  /* Add gradient effect to corners */
  .input-control::before,
  .selects::before {
    content: "";
    position: absolute;
    top: -5px;
    right: -5px;
    bottom: -5px;
    left: -5px;
    background: linear-gradient(to bottom right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5));
    z-index: -1;
    border-radius: 10px;
  }
`;
export default Form;