import React from 'react';
import './Form.css'

export default function Form() {

return (
<form>
    
    <label>
        name:
        <input
        type="text"
        name="name" />
    </label>

    <br />

    <label>
        Email:
        <input
        type="text"
        email="email" />
    </label>

    <br />

    <label>
        Password:
        <input
        type="text"
        email="password" />
    </label>

    <br />

    <input type="checkbox" id="termsConditions" name="agree" value="terms" />
    <label> Agree to Terms and Conditions </label>

    <br />

    <button className="btn" type="submit"> Submit </button>

</form>
)
}