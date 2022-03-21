import React from "react";
import "./collect_rewards-button.scss";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../../store/slices/pending-txns-slice";
import { useWeb3Context } from "../../../hooks";
import { collectRewards, getRewards } from "../../../store/slices/reward_thunk";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../../../store/slices/state.interface";
import { warning } from "../../../store/slices/messages-slice";
import { messages } from "../../../constants/messages";

function CollectRewardsButton() {
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();
    let dispatch = useDispatch();

    const collectReward = async () => {
        if (await checkWrongNetwork()) return;

        const totalRewards = getRewards({ address, provider, networkID: chainID });
        // TODO add check for totalReward to be 0
        if (totalRewards === null || totalRewards) {
            dispatch(warning({ text: messages.before_collect_rewards }));
        } else {
            await dispatch(collectRewards({ address, provider, networkID: chainID }));
        }
    };

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    return (
        <div>
            <div
                className="wrap-button"
                onClick={() => {
                    if (isPendingTxn(pendingTransactions, "investing")) return;
                    collectReward();
                }}
            >
                <p>{txnButtonText(pendingTransactions, "CollectRewards", "Collect Reward")}</p>
            </div>
        </div>
    );
}

export default CollectRewardsButton;
