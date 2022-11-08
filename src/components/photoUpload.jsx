import { Modal, Box } from "@material-ui/core";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { create } from 'ipfs-http-client';
import { projectId, projectSecret } from '../core/constants/base';
import { setIPFS, setUploadUrl } from '../core/store/slices/bridgeSlice';

export const PhotoUpload = (props:any) => {
  const dispatch = useDispatch();
  const ipfsInfo = useSelector(state => state.app.ipfs);
  
  useEffect(() => {
    let ipfs;
    try {
      const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
      ipfs = create({
          host: 'ipfs.infura.io',
          port: 5001,
          protocol: 'https',
          headers: {
              authorization: auth,
          },
      });
    } catch (error) {
      console.error("IPFS error ", error);
      ipfs = undefined;
    }
    dispatch(setIPFS(ipfs));
  }, []);

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      className="w-500 mx-auto mt-35 justify-center items-between "
    >
      <Box className="bg-white p-35 rounded-15">
        {!ipfsInfo && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}
        {ipfsInfo && (
          <>
            <p>Upload File using IPFS</p>
            <input name="file" type="file" onChange={props.onChange}/>
          </>
        )}
      </Box>
    </Modal>
  );
}