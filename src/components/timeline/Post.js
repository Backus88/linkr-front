import React, { useState, useContext, useEffect } from "react"
import GlobalStyle from "../../styles/globalStyles";
import Header from '../header/Header.js';
import Like from "./Like.js";
import styled from "styled-components";
import axios from "axios"
import { useParams, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PublishPost from "./PublishPost";


function Posts(props) {
    const [title, setTitle] = useState('');
    const [descrip, setDescrip] = useState('');
    const [image, setImage] = useState('');
    const [uri, setUri] = useState('');
    let {
        username,
        description,
        renderById,
        userId,
        url,
        imageProfile,
        idPost
    } = props
    function getMetadata() {
        const promise = axios.get(
            `http://localhost:4000/url-metadata?url=${url}`)
        promise.then(response => {
            setTitle(response.data.title)
            setDescrip(response.data.description)
            setImage(response.data.image)
            setUri(response.data.uri)
        })
    }
    useEffect(getMetadata, [])

    return (
        <>
            <Publication className="post">
                <ProfileImage src={imageProfile}></ProfileImage>
                <ContainerPost>
                    <UserName onClick={() => renderById(userId)} >{username}</UserName>
                    <DescriptionPost>{description}</DescriptionPost>
                    <ContainerUrl onClick={() => window.open(uri)}>
                        <ContainerDatas>
                            <TitleUrl>{title}</TitleUrl>
                            <DescriptionUrl>{descrip}</DescriptionUrl>
                            <UrlPost>{uri}</UrlPost>
                        </ContainerDatas>
                        <Photo src={image}></Photo>
                    </ContainerUrl>
                </ContainerPost>
            <Like idPost ={idPost}/>
            </Publication>
        </>
    )
}
export default function Post() {
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
    let location = useLocation();
    const config = {
        headers: {
            "Authorization": 'Bearer ' + local
        }
    }


    function renderById(id) {
        navigate(`/user/${id}`);
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
                            <Posts username={item.username}
                                description={item.description}
                                renderById={renderById}
                                userId={item.userId}
                                url={item.url}
                                imageProfile = {item.profileImgUrl}
                                key={item.url + index}
                                idPost={item.id}
                                 />
                        )
                            :
                             <MsgError>There are no posts yet</MsgError>}
            </Container>
        </>
    )
}


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 10px;


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
const ProfileImage = styled.img`
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
padding-right: 10px;

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

    input{
        font-family: 'Lato';
        font-style: normal;
        color: #E5E5E5;
    }
    
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
const Publication = styled.div`
width: 40%;
height: 257px;
margin-top: 40px;
background: #171717;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
position:relative;
`
const UserName = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 600;
font-size: 19px;
color: #FFFFFF;
margin-top: 15px;
margin-left: 80px;
cursor: pointer;
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
const ContainerUrl = styled.div`
width: 85%;
height: 160px;
margin-top: 15px;
background: #171717;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border: 1px solid #4D4D4D;
border-radius: 11px;
color: #FFFFFF;
margin-left: 80px;
display: flex;
`
const TitleUrl = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 22px;
color: #CECECE;
margin-top: 20px;
margin-left: 15px;
`
const DescriptionUrl = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 15px;
color: #9B9595;
margin-left: 15px;
margin-top: 10px;
`
const Photo = styled.img`
width: 30%;
height: 100%;
background: url(image.png);
border-radius: 0px 12px 13px 0px;
align-self: flex-end;
`
const UrlPost = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 13px;
color: #CECECE;
margin-left: 15px;
margin-top: 5px;
bottom: 0;
position: relative;
`
const ContainerDatas = styled.div`
display: flex;
flex-direction: column;
margin-right: 10px;
width: 70%;
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