import React, { useState } from 'react';
import SetupMenu from '../SetupMenu';

const Target = () => {

    const [target, setTarget] = useState(0)
    const [date, setDate] = useState()

    // Error Messages
    const [message, setMessage] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch("http://localhost:8080/households/1", {
                method: "PUT",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify({
                    target: target*100,
                    date: date
                }

                )

            })
            console.log(res.body)

            const resJson = await res.json()
            if (res.status === 202) {
                setMessage("Target Saved")
            } else {
                setMessage("Error")
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    const handleTargetChange = (event) => {
        setTarget(event.target.value)
    }

    const handleDateChange = (event) => {
        setDate(event.target.value)
    }

    return (
        <>
            <SetupMenu />

            <div className="align">
            <h1>You wanna change your goal? You sure?</h1>
            <form class="form-group" onSubmit={handleSubmit}>

                <div>
                    What is it now? £
                    <br />
                    <br />

                    <input className="form-control" id="pound" type="number" onChange={handleTargetChange} value={target} required />
                    <br /> By
                    <br />
                    <br />
                    <input className="form-control" type="date" onChange={handleDateChange} value={date} required /> <br />
                    <button className="btn btn-outline-primary" onClick={handleSubmit} type="submit-target">Set Goal</button>

                    <br />
                    {message}
                </div>
            </form>
            </div>
        </>
    )

}

export default Target