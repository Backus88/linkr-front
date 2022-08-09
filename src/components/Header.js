import styled from "styled-components";
import { VscChevronDown } from "react-icons/vsc";
export default function Header() {
    return (
        <>
            <HeaderStyled>
                <Title>linkr</Title>
                <Profile>
                <Icon />
                <ProfileImage></ProfileImage>
                </Profile>
            </HeaderStyled>
        </>
    )
}
const HeaderStyled = styled.header`
background-color: #151515;
width: 100%;
height: 60px;
display: flex;
justify-content: space-between

`
const Title = styled.div`
font-family: 'Passion One';
font-style: normal;
font-weight: 700;
font-size: 52px;
color: #FFFFFF;
margin-left: 20px;
`
const Icon = styled(VscChevronDown)`
color: #FFFFFF;
width: 25%;
height: 40px;
margin-top: 15px;
margin-right: 10px;

`
const Profile = styled.div`
display: flex;

`
const ProfileImage = styled.div`
background-color : #FFFFFF;
width: 50px;
height: 50px;
border-radius: 50%;
margin-top: 5px;

`

