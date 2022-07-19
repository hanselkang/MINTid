import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getElements } from '../services/TrackerServices';
import RegisterIncomeEach from './RegisterIncomeEach';
import FirstGraph from './FirstGraph';

const RegisterIncome = () => {


    const [personList, setPersonList] = useState([])
    const [total, setTotal] = useState(0)
    const [household, setHousehold] = useState([])
    const [formCount, setFormcount] = useState(1)
    const [formCount2, setFormcount2] = useState(1)




    const handleFormClick = () => {
        setFormcount(formCount + 1);
    }

    const handleFormClick2 = () => {
        setFormcount2(formCount2 + 1);
    }

    useEffect(() => {
        getElements("persons")
            .then(item => setPersonList(item))
    }, [])
    useEffect(() => {
        getElements("households")
            .then(item => setHousehold(item))
    }, [])



    const calculateTotal = () => {

        let total = 0
        if (personList[0]) {
            for (let i = 0; i < personList.length; i++) {
                total += personList[i].currentPosition / 100
            }
            return total
        }

    }

    const handleChange = (event) => {
        let debtArray = document.getElementsByName("debt")
        for (let i = 0; i < debtArray.length; i++) {
            if (parseInt(debtArray[i].value) > 0) {
                total += parseInt(debtArray[i].value)
            }
        }
        setTotal(total)
    }

    const leftMoney = () => {
        const total = household[0].target / 100 - calculateTotal()
        return total.toLocaleString()
    }


    return (
        <>
            <div className="align">
                <br />
                <br />
                <div className="center-text" >OK We have £ {personList[0] ? calculateTotal().toLocaleString() : <div> Loading </div>} </div>
                <FirstGraph amount={personList[0] ? calculateTotal() : <div> Loading </div>} amount2={household[0] ? household[0].target : <p> Loading </p>} />
                <br />

                <br />
                <div className="center-text ">
                    {household[0] ? <div>£{leftMoney()} </div> : <div> Loading </div>}  <div> we need not to waste! </div>
                </div>

                <br />

                {Array.from(Array(personList.length)).map((number, index) => {
                    return (
                        <div >
                            <br />
                            <hr />
                            {personList[0] == personList[index] ? <div key={uuidv4()} >Right, {personList[index].name}, what're you bringing home each month?
                                <br />
                                <br />

                                <button className="btn btn-outline-primary" onClick={handleFormClick}> Add Another Source </button>

                                {Array.from(Array(formCount)).map((number, idx) => {

                                    return (
                                        <RegisterIncomeEach person={personList[index]} id={uuidv4()} />)
                                })
                                }


                            </div>
                                : <div key={uuidv4()} >And you, {personList[index].name}? What you stacking?
                                    <br />
                                    <br />

                                    <button className="btn btn-outline-primary" onClick={handleFormClick2}> Add Another Source </button>

                                    {Array.from(Array(formCount2)).map((number, idx) => {

                                        return (
                                            <RegisterIncomeEach person={personList[index]} id={uuidv4()} />)
                                    })
                                    }

                                </div>}
                            <br />
                        </div>
                    )

                }
                )
                }
                <a href="http://localhost:3000/dashboard"> Visualise Goal</a>

            </div>
        </>)
}

export default RegisterIncome