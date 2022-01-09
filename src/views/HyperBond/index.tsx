import { useState } from "react";
import { useSelector } from "react-redux";
import { trim } from "../../helpers";
import { Backdrop, Box, Fade, Grid } from "@material-ui/core";
import TabPanel from "../../components/TabPanel";
import HyperbondPurchase from "../Bond/HyperbondPurchase";
import "./bond.scss";
import { useWeb3Context } from "../../hooks";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IAllBondData } from "../../hooks/hyperbond";
import classnames from "classnames";
import HyperbondRedeem from "../Bond/HyperbondRedeem";
import HyperbondHeader from "../Bond/HyperbondHeader";

interface IBondProps {
    bond: IAllBondData;
}

function Hyperbond({ bond }: IBondProps) {
    const { address } = useWeb3Context();

    const [slippage, setSlippage] = useState(0.5);

    const [view, setView] = useState(0);

    const isBondLoading = useSelector<IReduxState, boolean>(state => state.hyperbonding.loading ?? true);

    const onSlippageChange = (value: any) => {
        return setSlippage(value);
    };

    const changeView = (newView: number) => () => {
        setView(newView);
    };

    return (
        <Fade in={true} mountOnEnter unmountOnExit>
            <Grid className="bond-view">
                <Backdrop open={true}>
                    <Fade in={true}>
                        <div className="bond-card">
                            <HyperbondHeader bond={bond} slippage={slippage} onSlippageChange={onSlippageChange} />
                            {/* @ts-ignore */}
                            <Box direction="row" className="bond-price-data-row">
                                <div className="bond-price-data">
                                    <p className="bond-price-data-title">Bond Price</p>
                                    <p className="bond-price-data-value">
                                        {isBondLoading ? <Skeleton /> : bond.isLP || bond.name === "wavax" ? `$${trim(bond.bondPrice, 2)}` : `${trim(bond.bondPrice, 2)} MIM`}
                                    </p>
                                </div>
                                <div className="bond-price-data">
                                    <p className="bond-price-data-title">ORCL Price</p>
                                    <p className="bond-price-data-value">{isBondLoading ? <Skeleton /> : `$${trim(bond.marketPrice, 2)}`}</p>
                                </div>
                            </Box>

                            <div className="bond-one-table">
                                <div className={classnames("bond-one-table-btn", { active: !view })} onClick={changeView(0)}>
                                    <p>Bond</p>
                                </div>
                                <div className={classnames("bond-one-table-btn", { active: view })} onClick={changeView(1)}>
                                    <p>Redeem</p>
                                </div>
                            </div>

                            <TabPanel value={view} index={0}>
                                <HyperbondPurchase bond={bond} slippage={slippage} />
                            </TabPanel>

                            <TabPanel value={view} index={1}>
                                <HyperbondRedeem bond={bond} />
                            </TabPanel>
                        </div>
                    </Fade>
                </Backdrop>
            </Grid>
        </Fade>
    );
}

export default Hyperbond;
