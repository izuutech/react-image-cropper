import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./App.css";

import { Modal } from "antd";

function App() {
  const [src, setSrc] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const imgRef = useRef(null);

  const [result, setResult] = useState(null);

  const [crop, setCrop] = useState({
    unit: "px", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 100,
    height: 100,
  });

  const [completedCrop, setCompletedCrop] = useState({});

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const selectImage = (e) => {
    const theImg = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theImg);
    reader.onload = () => {
      setSrc(reader.result);
      toggleModal();
    };
  };

  const cropImg = async () => {
    const image = imgRef.current;

    //if the person has not touched to crop, use default cropping value
    const theCrop = completedCrop.width ? completedCrop : crop;

    try {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = theCrop.width;
      canvas.height = theCrop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        theCrop.x * scaleX,
        theCrop.y * scaleY,
        theCrop.width * scaleX,
        theCrop.height * scaleY,
        0,
        0,
        theCrop.width,
        theCrop.height
      );

      const base64Image = canvas.toDataURL("image/jpeg", 1);

      setResult(base64Image);
      toggleModal();
    } catch (e) {
      console.log("crop the image");
    }
  };

  return (
    <div className="w-full text-white">
      <h1 className="text-2xl mb-2">React Image Cropper App</h1>

      <Modal
        title={`Upload image`}
        visible={openModal}
        className="font-body"
        // closable={false}
        onCancel={toggleModal}
        width={400}
        footer={null}
      >
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => {
            setCompletedCrop(c);
          }}
          keepSelection={true}
        >
          <img src={src} ref={imgRef} />
        </ReactCrop>
        <button
          onClick={cropImg}
          className="text-[#64ffda] bg-black py-2 px-4 rounded hover:bg-gray-600 transition duration-500"
        >
          Crop
        </button>
      </Modal>
      <div className="mb-2">Select Image to Crop</div>
      <div>
        <input
          type="file"
          className="border p-2"
          placeholder="Add image"
          onChange={selectImage}
        />
      </div>

      <div className="mt-10 w-full flex flex-col items-center justify-center ">
        <div className="w-96 bg-[#64ffda] text-black mb-4">Output</div>

        {/* <div className="w-[90%] flex items-center justify-center ml-[5%] bg-red-700"> */}
        <img src={result} alt="output" className="w-96 aspect-auto" />
      </div>
      {/* </div> */}
    </div>
  );
}

export default App;
