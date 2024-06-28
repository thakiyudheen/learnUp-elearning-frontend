import axios from 'axios';
import { formatDuration } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export const FileUpload = async (file: File) => {
  const presetKey = import.meta.env.VITE_REACT_APP_PRESET_KEY;
  const cloudName = import.meta.env.VITE_REACT_APP_CLOUD_NAME;

  console.log(file, "filee");

  if (!presetKey || !cloudName) {
    console.error('Cloudinary preset key or cloud name is missing');
    return null;
  }

    // Generate a UUID for the file name
    const uuid = uuidv4();
    const fileName = `${uuid}-${"_"}`;
  

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', presetKey);
  formData.append('public_id', fileName);

  try {
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
    const { format, secure_url } = res.data;

    console.log(secure_url, "secure url");
    console.log(res.data, "resp data");

    // Assuming you want to allow both image and video formats
    const isValidFormat = format === 'jpg' || format === 'png' || format === 'jpeg' || format === 'gif' || format === 'mp4' || format === 'avi' || format === 'mov'||format==='chromHTML';

    if (isValidFormat) {
      return res.data;
    } else {
      console.error('Uploaded file is not an image or video:', res.data);
      return null;
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};
