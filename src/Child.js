import React, {useContext, useState} from 'react';
import {TransactionContext} from './Context'

function Child() {

    let {transactions, addTransaction} = useContext(TransactionContext);

    let [text, setText] = useState("");
    let [amount, setAmount] = useState(0);

    const onSubmission = (e) => {
        e.preventDefault();
        addTransaction({
            amount: Number(amount),
            description: text,
        });

        setText('');
        setAmount(0);
    }

    const getIncome = () => {
        let income = 0;
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].amount > 0)
                income += transactions[i].amount 
        }
        return income; 
    }

    const getExpense = () => {
        let expense = 0;
        for (var j = 0  ; j < transactions.length; j++) {
            if (transactions[j].amount < 0)
                expense += transactions[j].amount
        }
        return expense;
    }

    return (
        <div className="container">
            <h2 className="main-heading">Express Tracker App</h2>
            <h4>Your Balance <br/> Rs. {getIncome() + getExpense()}</h4>

            <div className="expense-container">
                <h4>Income <br/> Rs. {getIncome()}</h4>
                <h4>Expense <br/> Rs. {getExpense()}</h4>
            </div>

            <h4>History</h4>
            <hr/>

            <ul className = "transaction-list">
                {transactions.map((transObj, index) => {
                    return(<li key={index}>
                            <span>{transObj.description}</span>
                            <span>{transObj.amount}</span>
                        </li>
                    )
                })}
                <hr/>   
            </ul>

            <h4>Add Transaction</h4>
            <hr/>

            <form className="transaction-form" onSubmit={onSubmission}>
                <label>Description of Transaction</label>
                <br/>
                <input type="text" value = {text} onChange={(e) => setText(e.target.value)}  required />

                <br/>
                <label>Enter Amount</label>
                <br/>
                <input type="text" value = {amount} onChange={(e) => setAmount(e.target.value)} required />

                <br/>
                <input type="submit" value="Add Transaction" id="submit-button" />
            </form>
        </div>
    );
}

export default Child;