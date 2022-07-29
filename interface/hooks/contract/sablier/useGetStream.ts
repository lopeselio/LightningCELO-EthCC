import { ethers, FixedNumber } from "ethers"
import { formatEther, formatUnits, parseEther, parseUnits } from "ethers/lib/utils"
import { BigNumber } from "@ethersproject/bignumber"
import { toBn, fromBn } from "evm-bn"

export interface IStreamInfo {
    deposit: FixedNumber;
    ratePerSecond: FixedNumber;
    recipient: string;
    remainingBalance: FixedNumber;
    tokenAddress: FixedNumber;
    sender: string;
    startTime: FixedNumber;
    stopTime: FixedNumber;
}

export interface IStreamInfoRaw {
    rawDeposit: FixedNumber;
    rawRatePerSecond: FixedNumber;
    recipient: string;
    rawRemainingBalance: FixedNumber;
    tokenAddress: string;
    sender: string;
    rawStartTime: FixedNumber;
    rawStopTime: FixedNumber;
}

export interface IFullStreamInfo {
    streamed: number;
    streamedPerc: number;
    withdrawable: number;
    withdrawablePerc: number;
    recipientBalance: number;
    senderBalance: number;
    recipient: string;
    sender: string;
    stopTime: number;
    tokenAddress: string;
}

const useGetStream = async (
    sablierContract: ethers.Contract, streamId: number,
    isGetFullStream: boolean = false,
    recipientBal?: string, senderBal?: string
): Promise<IStreamInfoRaw | IFullStreamInfo> => {
    const stream: IStreamInfo = await sablierContract.getStream(streamId);
    const rawStreamInfo: IStreamInfoRaw = {
        rawDeposit: FixedNumber.from(formatEther(stream.deposit.toString())),
        rawRatePerSecond: FixedNumber.from(formatEther(stream.ratePerSecond.toString())),
        recipient: stream.recipient.toString(),
        rawRemainingBalance: FixedNumber.from(formatEther(stream.remainingBalance.toString())),
        tokenAddress: stream.tokenAddress.toString(),
        sender: stream.sender.toString(),
        rawStartTime: FixedNumber.from(stream.startTime),
        rawStopTime: FixedNumber.from(stream.stopTime),
    };

    
    if (!isGetFullStream || senderBal === undefined || recipientBal === undefined) {
        return rawStreamInfo;
    }

    const {
        rawDeposit, recipient, rawRemainingBalance, tokenAddress, sender, rawStopTime 
    } = rawStreamInfo;

    // FIXED NUMBER MATH
    // goddamn my brain got fried from this
    
    const rawSenderBal = FixedNumber.from(senderBal);
    const rawRecipientBal = FixedNumber.from(recipientBal);

    const rawStreamedPerc = (rawDeposit.subUnsafe(rawSenderBal)).divUnsafe(rawDeposit);
    const rawStreamedAmount = rawDeposit.mulUnsafe(rawStreamedPerc);
    const rawWithdrawablePerc = rawRecipientBal.divUnsafe(rawDeposit);
    const rawWithdrawableAmount = rawDeposit.mulUnsafe(rawWithdrawablePerc);
    
    const hundred = FixedNumber.from(100);
    const thousand = FixedNumber.from(1000);

    const streamedPerc = rawStreamedPerc.mulUnsafe(hundred).round(4).toUnsafeFloat();
    const withdrawablePerc = rawWithdrawablePerc.mulUnsafe(hundred).round(4).toUnsafeFloat();
    const streamed = rawStreamedAmount.round(4).toUnsafeFloat();
    const withdrawable = rawWithdrawableAmount.round(4).toUnsafeFloat();
    const recipientBalance = rawRecipientBal.round(4).toUnsafeFloat();
    const senderBalance = rawSenderBal.round(4).toUnsafeFloat();
    const stopTime = rawStopTime.mulUnsafe(thousand).toUnsafeFloat();

    const fullStreamInfo = {
        streamed, streamedPerc, withdrawable, withdrawablePerc,
        recipientBalance, senderBalance,
        recipient, sender, stopTime, tokenAddress
    }

    return fullStreamInfo;
}

export default useGetStream;