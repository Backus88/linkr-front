import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import {DebounceInput} from 'react-debounce-input';

export default function SearchBar(){
    return(
        <SearchContainer>
                <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    placeholder = "Search for people"
                    type="string"
                />
            <SearchIcon/>
        </SearchContainer>
    );
}

const SearchContainer = styled.div`
    box-sizing: border-box;
    min-width: 500px;
    height: 50px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Lato';
    padding: 5px;
    &:hover {
        box-shadow: 1px 1px 1px thistle;
    }
    input{
        flex: 1 1 50px;
        background-color: transparent;
        padding-left: 5px;
        border: none;
        font-size: inherit;
        &:focus{
            outline: none;
        }
    }
`;

const SearchInput = styled.div `
    flex: 1 1 50px;
    background-color: transparent;
    padding-left: 5px;
    border: none;
    font-size: inherit;
    &:focus{
        outline: none;
    }
`;

const SearchIcon = styled(AiOutlineSearch)`
    color: #C6C6C6;
    width: 21px;
    height: 21px;
`;