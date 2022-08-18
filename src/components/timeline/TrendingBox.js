import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



export default function TrendingBox(props){

    const [hashtag, setHashtag] = useState([]);
    const [loading, setLoading] = useState(true)
    const [crash, setCrash] = useState(false)
    const {hashtagController} = props
    
    function getTrending(){
        setLoading(true)
        const URI = process.env.REACT_APP_DATABASE_URI
        const promise = axios.get(`${URI}/trending`)
        promise.then(response => {
            let data = [...response.data]
            setHashtag(data)
            setLoading(false)
        })
        promise.catch(()=> {
            setLoading(false)
            setCrash(true)
        })
    
    }

 useEffect(()=>{
        getTrending()
}, [hashtagController])


return (
    <Box> 
        <Title>
            <h1>trending</h1>
            <div></div>
        </Title>
        <Main>

        {loading ?
            <>
                <IconLoading />
                <MsgLoading>loading...</MsgLoading>
            </>
            :
            crash ?
                <>
                    <MsgError>
                        An error occured while trying to fetch the hashtags,
                        please refresh the page
                    </MsgError>
                </>
                :
                hashtag.length > 0 ? hashtag.map((item, index) =>{
                    return(
                        <HashtagDiv>
                            <HashtagLink to={`/hashtag/${item.hashtag.slice(1)}`}> {item.hashtag} </HashtagLink>
                        </HashtagDiv>
                    )
                }        )
                    :
                        <MsgError>There are no hashtags yet</MsgError>}
        </Main>
    </Box>
)
}

const Box = styled.div`
width: 301px;
height: 406px;
margin: 183px 0 0 25px; 
background: #171717;    
border-radius: 16px;

`

const Title = styled.div`
    height: 61px;
    display:flex;
    align-items:center;
    padding-left: 16px;
    border-bottom: 1px solid #484848;

h1{
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
}
`

const IconLoading = styled(AiOutlineLoading3Quarters)`
color: #FFFFFF;
margin-top: 60px;
padding-right: 20px;
width: 100%;
height: 50px;
`
const MsgLoading = styled.div`
width: 100%;
color: white;
margin-top: 10px;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 30px;
text-align: center;
`
const MsgError = styled.div`
width: 100%;
color: white;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 20px;
margin-left: -7px;
text-align: center;
`

const Main = styled.div`
<<<<<<< HEAD
padding-bottom: 20px;
padding-left: 16px;
/* margin: 22px auto 5px 16px; */
=======
margin: 14px auto 5px 16px;
>>>>>>> 6f53a08a35467118be445d70ee2e8773f1f38bc8
`

const HashtagDiv = styled.div`
margin-top: 10px;

`


const HashtagLink = styled(Link)`
text-decoration: none;
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 19px;
line-height: 23px;
letter-spacing: 0.05em;

color: #FFFFFF;

:hover{
    cursor: pointer;
}
`

