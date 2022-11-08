import { useWeb3Context } from '../../hooks/web3Context';

export const ConnectWalletButton = () => {
  const { connect, disconnect, address } = useWeb3Context();
  return (
    <div>
      {
        address === '' ? (
          <button className="uppercase w-250 text-black text-1em rounded-7 border-2 shadow-default px-24 py-10 font-medium hover:font-bold" onClick={connect}>
            Connect wallet
          </button> ) :
          (
            <button className="uppercase w-250 text-black text-1em rounded-7 border-2 shadow-default px-24 py-10 font-medium hover:font-bold" onClick={disconnect}>
              Disconnect wallet
            </button>
          )
      }
    </div>
  );
}
