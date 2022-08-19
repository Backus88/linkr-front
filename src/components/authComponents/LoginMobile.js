import styled from "styled-components";
import "@fontsource/passion-one";
import {useNavigate} from "react-router-dom"
import React, {useState} from "react"
import axios from "axios"
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";


export default function LoginMobile(){

  const { setInfo } = useContext(UserContext);
  const {local, setLocal} = useContext(UserContext);

  const [login, setLogIn] = useState({
    email: '',
    password: '',
  })
  
  const navigate = useNavigate();

  function SignIn(e){
    e.preventDefault();
    e.currentTarget.disabled=true;
  
    if(e.currentTarget.disabled === true){
      e.target.style.background = "grey";
    }

    console.log('clicked')

    if(!login.email || !login.password){
      return alert('Fill all the necessary fields'), 
      e.currentTarget.disabled=false,
      e.target.style.background = '#1877F2';
    } 

    const URI = process.env.REACT_APP_DATABASE_URI

    const URL = `${URI}/signin`
    const signIn = login;
    const promise = axios.post(URL, signIn)
    promise
    .then( res => {
      const dados = res.data;

      setInfo(dados)
      console.log(dados)
      localStorage.setItem("token", dados.token);
      localStorage.setItem("img", dados.profileImgUrl);
      localStorage.setItem("id", dados.id);      

        if(local.length === 0){
          alert('bad request')
          window.location.reload(true)
        } else{
          navigate('/timeline')
        }
    })
    .catch(error => (
      console.log(error.response.data),
      alert(HandleError(error.response)),
      window.location.reload(true),
      e.currentTarget.disabled=false,
      e.target.style.background = '#1877F2'
    ))
  }
  function handleKeyDown(e){
    var key = e.key;
    if(key === 'Enter'){
      SignIn(e)
    }
  }

  function HandleError(error){
    if(error.status === 401){
      return 'email or password are incorrect'
    } else{
      return 'enter a valid email or password'
    }
  }

  function HandleClick(){
    navigate('/signup')
  }

  return (
    <LogInPageMobile>
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
          onKeyPress={(e) => handleKeyDown(e)}
          type="password" 
          placeholder="password" 
          value={login.password} 
          onChange={e => setLogIn({...login, password: e.target.value})} 
          required/>
          <button id={login} onClick={(e) => SignIn(e)} disabled={false}>Log In</button>
        <Button>
         <button onClick={HandleClick}>First time? Create an account</button>
        </Button>
      </Form>
    </LogInPageMobile>
  )

}

const LogInPageMobile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 280px;
  width: 100%;
  min-height: 665px;
  height: 100vh;
  background-color: #151515;
`

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
  width: 100%;
  color: white;
  font-family: "Passion One";
  justify-content: center;

  h1{
    text-align: center;
    font-size: 550%;
  }
  h2{
    text-align: center;
    font-size: 150%;
  }
`

const Form = styled.div`
  height:70%;
  width: 100%;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10%;

  input{
    width: 85%;
    height: 10%;
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
    width: 85%;
    height: 10%;
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
  width: 78%;
  height: 6.5%;

  button{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 95%;
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