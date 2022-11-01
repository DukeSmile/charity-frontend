import { Box, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import useForceUpdate from 'use-force-update';

import { Layout } from './layout';
import { useWeb3Context } from './hooks/web3Context';
import Messages from './components/Messages/Messages';
import { error } from './core/store/slices/MessagesSlice';
import './App.css';

export const App = (): JSX.Element => {

  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();
  const activeButtonStyle = 'max-w-250 bg-squash hover:bg-artySkyBlue text-white text-1em rounded-7 shadow-skyblue px-28 py-10 font-medium w-full flex justify-between uppercase items-center m-20';
  const defaultButtonStyle = 'max-w-250 bg-artySkyBlue hover:bg-squash text-white text-1em rounded-7 shadow-squash px-28 py-10 font-medium w-full flex justify-between uppercase items-center m-20';
  const { connected, connect, address, switchEthereumChain } = useWeb3Context();
  const [season, setSeason] = useState('SPRING');
  const [swapType, setSwapType] = useState('');
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [swapAmount, setSwapAmount] = useState(0);
  const [swapEthAmount, setSwapEthAmount] = useState(100);
  const [swapBscAmount, setSwapBscAmount] = useState(100);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
  }, [address]);

  return (
    <Layout>
      
    </Layout>
  );
}