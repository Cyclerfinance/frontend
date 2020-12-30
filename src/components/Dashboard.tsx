import * as React from 'react';
import BigNumber from 'bignumber.js';
// import Countdown from 'react-countdown';
// import moment from 'moment';
import { StyledDashboard } from './StyledDashboard'
import {
    getTotalSupply,
    getBalance,a
    // getLiquidityRemoveFee,
    // getCyclerCallerFee,
    // getMinTokenForCycler,
    // getLastCycler,
    getCyclerInterval,
    getCurrentPoolAddress,
    getCurrentCycle,
    getTaxFee,
    getCurrentTotalTax,
    getDevFee,
    getBurnFee,
    getLockFee,
    getCycleLimit,
} from '../util/CyclerToken';
import { networkId } from '../util/config';

BigNumber.config({
    DECIMAL_PLACES: 18,
    FORMAT: {
        prefix: '', // string to prepend
        decimalSeparator: '.', // decimal separator
        groupSeparator: ',', // grouping separator of the integer part
        groupSize: 3, // primary grouping size of the integer part
    }
});

const poolNames: any = {
// (TBD)   "0x90a257C6E5C0d01820516A690F02911b59EfF92c": "CYCL-ETH",
}

export default ({ address }: { address: string; }) => {
    const [tokenBalance, setTokenBalance] = React.useState(new BigNumber(0));
    const [totalSupply, setTotalSupply] = React.useState(new BigNumber(0));
    const [totalBurn, setTotalBurn] = React.useState(new BigNumber(0));
    // const [liquidityRemoveFee, setLiquidityRemoveFee] = React.useState(0);
    // const [CyclerCallerFee, setCyclerCallerFee] = React.useState(0);
    // const [minTokenForCycler, setMinTokenForCycler] = React.useState(new BigNumber(0));
    const [timeToCycler, setTimeToCycler] = React.useState(1);
    // const [lastCyclerTimestamp, setLastCyclerTimetamp] = React.useState(0);
    const [currentTargetPoolName, setCurrentTargetPoolName] = React.useState("");
    const [currentCycle, setCurrentCycle] = React.useState(0);
    const [currentTaxFee, setCurrentTaxFee] = React.useState(0);
    const [currentTotalTax, setCurrentTotalTax] = React.useState(0.0);
    const [currentDevFee, setCurrentDevFee] = React.useState(0.0);
    const [currentBurnFee, setCurrentBurnFee] = React.useState(0.0);
    const [currentLockFee, setCurrentLockFee] = React.useState(0.0);
    const [currentCycleLimit, setCurrentCycleLimit] = React.useState(0);

    const [timerID, setTimerID] = React.useState(0);
    let CyclerInterval = 0;

    const fetchAllDataFromContract = React.useCallback(async (firstFlag = false) => {
        if (firstFlag) {
            // setLiquidityRemoveFee(await getLiquidityRemoveFee());
            // setCyclerCallerFee(await getCyclerCallerFee());
            // const minToken = await getMinTokenForCycler();
            // if (minToken) {
            //     setMinTokenForCycler(minToken);
            // }
            const interval = await getCyclerInterval();
            if (interval) {
               CyclerInterval = interval;
            }
        }

        const totalSupply = await getTotalSupply();
        if (totalSupply) {
            setTotalSupply(totalSupply);
            setTotalBurn(new BigNumber(10000000).minus(totalSupply));
        }
        const bal = await getBalance(address);
        if (bal) {
            setTokenBalance(bal);
        }

        // const lastCycler = await getLastCycler();
        // if (lastCycler) {
        //     const lastCyclerTm = lastCycler * 1000;
        //     const now = moment().unix();
        //     setLastCyclerTimetamp(lastCyclerTm);
        //     if (lastCycler + CyclerInterval > now) {
        //         setTimeToCycler((lastCycler + CyclerInterval)*1000);
        //     } else {
        //         setTimeToCycler(0);
        //     }
        // }
        let currentTargetPool = await getCurrentPoolAddress();
        if (currentTargetPool) {
            setCurrentTargetPoolName(poolNames[currentTargetPool] || 'TBD');
        }
        const cycle = await getCurrentCycle();
        setCurrentCycle(cycle);

        const taxFee = await getTaxFee();
        setCurrentTaxFee(parseFloat(taxFee));

        const totalTax = await getCurrentTotalTax();
        setCurrentTotalTax(parseFloat(totalTax));

        const devFee = await getDevFee();
        setCurrentDevFee(parseFloat(devFee));

        const burnFee = await getBurnFee()
        setCurrentBurnFee(parseFloat(burnFee));

        const lockFee = await getLockFee();
        setCurrentLockFee(parseFloat(lockFee));

        const cycleLimit = await getCycleLimit();
        setCurrentCycleLimit(parseFloat(cycleLimit));

    }, [address]);

    React.useEffect(() => {
        if (address) {
            if (timerID > 0) {
                clearInterval(timerID);
            }
            let tempTimerID: number = setInterval(async () => {
                fetchAllDataFromContract();
            }, 30000) as any;
            setTimerID(tempTimerID);
            fetchAllDataFromContract(true);
        }
    }, [address])

    // const renderer = (countdownProps: any) => {
    //     const { days, hours, minutes, seconds } = countdownProps
    //     return (
    //         <span style={{ width: '100%' }}>
    //             { seconds > 0 ? days * 1440 + hours * 60 + minutes + 1 : days * 1440 + hours * 60 + minutes} Minutes
    //         </span>
    //     )
    // }

    if (!address) {
        return (
            <StyledDashboard>
                <div style={{ textAlign: 'center' }}>
                    <span>Unable to connect {networkId === '1' ? 'Main' : 'Test'} Ethereum Network.</span><br />
                    <span>Please change your MetaMask network.</span>
                </div>
            </StyledDashboard>
        )
    }

    const renderValueWithData = (title: string, value: string | JSX.Element) => (
        <div className="dashboard-value">
            <div className="dashboard-value-title">
                {title}
            </div>
            <div className="dashboard-value-data">
                {value}
            </div>
        </div>
    )

    return (
        <StyledDashboard>
            <div>
                {renderValueWithData('Your Balance:', `${tokenBalance.toFormat(4)} CYCL`)}
                {renderValueWithData('CYCL Supply:', `${totalSupply.toFormat(4)} CYCL`)}
                {renderValueWithData('CYCL Burned:', `${totalBurn.toFormat(4)} CYCL`)}
                {renderValueWithData('Target Pool:', `${currentTargetPoolName}`)}
                {renderValueWithData('Current Cycle:', `${currentCycle} out of ${currentCycleLimit + 1}`)}
                {/* {renderValueWithData('Last Cycler:', `${lastCyclerTimestamp ? moment(new Date(lastCyclerTimestamp)).format("dddd, MMMM Do YYYY, h:mm:ss a") : ''}`)} */}
                {/* {renderValueWithData('Cycler available in:', timeToCycler > 0 ? <Countdown date={timeToCycler} renderer={renderer} /> : '0 Minutes')} */}
                <hr />
                {renderValueWithData('Tax Fee:', `${(currentTaxFee * 0.1)}%`)}
                {renderValueWithData('Dev Fee:', `${(currentDevFee * 0.1)}%`)}
                {renderValueWithData('Burn (incl. lock fee):', `${((currentBurnFee + currentLockFee) * 0.1)}%`)}
                <hr />
                {renderValueWithData('TOTAL Current Tax:', `${(currentTotalTax * 0.1)}%`)}
            </div>
            <div style={{ textAlign: 'center' }}>
                <a className="Cycler-button" href="https://telegram.me/collablandbot?start=rec57DdDrMS3Qlxex_-tpc(TBD)" target="_blank">
                    FEE VOTE TG
                </a>
            </div>
            <div style={{ textAlign: 'center' }}>
                <a className="Cycler-button" href="https://www.dextools.io/app/uniswap/pair-explorer/(TBD)" target="_blank">
                    DEX TOOLS
                </a>
            </div>
        </StyledDashboard>
    );
};