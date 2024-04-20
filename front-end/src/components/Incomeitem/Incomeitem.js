import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { Calendar, comment, Pesos, freelance, money, stocks, users, piggy, trash, book, food, medical, clothing, circle } from '../../utils/Icons';
import Button from '../Button/Button';

function Incomeitem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type
}) {
  const categoryIcon = () => {
    switch (category) {
      case 'salary':
        return money;
      case 'freelancing':
        return freelance;
      case 'investments':
        return stocks;
      case 'stocks':
        return users;
      case 'Pesos':
        return Pesos;
      case 'other':
        return piggy;
      default:
        return null;
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case 'education':
        return book;
      case 'groceries':
        return food;
      case 'health':
        return medical;
      case 'clothing':
        return clothing;
      case 'travelling':
        return freelance;
      case 'other':
        return circle;
      default:
        return null;
    }
  };

  console.log('type', type)
  return (
    <IncomeitemStyled indicator={indicatorColor}>
      <div className="icon">
        {type === 'expense' ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="text">
          <p>{Pesos} {amount}</p>
          <p>{Calendar} {dateFormat(date)}</p>
        </div>
        <div className="description">
          {comment}
          <span>{description}</span>
        </div>
        <div className="btn-con">
          <Button
            icon={trash}
            bPad={'0.5rem'}
            bRad={'50%'}
            bg={'var(--primary-color)'}
            color={'#fff'}
            iColor={'#fff'}
            hColor={'var(--color-green)'}
            onClick={() => deleteItem(id)}
          />
        </div>
      </div>
    </IncomeitemStyled>
  );
}

const IncomeitemStyled = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 80;
  color: #222260;

  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #FFFFFF;

    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h5 {
      font-size: 1.3rem;
      padding-left: 1rem;
      position: relative;
      color: ${props => props.indicator};

      &::before {
        content: '';
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${props => props.indicator};
      }
    }

    .text {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2rem;
      color: var(--primary-color);
      opacity: 0.8;

      p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }

    p {
      margin-bottom: 0.5rem;
    }

    .btn-con {
      display: flex;
      justify-content: flex-end;
    }
  }
    margin-bottom: 1rem;
    margin-left: 2rem;
    
    .description {
      display: flex;
      align-items: center;
      gap: 0.25rem; /* Adjust the gap value to create the desired space */
      margin-bottom: 0.5rem;
  
      span {
 
        margin-left: 0.25rem

`;  

export default Incomeitem;