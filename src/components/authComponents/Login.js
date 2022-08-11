import styled from "styled-components";
import "@fontsource/passion-one";
import {useNavigate} from "react-router-dom"
import React, {useState} from "react"
import axios from "axios"


export default function Login(){

  const [login, setLogIn] = useState({
    email: '',
    password: '',
  })

  console.log(login)
  const navigate = useNavigate();

  console.log(login)

  function SignIn(e){
    e.preventDefault();
    e.currentTarget.disabled=true;
    console.log('clicked')

    if(!login.email || !login.password){
      return alert('Fill all the necessary fields')
    } 

    const URL = "http://localhost:4000/signin"
    const signIn = login;
    const promise = axios.post(URL, signIn)
    promise
    .then( res => {
      console.log(res.data)
      navigate('/timeline')
    })
    .catch(error => (
      console.log(error.response.data),
      alert(HandleError(error.response)),
      window.location.reload(true),
      e.currentTarget.disabled=false
    ))
  }

  function HandleError(error){
    if(error.status === 401){
      return 'email or password are incorrect'
    }
  }

  function HandleClick(){
    navigate('/signup')
  }

  return(
    <LogInPage>
      <Logo>
        <h1>linkr</h1>
        <h2>save, share and discover <br/> the best links on the web</h2>
      </Logo>
      <Form>
        <input 
        type="text" 
        placeholder="email" 
        value={login.email} 
        onChange={e => setLogIn({...login, email: e.target.value})} 
        required />
        <input 
        type="password" 
        placeholder="password" 
        value={login.password} 
        onChange={e => setLogIn({...login, password: e.target.value})} 
        required/>
        <button onClick={SignIn} disabled={false}>Log-In</button>
        <Button>
         <button onClick={HandleClick}>First time? Create an account</button>
        </Button>
      </Form>
    </LogInPage>
  )
}

const LogInPage = styled.div`
  display: flex;
  min-width: 375px;
  width: 100%;
  min-height: 665px;
  height: 100vh;
  background-color: #151515;
`

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  color: white;
  font-family: "Passion One";

  justify-content: center;

  h1{
    font-size: 6.625rem;
    padding-left: 20%;
  }
  h2{
    font-size: 2.75rem;
    padding-left: 20%;
  }
`

const Form = styled.div`
  width:40%;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input{
    width: 65%;
    height: 6.5%;
    margin-bottom: 1rem;
    padding-left: 1rem;
    border-radius: 0.375rem;
    font-family: 'Oswald', sans-serif;
    font-size: 140%;
    font-weight: 700;
    border: none;
    ::placeholder,
    ::-webkit-input-placeholder {
    color:#9F9F9F;
    }
    outline: none;
  }

  button{
    width: 68%;
    height: 6.5%;
    background: #1877F2;
    border: none;
    border-radius: 0.375rem;
    font-family: 'Oswald', sans-serif;    
    font-size: 140%;
    font-weight: 700;   
    color: white; 
  }
`

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68%;
  height: 6.5%;

  button{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 700;
    font-family: 'Josefin Sans', sans-serif;
    margin-top: 40px;
    width: 85%;
    height: 46px;
    border: none;
    border-radius: 26px;
    background-color: transparent;
    color: white;
  }

`