import "./redeem_norfi.scss";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../../store/slices/pending-txns-slice";
import { useWeb3Context } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../../../store/slices/state.interface";
import { warning } from "../../../store/slices/messages-slice";
import { messages } from "../../../constants/messages";
import { ethers } from "ethers";
import { NORFI } from "../../../abi";
import { getAddresses } from "../../../constants";
import { redeemNORFI } from "../../../store/slices/norfi_thunk";

function RedeemNorfiButton() {
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();
    let dispatch = useDispatch();

    const redeemNorfi = async () => {
        if (await checkWrongNetwork()) return;
        const addresses = getAddresses(chainID);
        const nORFI = new ethers.Contract(addresses.NORFI, NORFI, provider);

        nORFI.balanceOf(address).then((data: string) => {
            if (data === null || parseFloat(data) === 0) {
                dispatch(warning({ text: messages.before_redeem_norfi }));
            } else {
                dispatch(redeemNORFI({ address, amount: data, provider, networkID: chainID }));
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
                    if (isPendingTxn(pendingTransactions, "redeemNORFI")) return;
                    redeemNorfi();
                }}
            >
                <p>{txnButtonText(pendingTransactions, "redeemNORFI", "Redeem NORFI")}</p>
            </div>
        </div>
    );
}

export default RedeemNorfiButton;
