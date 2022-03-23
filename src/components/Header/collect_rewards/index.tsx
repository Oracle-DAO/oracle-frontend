import React from "react";
import "./collect_rewards-button.scss";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../../store/slices/pending-txns-slice";
import { useWeb3Context } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../../../store/slices/state.interface";
import { warning } from "../../../store/slices/messages-slice";
import { messages } from "../../../constants/messages";
import { ethers } from "ethers";
import { RewardCalculator } from "../../../abi";
import { getAddresses } from "../../../constants";
import { collectRewards } from "../../../store/slices/reward_thunk";

function CollectRewardsButton() {
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();
    let dispatch = useDispatch();

    const collectReward = async () => {
        if (await checkWrongNetwork()) return;
        const addresses = getAddresses(chainID);
        const rewardCalculator = new ethers.Contract(addresses.REWARD_CALCULATOR, RewardCalculator, provider);

        rewardCalculator.getTotalRewardsForUser(address).then((data: string) => {
            console.log(parseFloat(data));
            if (data === null || parseFloat(data) === 0) {
                dispatch(warning({ text: messages.before_collect_rewards }));
            } else {
                dispatch(collectRewards({ address, provider, networkID: chainID }));
            }
        });
    };

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    return (
        <div>
            <div
                className="wrap-button"
                onClick={() => {
                    if (isPendingTxn(pendingTransactions, "CollectRewards")) return;
                    collectReward();
                }}
            >
                <p>{txnButtonText(pendingTransactions, "CollectRewards", "Collect Reward")}</p>
            </div>
        </div>
    );
}

export default CollectRewardsButton;
