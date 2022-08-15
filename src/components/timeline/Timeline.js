import React, { useState, useEffect } from "react"
import GlobalStyle from "../../styles/globalStyles";
import Header from '../header/Header.js';
import styled from "styled-components";
import axios from "axios"
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PublishPost from "./PublishPost";
import Post from "./Post";


export default function Timeline() {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [username, setUsername]= useState('');
    const [id, setId] = useState('');
    const [canPublish, setCanPublish] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [crash, setCrash] = useState(false)
    const { id: newId } = useParams();
    const local = localStorage.getItem("token");
    const localId = localStorage.getItem("id");
    console.log(localStorage)
    console.log(local)
    let location = useLocation();
    const config = {
        headers: {
            "Authorization": 'Bearer ' + local
        }
    }


    function renderById(id) {
        if(parseInt(id) !== parseInt(localId)){
            navigate(`/user/${id}`);
        }else{
            navigate('/timeline');
        }
        
    }

    function getPost() {
        setLoading(true)
        setId(parseInt(newId))
        if (!id) {
            const promise = axios.get('http://localhost:4000/post', config)
            promise.then(response => {
                let data = [...response.data]
                setPost(data)
                setLoading(false)
            })

            promise.catch(()=> {
                setLoading(false)
                setCrash(true)
            })
            setCanPublish(true)

        }else{
            const promise = axios.get(`http://localhost:4000/user/${id}`, config)
            promise.then(response => {
                let data = [...response.data]
                setPost(data)
                setLoading(false)
            })

            const userById = axios.get(`http://localhost:4000/user?id=${id}`, config);
            userById.then(response => {
                let data = {...response.data}
                setUsername(data)
                setLoading(false)
            });
          

            promise.catch(()=> {
                setLoading(false)
                setCrash(true)
            })
            userById.catch(()=> {
                setLoading(false)
                setCrash(true)
            })
            setCanPublish(false);
        }

    }


    useEffect(getPost, [id,location,newId, canPublish])

    function getUser() {
        const promise = axios.get('http://localhost:4000/post', config)
        promise.then(response => setUser(response.data))
    }
    return (
        <>
        <GlobalStyle />
        <Header />
        <Container>
        {canPublish?<Title>timeline</Title>:<Title>{username.username}'s posts</Title> }
        {canPublish ? <PublishPost getPost={getPost} /> : null}
        {loading ?
            <>
                <IconLoading />
                <MsgLoading>loading...</MsgLoading>
            </>
            :
            crash ?
                <>
                    <MsgError>
                        An error occured while trying to fetch the posts,
                        please refresh the page
                    </MsgError>
                </>
                :
                post.length > 0 ? post.map((item, index) =>
                    <Post username={item.username}
                        description={item.description}
                        renderById={renderById}
                        userId={item.userId}
                        url={item.url}
                        imageProfile = {item.profileImgUrl}
                        key={item.url + index}
                        idPost={item.id}
                        getPost ={getPost}
                    />
                )
                    :
                        <MsgError>There are no posts yet</MsgError>}
        </Container>
        </>
    )
}


const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin: auto;
`
const Title = styled.div`
width: 40%;
font-family: 'Oswald';
font-style: normal;
font-weight: 700;
font-size: 43px;
color: #FFFFFF;
margin: 100px auto 0px auto;
text-align: start;
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
margin-right: 10%;
margin-top: 10px;
`

const IconLoading = styled(AiOutlineLoading3Quarters)`
color: #FFFFFF;
margin-top: 60px;
width: 60%;
height: 50px;
`
const MsgLoading = styled.div`
color: white;
margin-top: 10px;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 30px;
`
const MsgError = styled.div`
color: white;
margin-top: 50px;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 30px;
`