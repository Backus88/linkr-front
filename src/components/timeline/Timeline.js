import React, { useState, useEffect } from "react"
import GlobalStyle from "../../styles/globalStyles";
import Header from '../header/Header.js';
import styled from "styled-components";
import axios from "axios"
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PublishPost from "./PublishPost";
import Post from "./Post";
import TrendingBox from "./TrendingBox";
import MediaQuery from 'react-responsive'
import TimelineMobile from "./timeline_mobile/TimelineMobile";
import InfiniteScroll from 'react-infinite-scroller';


export default function Timeline() {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState('');
    const [hashtagController, setHashtagController] = useState(false)
    const [id, setId] = useState('');
    const [canPublish, setCanPublish] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [crash, setCrash] = useState(false)
    const { id: newId } = useParams();
    const local = localStorage.getItem("token");
    const localId = localStorage.getItem("id");
    const [hasMore, setHasMore] = useState(true)
    let location = useLocation();
    const config = {
        headers: {
            "Authorization": 'Bearer ' + local
        }
    }

    function checkToken() {
        const token = localStorage.getItem("token")

        if (!token) {
            return navigate('/')
        }
    }

    useEffect(() => {
        checkToken()
    }, [])


    function renderById(id) {
        console.log("chamou esse ttrm aqui")
        if (parseInt(id) !== parseInt(localId)) {
            setId(parseInt(id))
            setPost([])
            setHasMore(true)
            navigate(`/user/${id}`);
        } else {
            navigate('/timeline');
        }

    }

    function handleHasMore() {

        if (!loading) {
            getPost()
        }
    }
    function verifyId() {
        if (newId) {
            setId(parseInt(newId))
        }
    }
    useEffect(verifyId, [id, newId])
    function getPost() {
        setLoading(true)
        if (!id) {
            const offset = post.length
            const promise = axios.get(`http://localhost:4000/post?offset=${offset}`, config)
            promise.then(response => {
                let data = [...post, ...response.data]
                if (response.data.length === 0) {
                    setHasMore(false)

                } else {
                    setPost(data)

                }

                setLoading(false)

            })
            promise.catch(() => {
                setLoading(false)
                setCrash(true)
            })
            setCanPublish(true)
            setLoading(false)


        } else {
            const offset = post.length
            const promise = axios.get(`http://localhost:4000/user/${id}?offset=${offset}`, config)
            promise.then(response => {
                let data = [...post, ...response.data]
                if (response.data.length === 0) {
                    setHasMore(false)
                } else {
                    setPost(data)
                }
                setLoading(false)
            })

            const userById = axios.get(`http://localhost:4000/user?id=${id}`, config);
            userById.then(response => {
                let data = { ...response.data }
                setUsername(data)
                setLoading(false)
            });


            promise.catch(() => {
                setLoading(false)
                setCrash(true)
            })
            userById.catch(() => {
                setLoading(false)
                setCrash(true)
            })
            setCanPublish(false);
        }

    }


    //useEffect(getPost, [id, location, newId, canPublish])

    function getUser() {
        const promise = axios.get('https://linkr-db.herokuapp.com/post', config)
        promise.then(response => setUser(response.data))
    }
    return (
        <>
            <MediaQuery minWidth={1280}>
                <GlobalStyle />
                <Header />
                <Container>
                    <Main>

                        {canPublish ? <Title>timeline</Title> : <Title>{username.username}'s posts</Title>}
                        {canPublish ? <PublishPost getPost={getPost}
                            setPost={setPost}
                            hashtagController={hashtagController}
                            setHashtagController={setHashtagController} /> : null}
                               <InfiniteScroll
                                    key={"scroll"}
                                    loadMore={handleHasMore}
                                    pageStart={0}
                                    hasMore={hasMore}
                                    loader={
                                        <div style={{ clear: "both" }}>
                                            <IconLoading />
                                            <MsgLoading>Loading more posts...</MsgLoading>
                                        </div>
                                    }
                                    initialLoad={true}

                                >
                        {
                            crash ?
                                <>
                                    <MsgError>
                                        An error occured while trying to fetch the posts,
                                        please refresh the page
                                    </MsgError>
                                </>
                                :
                                    post.length > 0 ?
                                        post.map((item, index) =>
                                            <Post username={item.username}
                                                description={item.description}
                                                renderById={renderById}
                                                userId={item.userId}
                                                url={item.url}
                                                imageProfile={item.profileImgUrl}
                                                key={item.url + index}
                                                idPost={item.id}
                                                getPost={getPost}
                                                hashtagController={hashtagController}
                                                setHashtagController={setHashtagController}
                                            />
                                        )
                                        :
                                        <MsgError>There are no posts yet</MsgError>
                        }</InfiniteScroll>
                    </Main>
                    <TrendingBox hashtagController={hashtagController} />
                </Container>
            </MediaQuery>
            <MediaQuery maxWidth={1279}>
                <TimelineMobile />
            </MediaQuery>
        </>
    )
}


const Container = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content:center;
margin: auto;
`

const Main = styled.div`
width: 43%;
max-width: 560px;
`

const Title = styled.div`
width: 40%;
font-family: 'Oswald';
font-style: normal;
font-weight: 700;
font-size: 43px;
color: #FFFFFF;
margin: 100px 0 0px 0;
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
margin: 60px auto 0px auto;
width: 100%;
height: 50px;
align-self: center;
`
const MsgLoading = styled.div`
width: 100%;
color: white;
margin-top: 10px;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 30px;
margin: 10px auto 0px 10px;
text-align: center;
`
const MsgError = styled.div`
width: 100%;
color: white;
margin-top: 50px;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 30px;
margin: 60px auto 0px auto;
text-align: center;
`