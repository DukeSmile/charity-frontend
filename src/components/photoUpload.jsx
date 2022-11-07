import React, { useState } from 'react'
import { ImageUpload } from '@sekmet/react-ipfs-uploader'
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";

export const PhotoUpload = (props) => {
  const [fileUrl, setFileUrl] = useState('');
  const [images, setImages] = useState([]);

  let ipfs;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",

    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const files = (form[0]).files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await (ipfs).add(file);

    setImages([
      ...images,
      {
        cid: result.cid,
        path: result.path,
      },
    ]);

    form.reset();
  };
  return (
    <div className="App">
      {!ipfs && (
        <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
      )}
      {ipfs && (
        <>
          <p>Upload File using IPFS</p>

          <form onSubmit={onSubmitHandler}>
            <input name="file" type="file" />

            <button className="p-5 px-10 border" type="submit">Upload File</button>
          </form>
          <div>
            {images.map((image, index) => (
              <img
                alt={`Uploaded #${index + 1}`}
                src={"https://ipfs.infura.io/ipfs/" + image.path}
                style={{ maxWidth: "400px", margin: "15px" }}
                key={image.cid.toString() + index}
              />
            ))}
          </div>
        </>
      )}
    </div>
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