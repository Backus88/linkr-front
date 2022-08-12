import styled from "styled-components";
import "@fontsource/passion-one";
import {useNavigate} from "react-router-dom"
import React, {useState} from "react"
import axios from "axios"
import MediaQuery from 'react-responsive'
import SignUpMobile from "./SignUpMobile";


export default function SignUp(){

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    profileImg: ''
  })

  console.log(form)
  const navigate = useNavigate();

  console.log(form)

  function SignUp(e){
    e.preventDefault();
    e.currentTarget.disabled=true;
    console.log('clicked')

    if(!form.username || !form.email || !form.password || !form.profileImg){
      return alert('Fill all the necessary fields')
    } 

    const URL = "http://localhost:4000/signup"
    const signUp = form;
    const promise = axios.post(URL, signUp)
    promise
    .then( res => {
      console.log(res.data)
      navigate('/')
    })
    .catch(error => (
      console.log(error.response.data),
      alert(HandleError(error.response)),
      window.location.reload(true),
      e.currentTarget.disabled=false
    ))
  }

  function HandleError(error){

    if(error.status === 422){
      return error.data
    } else {
      return 'something went wront'
    }

  }

  function HandleClick(){
    navigate('/')
  }

  return(
    <>
      <MediaQuery minWidth={1024}>
      <SignUpPage>
        <Logo>
          <h1>linkr</h1>
          <h2>save, share and discover <br/> the best links on the web</h2>
        </Logo>
        <Form>
          <input 
          type="text" 
          placeholder="email" 
          value={form.email} 
          onChange={e => setForm({...form, email: e.target.value})} 
          required />
          <input 
          type="password" 
          placeholder="password" 
          value={form.password} 
          onChange={e => setForm({...form, password: e.target.value})} 
          required/>
          <input 
          type="text" 
          placeholder="username" 
          value={form.username} 
          onChange={e => setForm({...form, username: e.target.value})} 
          required/>
          <input 
          type="url" 
          placeholder="picture url"  
          value={form.profileImg} 
          onChange={e => setForm({...form, profileImg: e.target.value})}/>
          <button onClick={SignUp} disabled={false}>Sign Up</button>
          <Button>
          <button onClick={HandleClick}>Switch back to login.</button>
          </Button>
        </Form>
      </SignUpPage>
      </MediaQuery>
      <MediaQuery maxWidth={1023}>
        <SignUpMobile />
      </MediaQuery>
    </>
  )
}

const SignUpPage = styled.div`
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
    width: 65%;
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