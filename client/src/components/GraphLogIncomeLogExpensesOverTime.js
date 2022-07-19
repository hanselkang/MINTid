import { useEffect, useState } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Scatter, ComposedChart, Area, Bar, LineChart, CartesianGrid, Legend, Line, BarChart } from 'recharts'
import { getElements } from '../services/TrackerServices'


const GraphLogIncomeLogExpensesOverTime = () => {

    const [expenses, setExpenses] = useState([])
    const [incomes, setIncomes] = useState([])

    useEffect(() => {
        getElements("expenses")
            .then(item => setExpenses(item))
    }, [])

    useEffect(() => {
        getElements("incomes")
            .then(item => setIncomes(item))
    }, [])

    const lnExpenses = expenses.map((element) => {
        if (element.amount !== null) {
            element.amount = Math.log(element.amount);
        }
        return element;
    });

    const lnIncomes = incomes.map((element) => {
        if (element.amount !== null) {
            element.amount = Math.log(element.amount);
        }
        return element;
    });

   

    const incomesWithNewKey = lnIncomes.map(income => ({ ...income, amount2: income.amount, amount: undefined }))

    const allTxs = lnExpenses.concat(incomesWithNewKey)
    const allTxsSorted = allTxs.sort((tx1, tx2) => Number(tx1.date.replace(/-/g, "")) - Number(tx2.date.replace(/-/g, "")))

    return (
        <div className='dashboard-graph'>
            <ResponsiveContainer aspect={2} >
                <ComposedChart margin={{
                    top: 100,
                    right: 100,
                    left: 50,
                    bottom: 100
                }}
                    data={allTxsSorted}>
                    <XAxis axisLine={false} dataKey="date" />
                    <YAxis tick={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="amount" fill="#638B7E" stroke="#638B7E" />
                    <Bar dataKey="amount" barSize={20} fill="#638B7E" />
                    <Scatter dataKey="amount2" fill="#89C0AE" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GraphLogIncomeLogExpensesOverTime