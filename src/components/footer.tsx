import React from "react"
import styled from 'styled-components';

const FooterStyled = styled.div`
    display:flex;
    margin: 2rem 0;
    align-items: center;
    justify-content: center;
    > a {
        font-size: 14px;
        font-family: sans-serif;
        text-decoration: none;
        background-color: #000;
        color: #FFFFFF;
        transition: all 0.2s ease, visibility 0s;
        padding: .6rem 1.4rem;
        border: none;
        margin: 0 1.2rem;
        cursor: pointer;
        :hover {
            color: #000;
            background: #FFFFFF;
            text-decoration: none;
        }
    }
`
export function Footer() {
    return (
        <FooterStyled>
            <a href="https://etherscan.io/address/0x19beb45e21e0a2327e5bb33553fe6b58a650797b#code (TBD)" target="_blank">
                Contract
            </a>
            <a href="https://medium.com/@blockchain.rda/fractal-defi-82bf588387c1 (TBD)" target="_blank">
                Medium
            </a>
            <a href="https://app.uniswap.org/#/swap?inputCurrency=0x19beb45e21e0a2327e5bb33553fe6b58a650797b (TBD)" target="_blank">
                Uniswap
            </a>
            <a href="https://t.me/CYCLER_Finance" target="_blank">
                Telegram
            </a>
        </FooterStyled>
    )
}