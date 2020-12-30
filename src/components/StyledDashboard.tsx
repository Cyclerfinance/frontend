import styled from 'styled-components';

export const StyledDashboard = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 1rem auto 4rem auto;
    padding: 1.2rem 2.4rem;
    width: 520px;
    background-color: rgba(0,0,0,.33);
    text-align: justify;
    .Cycler-button {
        display: inline-block;
        border: none;
        padding: .8rem 1.4rem;
        margin: .8rem auto;
        text-decoration: none;
        color: #000;
        background-color: #ffffff;
        font-family: sans-serif;
        font-size: .8rem;
        cursor: pointer;
        text-align: center;
        -webkit-appearance: none;
        -moz-appearance: none;
        :hover, :focus {
            background: #000;
            color: #fff;
        }
        :disabled{
            background-color: #555;
            color: #f4f4f4;
            cursor: not-allowed;
            pointer-events: all !important;
        }
    }
    .dashboard-value {
        display: flex;
        flex-direction: row;
        margin-bottom: 1.2rem;
        .dashboard-value-title {
            margin-right: 1.2rem;
        }
        .dashboard-value-data {}
    }
`;