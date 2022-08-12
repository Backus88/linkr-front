import React, { useState, useContext, useEffect } from "react"
import GlobalStyle from "./globalStyles";
import Header from './Header.js';
import styled from "styled-components";
import axios from "axios"
import UserContext from "../contexts/UserContext";




function Posts(props) {
    let {username,description} = props
    return (

        <>
            <Publication className="post">
                <ProfileImage></ProfileImage>
                <ContainerPost>
                    <UserName>{username}</UserName>
                    <DescriptionPost>{description}</DescriptionPost>
                </ContainerPost>
            </Publication>
        </>
    )
}
export default function Post() {
    const [post, setPost] = useState([])
    const [user, setUser] = useState([])
    const { local } = useContext(UserContext);
    console.log(local)
    const config = {
        headers: {
            "Authorization": 'Bearer ' + local
        }
    }

    function getPost() {
        const promise = axios.get('http://localhost:4000/post', config)
        promise.then(response => setPost(response.data))
    }
    useEffect(getPost, [])
    function getUser(){
        const promise = axios.get('http://localhost:4000/post', config)
        promise.then(response => setUser(response.data))
    }
    return (
        <>

            <GlobalStyle />
            <Header />
            <Container>
                <Title>timeline</Title>
                <PublishPost getPost={getPost}/>
              {post.map((item, index)=>
              <Posts username={item.username} 
              description={item.description}
              key={index} />)
              }
            </Container>
        </>
    )
}
function PublishPost(props) {
    const [enabled, setEnabled] = useState(true)
    const [url, setUrl] = useState('')
    const { local } = useContext(UserContext);
    const [description, setDescription] = useState('')
    const {getPost} = props
    const config = {
        headers: {
            "Authorization": 'Bearer ' + local
        }
    }
    function publish() {
        setEnabled(false)
        const promise = axios.post('http://localhost:4000/post',{
            url: url,
            description: description
        }, config)
        promise.catch(tratarError)
        promise.then(tratarSucesso)

        function tratarError() {
            alert('Houve um erro ao publicar seu link')
            setEnabled(true)
        }
        function tratarSucesso() {
            setEnabled(true)
            setUrl('')
            setDescription('')
            getPost()

        }
    }
    return (
        <>
            {
                (enabled == true) ?
                    <Publish>
                        <ProfileImage></ProfileImage>
                        <ContainerPost>
                            <ShareHeader>What are you going to share today?</ShareHeader>
                            <input type='text' placeholder="http://..." onChange={e => setUrl(e.target.value)} />
                            <input className="input2" type='text' placeholder="Awesome article about #javascript" onChange={e =>setDescription(e.target.value)}/>
                            <Button onClick={publish}>Publish</Button>
                        </ContainerPost>
                    </Publish>
                    :
                    <Publish>
                        <ProfileImage></ProfileImage>
                        <ContainerPost>
                            <ShareHeader>What are you going to share today?</ShareHeader>
                            <input type='text' placeholder="http://..." disabled/>
                            <input className="input2" type='text' placeholder="Awesome article about #javascript" disabled />
                            <Button>Publishing...</Button>
                        </ContainerPost>
                    </Publish>
            }
        </>
    )
}
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;


`
const Title = styled.div`
font-family: 'Oswald';
font-style: normal;
font-weight: 700;
font-size: 43px;
color: #FFFFFF;
margin-top: 100px;

`
const Publish = styled.div`
width: 40%;
height: 190px;
margin-top: 40px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`
const ProfileImage = styled.div`
background-color : black;
width: 50px;
height: 50px;
border-radius: 50%;
margin-top: 10px;
margin-left: 5px;
position: absolute;
`
const ContainerPost = styled.div`
display: flex;
flex-direction:column;


input{
width: 78%;
height: 30px;
background: #EFEFEF;
border-radius: 3px;
margin-top: 10px;
outline:none;
border: 0 none;
margin-left: 80px;
}
.input2{
padding-bottom: 50px;
height: auto;

}
input::placeholder{
color: #949494;
margin-top: 5px;


}


`
const ShareHeader = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 300;
font-size: 20px;
color: #707070;
text-align: center;
margin-top: 5px;
`
const Button = styled.div`
background: #1877F2;
border-radius: 5px;
font-family: 'Lato';
font-style: normal;
font-weight: 600;
font-size: 14px;
text-align: center;
color: #FFFFFF;
width:17%;
padding: 5px;
align-self: flex-end;
margin-top: 10px;
margin-right: 80px;
`
const Publication = styled.div`
width: 40%;
height: 257px;
margin-top: 40px;
background: #171717;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`
const UserName = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 600;
font-size: 19px;
color: #FFFFFF;
margin-top: 15px;
margin-left: 80px;
`
const DescriptionPost = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 20px;
color: #B7B7B7;
margin-left: 80px;
margin-top: 10px;
`
