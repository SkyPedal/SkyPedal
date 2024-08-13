import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import gpxParser from "gpxparser";

const DragDrop = ({ reset, formData }) => {
  const [gpxFile, setGpxFile] = useState(null);
  useEffect(() => {
    if (reset) {
      setGpxFile(null);
    }
  }, [reset, setGpxFile]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        alert("Please upload only one file");
        return;
      }
      acceptedFiles.forEach((file) => {
        setGpxFile(file);
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          const parser = new gpxParser();
          // console.log(binaryStr);
          parser.parse(binaryStr);
          const distance = Math.round(parser.tracks[0].distance.total);
          const start = new Date(parser.tracks[0].points[0].time);
          const end = new Date(
            parser.tracks[0].points[parser.tracks[0].points.length - 1].time,
          );
          const time = (end - start) / 1000;
          console.log(parser);
          const options = { hour: "2-digit", minute: "2-digit", hour12: false };
          formData.setField("time", start.toLocaleTimeString("en-GB", options));
          formData.setField("date", start.toISOString().split("T")[0]);
          formData.setField("geoJson", parser.toGeoJSON());
          formData.setField("distance", distance);
          formData.setField("duration", time);

          if (parser.tracks[0].name)
            formData.setField("title", parser.tracks[0].name);
        };
        reader.readAsText(file);
      });
    },
    [formData],
  );

  const removeFile = () => {
    setGpxFile(null);
    formData.reset();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: {
      "application/gpx": [".gpx"],
      "application/gpx+xml": [".gpx"],
    },
    maxFiles: 1,
  });

  if (gpxFile) {
    return (
      <div className="mt-5 flex w-full items-center justify-center">
        <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-solid border-gray-300 bg-slate-50">
          <div className="flex items-center rounded-lg border-2 border-solid p-2">
            <p> {gpxFile.name} </p>
            <button type="button" onClick={removeFile}>
              <IoClose className="text-red-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      {...getRootProps()}
      className="mt-5 flex w-full items-center justify-center"
    >
      <div
        className={
          "flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-slate-50 hover:bg-gray-100 " +
          (isDragActive ? "border-green-600" : "border-gray-300")
        }
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          {isDragActive ? (
            <FaCloudDownloadAlt className="mb-4 h-8 w-8 text-gray-500" />
          ) : (
            <FaCloudUploadAlt className="mb-4 h-8 w-8 text-gray-500" />
          )}
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
            <br />
            <span className="text-xs text-gray-500">GPX files only</span>
          </p>
        </div>
        <input
          {...getInputProps()}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default DragDrop;
