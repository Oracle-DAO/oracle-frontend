import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, InputAdornment, OutlinedInput, Zoom } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import classnames from "classnames";

import { trim } from "../../helpers";
import { changeApproval, changeStake } from "../../store/slices/stake-thunk";
import "./stake.scss";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import { warning } from "../../store/slices/messages-slice";

import { ReactComponent as WalletIcon } from "../../assets/icons/wallet-money.svg";
import { ReactComponent as MoneyIcon } from "../../assets/icons/moneys.svg";
import { ReactComponent as ChartIcon } from "../../assets/icons/chart-square.svg";

function Stake() {
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const [view, setView] = useState(0);
    const [quantity, setQuantity] = useState<string>("");

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const oracleBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.ORFI;
    });
    const sOracleBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.sORFI;
    });
    const stakeAllowance = useSelector<IReduxState, number>(state => {
        return state.account.staking && state.account.staking.ORFI;
    });
    const unstakeAllowance = useSelector<IReduxState, number>(state => {
        return state.account.staking && state.account.staking.sORFI;
    });
    const stakingTVL = useSelector<IReduxState, number>(state => {
        return state.app.stakingTVL;
    });

    const TAV = useSelector<IReduxState, number>(state => {
        return state.app.tav;
    });

    const marketPrice = useSelector<IReduxState, number>(state => {
        return state.app.marketPrice;
    });

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const setMax = () => {
        if (view === 0) {
            setQuantity(oracleBalance);
        } else {
            setQuantity(sOracleBalance);
        }
    };

    const onSeekApproval = async (token: string) => {
        if (await checkWrongNetwork()) return;

        await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
    };

    const onChangeStake = async (action: string) => {
        if (await checkWrongNetwork()) return;
        if (quantity === "" || parseFloat(quantity) === 0) {
            dispatch(warning({ text: action === "stake" ? messages.before_stake : messages.before_unstake }));
        } else {
            await dispatch(changeStake({ address, action, value: String(quantity), provider, networkID: chainID }));
            setQuantity("");
        }
    };

    const hasAllowance = useCallback(
        token => {
            if (token === "ORFI") return stakeAllowance > 0;
            if (token === "sORFI") return unstakeAllowance > 0;
            return 0;
        },
        [stakeAllowance],
    );

    const changeView = (newView: number) => () => {
        setView(newView);
        setQuantity("");
    };

    const trimmedsOracleBalance = trim(Number(sOracleBalance), 6);
    return (
        <div className="stake-view">
            <Zoom in={true}>
                <>
                    <div className="stake-wrapper">
                        <p className="section-title">Stake</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <div className="card-wrapper">
                                    <div className="card-icon">
                                        <MoneyIcon />
                                    </div>
                                    <div className="card">
                                        <p className="card-title">TAV</p>
                                        <p className="card-value">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                                maximumFractionDigits: 2,
                                                minimumFractionDigits: 2,
                                            }).format(TAV)}
                                        </p>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <div className="card-wrapper">
                                    <div className="card-icon">
                                        <WalletIcon />
                                    </div>
                                    <div className="card">
                                        <p className="card-title">TVL</p>
                                        <p className="card-value">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                                maximumFractionDigits: 0,
                                                minimumFractionDigits: 0,
                                            }).format(stakingTVL)}
                                        </p>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <div className="card-wrapper">
                                    <div className="card-icon">
                                        <ChartIcon />
                                    </div>
                                    <div className="card">
                                        <p className="card-title">ORFI Price</p>
                                        <p className="card-value">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                                maximumFractionDigits: 2,
                                                minimumFractionDigits: 2,
                                            }).format(marketPrice)}
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    {!address && (
                        <div className="connect-wallet-wrapper">
                            <span onClick={connect}>Connect Wallet</span>
                            <p>Connect your wallet to stake ORFI tokens!</p>
                        </div>
                    )}
                    {address && (
                        <div className="staking-details-wrapper">
                            <div className="stake-card-action-area">
                                <div className="stake-card-action-stage-btns-wrap">
                                    <div onClick={changeView(0)} className={classnames("stake-card-action-stage-btn", { active: !view })}>
                                        <p>Stake</p>
                                    </div>
                                    <div onClick={changeView(1)} className={classnames("stake-card-action-stage-btn", { active: view })}>
                                        <p>Unstake</p>
                                    </div>
                                </div>

                                <div className="stake-card-action-row">
                                    <OutlinedInput
                                        type="number"
                                        placeholder="Amount"
                                        className="stake-card-action-input"
                                        value={quantity}
                                        onChange={e => setQuantity(e.target.value)}
                                        labelWidth={0}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <p onClick={setMax} className="stake-card-action-input-btn">
                                                    Max
                                                </p>
                                            </InputAdornment>
                                        }
                                    />

                                    {view === 0 && (
                                        <>
                                            {address && hasAllowance("ORFI") ? (
                                                <div
                                                    className="stake-card-tab-panel-btn"
                                                    onClick={() => {
                                                        if (isPendingTxn(pendingTransactions, "staking")) return;
                                                        onChangeStake("stake");
                                                    }}
                                                >
                                                    <p>{txnButtonText(pendingTransactions, "staking", "Stake ORCL")}</p>
                                                </div>
                                            ) : (
                                                <div
                                                    className="stake-card-tab-panel-btn"
                                                    onClick={() => {
                                                        if (isPendingTxn(pendingTransactions, "approve_staking")) return;
                                                        onSeekApproval("ORFI");
                                                    }}
                                                >
                                                    <p>{txnButtonText(pendingTransactions, "approve_staking", "Approve")}</p>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {view === 1 && (
                                        <>
                                            {address && hasAllowance("sORFI") ? (
                                                <div
                                                    className="stake-card-tab-panel-btn"
                                                    onClick={() => {
                                                        if (isPendingTxn(pendingTransactions, "unstaking")) return;
                                                        onChangeStake("unstake");
                                                    }}
                                                >
                                                    <p>{txnButtonText(pendingTransactions, "unstaking", "Unstake ORCL")}</p>
                                                </div>
                                            ) : (
                                                <div
                                                    className="stake-card-tab-panel-btn"
                                                    onClick={() => {
                                                        if (isPendingTxn(pendingTransactions, "approve_unstaking")) return;
                                                        onSeekApproval("sORFI");
                                                    }}
                                                >
                                                    <p>{txnButtonText(pendingTransactions, "approve_unstaking", "Approve")}</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {address && ((!hasAllowance("ORFI") && view === 0) || (!hasAllowance("sORCL") && view === 1)) && (
                                    <p className="stake-card-action-help-text">
                                        Note: The "Approve" transaction is only needed when staking/unstaking for the first time; subsequent staking/unstaking only requires you to
                                        perform the "Stake" or "Unstake" transaction.
                                    </p>
                                )}
                            </div>

                            <div className="stake-user-data">
                                <div className="data-row">
                                    <p className="data-row-name">Your Balance</p>
                                    <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{trim(Number(oracleBalance), 4)} ORCL</>}</p>
                                </div>

                                <div className="data-row">
                                    <p className="data-row-name">Your Staked Balance</p>
                                    <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{trimmedsOracleBalance} sORCL</>}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            </Zoom>
        </div>
    );
}

export default Stake;
