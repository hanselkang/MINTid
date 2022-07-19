import { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, ScatterChart, ComposedChart, Area, Bar, BarChart } from 'recharts'
import { getElements } from '../services/TrackerServices'


const GraphLogIncomeLogExpensesMonthly = () => {

    const [expenses, setExpenses] = useState([])
    const [incomes, setIncomes] = useState([])
    const [months, setMonths] = useState(0)

    const handleMonthChange = (event) => {
        setMonths(parseInt(event.target.value))
    }

    useEffect(() => {
        getElements("expenses")
            .then(item => setExpenses(item))
    }, [])

    useEffect(() => {
        getElements("incomes")
            .then(item => setIncomes(item))
    }, [])

    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear();
    let nameOfMonth = new Date().toLocaleString(
        'default', { month: 'long' }
    )

    const toMonthsName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('default', {
            month: 'long'
        })
    }

    if (months !== 0) {
        currentMonth = months;
        currentYear = new Date().getFullYear();
        nameOfMonth = toMonthsName(months)
        
    } else {

        currentMonth = new Date().getMonth() + 1;;
        currentYear = new Date().getFullYear();
        nameOfMonth = new Date().toLocaleString(
            'default', { month: 'long' })
    }



    const thisMonthsExpenses = expenses.filter(expense => {
        return expense.date.substring(0, 4).match(currentYear) && expense.date.substring(5, 7).match(currentMonth);
    })

    const thisMonthsIncomes = incomes.filter(income => {
        return income.date.substring(0, 4).match(currentYear) && income.date.substring(5, 7).match(currentMonth);
    })

    const TotalExpenseThisMonth = () => {
        let totalExpense = 0;
        for (let i = 0; i < thisMonthsExpenses.length; i++) {
            totalExpense += thisMonthsExpenses[i].amount
        }
        return totalExpense
    }

    const TotalIncomeThisMonth = () => {
        let totalIncome = 0;
        for (let i = 0; i < thisMonthsIncomes.length; i++) {
            totalIncome += thisMonthsIncomes[i].amount
        }
        return totalIncome
    }


    const data2 = [{
        name: nameOfMonth,
        income: TotalIncomeThisMonth() / 100,
        expense: TotalExpenseThisMonth() / 100,
    },
    ];


    return (
        <>
            <div className='monthlyGraph'>

                <ResponsiveContainer width="100%" aspect={2} >
                    <BarChart width={500} height={300} data={data2} margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Area type="monotone" dataKey="amount" fill="#638B7E" stroke="#638B7E" />
                        <Tooltip />
                        <Bar barSize={100} dataKey="income" fill="#638B7E" />
                        <Bar barSize={100} dataKey="expense" fill="#89C0AE" />
                    </BarChart>
                </ResponsiveContainer>
                <select className="form-select month-select"  onChange={handleMonthChange} name="months" id="months">
                    <option value="0" selected>This Month</option>
                    <option value="1">Jan</option>
                    <option value="2">Feb</option>
                    <option value="3">Mar</option>
                    <option value="4">Apr</option>
                    <option value="5">May</option>
                    <option value="6">Jun</option>
                    <option value="7">Jul</option>
                    <option value="8">Aug</option>
                    <option value="9">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                </select>
            </div>
        </>
    )
}

export default GraphLogIncomeLogExpensesMonthly