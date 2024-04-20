import React, { useEffect } from 'react';
import styled from "styled-components";
import { useGlobalContext } from '../../context/GlobalContext';
import { InnerLayout } from '../../styles/layouts';
import Chart from '../Chart/Chart';
import History from '../../History/History';
import { Pesos } from '../../utils/Icons';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();
    const currencySymbol = "₱";

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                    </div>
                    <div className="amount-con">
                        <div className="balance">
                            <h2>Total Balance</h2>
                            <p className="balance-value">
                                {currencySymbol} {totalBalance()}
                            </p>
                        </div>
                        <div className="amount">
                            <h2>Total Income</h2>
                            <p className="total-income">
                                {currencySymbol} {totalIncome()}
                            </p>
                        </div>
                        <div className="expenses">
                            <h2>Total Expenses</h2>
                            <p className="total-expenses">
                                {currencySymbol} {totalExpenses()}
                            </p>
                        </div>
                    </div>
                    <div className="salary">
                        <div className="salary-item">
                            <h2>Salary Range</h2>
                            <div className="amount">
                                <p>
                                    Min: {currencySymbol} {Array.isArray(incomes) && incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 'No data'}
                                </p>
                                <p>
                                    Max: {currencySymbol} {Array.isArray(incomes) && incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 'No data'}
                                </p>
                            </div>
                        </div>
                        <div className="expense-item">
                            <h2>Expense Range</h2>
                            <div className="amount">
                                <p>
                                    Min: {currencySymbol} {Array.isArray(expenses) && expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 'No data'}
                                </p>
                                <p>
                                    Max: {currencySymbol} {Array.isArray(expenses) && expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 'No data'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    .chart-con {
        /* Add styles for chart container if needed */
    }

    .amount-con {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .balance,
    .amount,
    .expenses {
        background-color: #f2f2f2;
        border: 2px solid #FFFFFF;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .balance {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 2rem;
            margin: 0;
        }
    }

    .total-income,
    .total-expenses {
        font-size: 2rem;
        margin: 0;
    }

    .salary,
    .expense-item {
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .salary-item,
    .expense-item {
        padding: 1rem;
    }

    .amount {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
            margin: 0;
        }
    }

    h2 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .history-con {
        margin-top: -6rem; /* Adjusting margin to bring closer to total expenses */
    }
`;

export default Dashboard;
