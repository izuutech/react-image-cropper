import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./App.css";

import { Modal } from "antd";

function App() {
  const [count, setCount] = useState(0);
  const [src, setSrc] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  useEffect(() => {
    console.log(crop);
    return () => {};
  }, [crop]);

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

  const cropImg = () => {};

  return (
    <div className="w-[100%]">
      <Modal
        title={`Upload image`}
        visible={openModal}
        className="font-body"
        // closable={false}
        onCancel={toggleModal}
        width={400}
        footer={null}
      >
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
          <img src={src} />
        </ReactCrop>
        <button onClick={cropImg} className="bg-zinc-400 text-white">
          Crop
        </button>
      </Modal>
      <span>Select Image to Crop</span>
      <div>
        <input
          type="file"
          className="border p-2"
          placeholder="Add image"
          onChange={selectImage}
        />
      </div>

      <div className="mt-10">
        <span>Output</span>
        <img src={"src.png"} alt="output" />
      </div>
    </div>
  );
}

export default App;
