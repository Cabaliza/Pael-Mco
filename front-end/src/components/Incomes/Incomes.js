import React, { useEffect } from 'react';
import styled from "styled-components";
import { useGlobalContext } from '../../context/GlobalContext';
import { InnerLayout } from '../../styles/layouts';
import Form from '../Form/Form';
import Incomeitem from '../Incomeitem/Incomeitem';

function Incomes() {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <IncomesStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">Total Income: <span>{totalIncome()} Pesos</span></h2>
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {Array.isArray(incomes) && incomes.length > 0 ? (
              incomes.map((income) => (
                <Incomeitem
                  key={income._id}
                  id={income._id}
                  title={income.title}
                  description={income.description}
                  amount={income.amount}
                  date={income.date}
                  type={income.type}
                  category={income.category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </InnerLayout>
    </IncomesStyled>
  );
}

const IncomesStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 0.1rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Incomes;