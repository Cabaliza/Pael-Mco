import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();
export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, income);
      console.log(response.data);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      if (response && response.data) {
        setIncomes(response.data);
        console.log(response.data);
      } else {
        setError('No data received');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const deleteIncome = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}delete-income/${id}`);
      console.log(response.data);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    if (Array.isArray(incomes)) {
      incomes.forEach((income) => {
        totalIncome = totalIncome + income.amount;
      });
    }
  
    return totalIncome;
  };

  const addExpense = async (expense) => {
    try {
      const response = await axios.post(`${BASE_URL}add-expense`, expense);
      console.log(response.data);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      if (response && response.data) {
        setExpenses(response.data);
        console.log(response.data);
      } else {
        setError('No data received');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}delete-expense/${id}`);
      console.log(response.data);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const totalExpenses = () => {
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      totalExpenses = totalExpenses + expense.amount;
    });
  
    return totalExpenses;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [ ...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history;
  };

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        addExpense,
        getExpenses,
        deleteIncome,
        totalIncome,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        incomes,
        expenses,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;