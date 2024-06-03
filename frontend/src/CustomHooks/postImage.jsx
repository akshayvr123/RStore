import { useEffect, useState } from 'react';

const usePostImage = (pics) => {
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!pics) {
        console.log('no image uploaaded');
      setError('Please upload an image');
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'Rentify');
      data.append('cloud_name', 'dpb74oqal');

      fetch('https://api.cloudinary.com/v1_1/dpb74oqal/image/upload', {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
          setError(''); // Clear any previous errors
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to upload image');
        });
    } else {
      setError('Please upload a JPEG or PNG image');
    }
  }, [pics]);

  return [image, error];
};

export default usePostImage;
