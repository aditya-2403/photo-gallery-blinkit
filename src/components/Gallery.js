import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('images').onSnapshot((snapshot) => {
      const fetchedImages = [];
      snapshot.forEach((doc) => {
        fetchedImages.push({ id: doc.id, ...doc.data() });
      });
      setImages(fetchedImages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2 className='container my-5'>Image Gallery</h2>
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item key={image.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={image.downloadURL}
                alt={image.imageName}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Uploaded by: {image.userName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Uploaded at: {new Date(image.timestamp?.toDate()).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Gallery;
