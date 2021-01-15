import React from 'react'; 
import ListItem from './ListItem';
import styled from 'styled-components';


export function ListMain(props) {
    return (
        <List>
            {props.symbols.map(s => <ListItem key={props.symbols.indexOf(s)} symbol={s}></ListItem>)}
        </List>
    )
}


const List = styled.div`
    position: sticky;
    display: flex;
    justify-content: space-evenly;
    padding: 1em;
`