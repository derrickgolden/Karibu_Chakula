

import { useState } from "react";

const Login  = ({onHandleChangeSignupLoginForm , handleLogin, onHandleResetPassword }) =>{
    const [usernamePassword, setUsernamePassword] = useState({usernameEmail: "", password: ""})

    const handleUsernamePasswordInput = (e) =>{
        const {name, value} = e.target;
        setUsernamePassword((prevUsernamePassword) =>({
            ...prevUsernamePassword, [name]: value
        }))
    }
    const handleSubmitLogin = (e) =>{
        e.preventDefault();

        fetch("http://localhost:5003/login", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(usernamePassword)
        })
        .then(response => response.json())
        .then(result =>{
            if(result.success){
                handleLogin(true);
            }else{
                console.log(result)
            }
        } )
        .catch(error => console.log('error', error));
    }
    return(
        <div className="flex flex-col justify-center items-center px-2">
            <div className="flex flex-col justify-center items-center bg-lightOrange
                w-full md:w-1/2 py-8 px-2 text-center rounded-md gap-4 mt-8 ">
                <h2 className="text-4xl text-darkBlack">
                    Log In
                </h2>
                <form  onSubmit={(e) => handleSubmitLogin(e)}
                className="flex flex-col justify-center items-center w-11/12
                es:w-3/4 py-2 gap-4">
                    <input onChange={(e) => handleUsernamePasswordInput(e)}
                    type="text" name="usernameEmail" id="usernameEmail" placeholder="Username"
                    autoComplete="false" value={usernamePassword.usernameEmail} required
                    className="px-4 py-2 rounded w-full outline-0"/>
                    <input onChange={(e) => handleUsernamePasswordInput(e)}
                    type="password" name="password" id="password" placeholder="Password" 
                    required value={usernamePassword.password}
                    className="px-4 py-2 rounded w-full outline-0"/>

                    <button type="submit" 
                    className="flex justify-center items-center gap-2 border border-darkBlack
                        px-4 py-2 rounded-sm hover:text-textWhite hover:bg-darkGray w-full"
                        onClick={() =>{}}>
                        Log In
                    </button>
                </form>

                <p onClick={() => onHandleResetPassword({r_password: true})}>Forgot your password? 
                    <a href="#" className="underline hover:tracking-wider">
                        Reset
                    </a>
                </p>
                
                <p onClick={() => onHandleChangeSignupLoginForm()}>
                    You don't have an account? <a href="#" 
                className="underline hover:tracking-wider">Sign Up</a> </p>
            </div>
        </div>
    )
}

export default Login;