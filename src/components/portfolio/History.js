import styled from 'styled-components';
import HistoryItem from './HistoryItem';

export default function History(props) {

    return (
        <ModalContent>
            <Title>Transaction history for stock: {props.symbol}</Title>
            <HistoryTable>
                <Header>
                    <HeaderCell>Date</HeaderCell>
                    <HeaderCell>Action</HeaderCell>
                    <HeaderCell>Amount</HeaderCell>
                    <HeaderCell>Price</HeaderCell>
                    <HeaderCell>Balance change</HeaderCell>
                </Header>
            {props.transactions && props.transactions.map(h => <HistoryItem key={h.id} transaction={h}></HistoryItem>)}
            </HistoryTable>
        </ModalContent>
    )
}


const ModalContent = styled.div`
    padding: 2em;
    background-color:white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Header = styled.tr`
    border-bottom: 2px solid #21255e;
    border-top: 2px solid #21255e;

`

const HistoryTable = styled.table`
    margin: 2em auto 0;
    border-collapse: collapse;
    padding: 0 3em;
    &:last-child{
        border-bottom: 2px solid #21255e;
    }

`

const Title = styled.div`
    font-size: 1.5em;
    font-weight: bold;
    text-align: center
`

const HeaderCell = styled.th`
    text-align: center;
    padding: 1em 2em;
    border-bottom: 1px solid #21255e;
    border-top: 1px solid #21255e;
    border-collapse: collapse;
`