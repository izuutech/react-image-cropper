import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./App.css";
import src from "../public/userOne.png";
import { Modal } from "antd";

function App() {
  const [count, setCount] = useState(0);

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

  const cropImg = () => {};
  return (
    <div className="w-[100%]">
      <Modal
        title={`Upload image`}
        visible={true}
        className="font-body"
        // closable={false}

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
      <span>saaaaap</span>
      <div>
        <input type="file" className="border p-2" placeholder="Add image" />
      </div>

      <div>
        <span>Output</span>
        <img src={src} />
      </div>
    </div>
  );
}

export default App;
