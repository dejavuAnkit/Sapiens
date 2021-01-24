import React from "react";
import Button from "../button/ButtonComponent";

export const ImageUploader = (props) => {
  const {upload}=props;
  const uploadHandler = () => {
      const elem = document.getElementById("file");
      elem.click()
  }  
  
  const onSelectChange = (e) => {
      console.log(e.target.files[0]);
      upload(e.target.files[0])
  }
  
  return (
    <div className="fileUpload">
      <input type="file" style={{display:"none"}} onChange={onSelectChange} id="file"/>
      <Button
        name="upload"
        id="upload"
        label="Upload"
        handler={uploadHandler}
        customStyle={{
          marginBottom: "10px",
          background: "#1eba68",
          color: "#eee",
          cursor: "pointer",
          border: "none",
          align: "left"
        }}
      />
    </div>
  );
};

export default ImageUploader;