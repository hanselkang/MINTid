import React, { useEffect, useState } from 'react';
import { getElements } from '../../services/TrackerServices'

const PersonEdit = (idx) => {


    const [person, setPerson] = useState('')
    const [message, setMessage] = useState('')
    const [deleteMessage, setDeleteMessage] = useState('')
    const [position, setPosition] = useState(0)
    const [newPersonName, setNewPersonName] = useState('')
    const [loan, setLoan] = useState(0)
    const [household, setHousehold] = useState([])

    const fetchData = () => {
        getElements("persons")
            .then(item => setPerson(item))
        getElements("households")
            .then(item => setHousehold(item))

    }

    useEffect(() => {
        fetchData()
    }, [])



    const dUrl = "http://localhost:8080/persons/?id="
    const dUrlPurpose = "http://localhost:8080/purposes/?id="

    const handleDelete = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch(dUrl + idx.idx.id, {
                method: "DELETE"
            })
            const res2 = await fetch(dUrlPurpose + idx.idx.id, {
                method: "DELETE"
            })

            const resJson = await res.json()
            if (res.status === 202, res2.status === 202) {
                setDeleteMessage("Person DELETED")
            } else {
                setDeleteMessage("Error")
            }
            fetchData()
        }
        catch (err) {
            console.log(err)
        }

    }


    const url = "http://localhost:8080/persons/"
    const urlPurpose = "http://localhost:8080/purposes/"
    const handleSubmit = async (event) => {
        event.preventDefault()
        fetchData()
        try {
            const res = await fetch(url + idx.idx.id, {
                method: "PUT",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify({
                    currentPosition: position*100,
                    loan: loan*100,
                    name: newPersonName,
                    household: household[0]
                }
                )
            })

            const res2 = await fetch(urlPurpose + idx.idx.id, {
                method: "PUT",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify({
                    purposeName: newPersonName
                }
                )
            })

            const resJson = await res.json()
            if (res.status === 202, res2.status === 202) {
                setMessage("Person Changed")
            } else {
                setMessage("Error")
            }
        }
        catch (err) {
            console.log(err)
        }
        fetchData()

    }


    const handleNewPersonChange = (event) => {
        setNewPersonName(event.target.value)
    }
    const handleNewPositionChange = (event) => {
        setPosition(event.target.value)
    }
    const handleLoanChange = (event) => {
        setLoan(event.target.value)
    }




    return (
        <div>

            <form onSubmit={handleSubmit}>

                <input className="form-control" type="text" onChange={handleNewPersonChange} value={newPersonName} required placeholder="You change your name?" />

                <br />
                <br />
                <br />
                <label for="position">What's your positive balance now?</label>
                <br />
                <br />
                <input className="form-control" type="number" onChange={handleNewPositionChange} value={position} name="position" required /> <br />
                <br />
                <br />
                <label for="loan">Still got debts?</label>
                <br />
                <br />
                <input className="form-control"  name="loan" type="number" onChange={handleLoanChange} value={loan} required /> <br />


                <button className="btn btn-outline-primary"  onClick={handleSubmit} type="submit-target" >Update Person's Position</button>

   <br />
                {message}
            </form>
            <form onSubmit={handleDelete}>
                <div>

                    <button className="btn btn-outline-primary"  onClick={handleDelete} type="submit-target" >Delete Person</button>

                    <br />
                    {deleteMessage}
                </div>
            </form>
        </div>
    )
}

export default PersonEdit