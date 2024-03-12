import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Upload = ({
  name,
  label,
  errors,
  setValue,
  register,
  viewData = null,
  editData = null,
  video = false,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(viewData || editData || "");

  useEffect(() => {
    if (editCourse && !video) {
      setSelectedFile(course.thumnail);
      setPreviewUrl(course.thumnail); // Set preview URL for editing existing image
    }
    register(name, { required: true });
  }, []);

  const isFileSupported = (fileType, supportedTypes) => {
    return supportedTypes.includes(fileType);
  };
  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();

      if (
        video === false &&
        !isFileSupported(fileType, ["jpg", "jpeg", "png"])
      ) {
        toast.error("File type not supported");
        return;
      } else if (!isFileSupported(fileType, ["mp4"])) {
        toast.error("File type video not supported");
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div>
      <label className="flex flex-row">
        <p>
          {label}
          <sup className="text-pink-200">*</sup>
        </p>
      </label>
      <div className="flex min-h-[150px] border border-dashed border-richblack-300 justify-center items-center gap-y-4 p-3 flex-col">
        {previewUrl ? (
          <div>
            {video ? (
              <video controls>
                <source src={previewUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div>
                <img src={previewUrl} alt="Thumbnail" />
              </div>
            )}
          </div>
        ) : (
          <div>
            <input type="file" onChange={handleFileChange} className="" />
          </div>
        )}
        {previewUrl !== "" && !viewData && (
          <button
            onClick={() => {
              setSelectedFile(null);
              setPreviewUrl("");
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {errors[name] && (
        <span className="contactus-error text-xs">{label} is required</span>
      )}
    </div>
  );
};

export default Upload;
