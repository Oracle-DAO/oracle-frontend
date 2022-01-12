import { useDispatch, useSelector } from "react-redux";
import { Box, Slide } from "@material-ui/core";
import { IHyperBondDetails, redeemHyperbond } from "../../store/slices/hyperbond_slice";
import { useWeb3Context } from "../../hooks";
import { prettifySeconds, prettyVestingPeriod, trim } from "../../helpers";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IAllBondData } from "../../hooks/hyperbond";
import { IUserHyperBondDetails } from "../../store/slices/account-slice";
import { messages } from "../../constants/messages";
import { warning } from "../../store/slices/messages-slice";

interface IBondRedeem {
    bond: IAllBondData;
}

function HyperbondRedeem({ bond }: IBondRedeem) {
    const dispatch = useDispatch();
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();

    const isBondLoading = useSelector<IReduxState, boolean>(state => state.hyperbonding.loading ?? true);

    const currentBlockTime = useSelector<IReduxState, number>(state => {
        return state.app.currentBlockTime;
    });

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const bondingState = useSelector<IReduxState, IHyperBondDetails>(state => {
        return state.hyperbonding && state.hyperbonding[bond.name];
    });

    const bondDetails = useSelector<IReduxState, IUserHyperBondDetails>(state => {
        return state.account.hyperbonds && state.account.hyperbonds[bond.name];
    });

    async function onRedeem(autostake: boolean) {
        if (await checkWrongNetwork()) return;

        if (bond.interestDue === 0 || bond.pendingPayout === 0) {
            dispatch(warning({ text: messages.nothing_to_claim }));
            return;
        }

        await dispatch(redeemHyperbond({ address, bond, networkID: chainID, provider, autostake }));
    }

    const vestingTime = () => {
        if (!bondDetails) {
            return "";
        }
        return prettyVestingPeriod(currentBlockTime, bondDetails.bondMaturationBlock);
    };

    const vestingPeriod = () => {
        return prettifySeconds(bondingState.vestingTerm, "hours");
    };

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-around" flexWrap="wrap">
                <div
                    className="transaction-button bond-approve-btn"
                    onClick={() => {
                        if (isPendingTxn(pendingTransactions, "redeem_bond_" + bond.name)) return;
                        onRedeem(false);
                    }}
                >
                    <p>{txnButtonText(pendingTransactions, "redeem_bond_" + bond.name, "Claim")}</p>
                </div>
            </Box>

            <Slide direction="right" in={true} mountOnEnter unmountOnExit {...{ timeout: 533 }}>
                <Box className="bond-data">
                    <div className="data-row">
                        <p className="bond-balance-title">Pending Rewards</p>
                        <p className="price-data bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.interestDue, 4)} ORCL`}</p>
                    </div>
                    <div className="data-row">
                        <p className="bond-balance-title">Claimable Rewards</p>
                        <p className="price-data bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.pendingPayout, 4)} ORCL`}</p>
                    </div>
                    <div className="data-row">
                        <p className="bond-balance-title">Time until fully vested</p>
                        <p className="price-data bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : vestingTime()}</p>
                    </div>

                    <div className="data-row">
                        <p className="bond-balance-title">ROI</p>
                        <p className="bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}</p>
                    </div>

                    <div className="data-row">
                        <p className="bond-balance-title">Vesting Term</p>
                        <p className="bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : vestingPeriod()}</p>
                    </div>
                </Box>
            </Slide>
        </Box>
    );
}

export default HyperbondRedeem;
