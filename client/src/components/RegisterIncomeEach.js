import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


const RegisterIncomeEach = (person) => {


    const [amount, setAmount] = useState(0)
    const [incomeName, setIncomeName] = useState('')
    const [date, setDate] = useState()
    const [message, setMessage] = useState('')


    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }


    const handleNameChange = (event) => {
        setIncomeName(event.target.value)
    }

    const handleDateChange = (event) => {
        setDate(event.target.value)
    }



    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch("http://localhost:8080/incomes", {
                method: "POST",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify({
                    incomeName: incomeName,
                    amount: amount * 100,
                    date: date,
                    salary: true,
                    person: {
                        id: person.person.id
                    }
                })
            })
            const resJson = await res.json()
            if (res.status === 201) {
                setMessage("Income has been Saved")
            } else {
                setMessage("Error")
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <>

            
                    <form onSubmit={handleSubmit}>
                        <br />
                        <input className="form-control" type="text" onChange={handleNameChange} name="incomeName" id={uuidv4()} placeholder="from where" />
                        <input className="form-control" type="number" onChange={handleAmountChange} name="amount" id={uuidv4()} placeholder="how much" />
                        <input className="form-control" type="date" onChange={handleDateChange} name="date" value={date} id={uuidv4()} />
                        <br />
                <button className="btn btn-outline-primary" onClick={handleSubmit()} type="submit">Set Income Source</button><br />

                {message}
                    </form>



        </>
    )

}

export default RegisterIncomeEach