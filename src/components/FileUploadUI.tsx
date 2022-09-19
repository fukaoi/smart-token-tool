import { Box, Button, ImageList, ImageListItem } from '@mui/material';
import { FC } from 'react';

export type FileUploadUIProps = {
  imagePreview: any;
  setImagePreview: (file: File | string | undefined) => void;
  setFileBuffer: (buffer: ArrayBuffer) => void;
};

const FileUploadUI: FC<FileUploadUIProps> = ({
  imagePreview,
  setImagePreview,
  setFileBuffer,
}) => {
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagePreview(undefined);

    if (!e.target.files) return;
    if (!e.target.files?.[0].type.match('image.*')) return;

    const reader = new FileReader();
    const file = e.target.files[0];
    file.arrayBuffer().then(setFileBuffer);

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target.result as string;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <label htmlFor="image-upload">
        <input
          id="image-upload"
          name="image-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnAddImage(e)
          }
        />
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Button variant="outlined" component="span">
            Choose Image
          </Button>
        </Box>
      </label>
      {imagePreview ? (
        <ImageList
          sx={{ width: 300, height: 300 }}
          variant="woven"
          cols={1}
          gap={1}
        >
          <ImageListItem>
            <img
              id="preview"
              src={imagePreview}
              alt="ImagePreview"
              loading="lazy"
            />
          </ImageListItem>
        </ImageList>
      ) : null}
    </>
  );
};
export default FileUploadUI;