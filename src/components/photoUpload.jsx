import { CircularProgress, Modal, Box } from "@material-ui/core";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { create } from 'ipfs-http-client';
import { projectId, projectSecret } from '../core/constants/base';
import { setIPFS, setUploadUrl } from '../core/store/slices/bridgeSlice';

export const PhotoUpload = (props:any) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState({
    cid: 0,
    path: '',
  });
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

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const files = (form[0]).files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await (ipfsInfo).add(file);

    setImage(
      {
        cid: result.cid,
        path: result.path,
      },
    );
    console.log(result.path);
    dispatch(setUploadUrl(result.path));
    form.reset();
  };
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
            <form onSubmit={onSubmitHandler}>
              <input name="file" type="file" />

              <button className="p-5 px-10 border" type="submit">Upload File</button>
            </form>
            <div>
              {image.path != '' && (<img
                alt={image.path}
                src={"https://ipfs.io/ipfs/" + image.path}
                style={{ maxWidth: "400px", margin: "15px" }}
              />)
              }
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
  // return (
  //   <div>
  //     <ImageUpload setUrl={setFileUrl} setMediaUrl={mediaUrl}/>
  //     ImageUrl : <a
  //         href={fileUrl}
  //         target='_blank'
  //         rel='noopener noreferrer'
  //     >
  //         {fileUrl}
  //     </a>
  //   </div>
  // )
}