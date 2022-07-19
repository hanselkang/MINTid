import React, { useState, useEffect } from "react";
import DashboardExpense from "./DashboardExpense";
import GraphLogIncomeLogExpensesOverTime from "./GraphLogIncomeLogExpensesOverTime";
import GraphLogIncomeLogExpensesMonthly from "./GraphLogIncomeLogExpensesMonthly";
import FirstGraph from "./FirstGraph";
import { getElements } from '../services/TrackerServices'



const Dashboard = () => {
        const [household, setHousehold] = useState([])
        const [persons, setPersons] = useState([])

        useEffect(() => {
                getElements("households")
                        .then(item => setHousehold(item))

        }, [])
        useEffect(() => {
                getElements("persons")
                        .then(item => setPersons(item))
        }, [])

        const leftMoney = () => {
                const total = household[0].target / 100 - calculateTotal()
                return total.toLocaleString()
        }
        const calculateTotal = () => {

                let total = 0
                if (persons[0]) {
                        for (let i = 0; i < persons.length; i++) {
                                total += persons[i].currentPosition / 100
                        }
                        return total
                }

        }


        return (
                <>
                        <div >
                                <GraphLogIncomeLogExpensesOverTime />

                                <div className="center-text ">

                                        <h2>Monthly Income and Expense </h2>
                                </div>
                                <GraphLogIncomeLogExpensesMonthly />
                                <div className="align">
                                        <FirstGraph />
                                </div>
                                <div className="center-text ">
                                        {household[0] ? <h2>£{leftMoney()} </h2> : <div> Loading </div>}  <h2> we need not to waste! </h2>
                                </div>

                        </div>
                        <br />
                        <br />
                        <br />
                        <DashboardExpense />
                </>
        )
}

export default Dashboard;