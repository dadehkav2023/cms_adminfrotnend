import React, { useState } from "react";
const VideoSelector: React.FC<{
  onVideoSelected: (file:string,File:any) => void;
  name: string;
}> = ({ onVideoSelected, name }) => {
  const [fileName, setFileName] = useState<string>("");

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type.startsWith("video/")) {
      onVideoSelected("ImagePath", [selectedFile]);
      setFileName(selectedFile.name);
    } else {
      alert(
        "لطفا ویدیویی با فرمت های مقابل انتخاب کنید (MP4, AVI, MKV, MOV, WMV, 3GP)."
      );
    }
  };
  return (
    <div>
      <div className="input-group custom-file-button mb-1">
        <label className="input-group-text" htmlFor="inputGroupFile">
          <input
            name={name}
            accept=".mp4,.avi,.mkv,.mov,.wmv,.3gp"
            onChange={handleVideoSelect}
            type="file"
            className="hidden"
            id="inputGroupFile"
          />
          انتخاب فایل
        </label>
        <p className="mx-2 mt-2">{fileName}</p>
      </div>
    </div>
  );
};
export default VideoSelector;
