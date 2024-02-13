import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore'; // Import Firestore
import { Link } from 'react-router-dom';
import '../index.css'

function ImageUpload() {
  const [user, setUser] = useState(null); // State to store the logged-in user
  const [image, setImage] = useState(null); // State to store the selected image
  const [progress, setProgress] = useState(0); // State to track upload progress

  useEffect(() => {
    // Check if a user is already signed in
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user); // Update the user state
    });
    return unsubscribe; // Unsubscribe from the auth state change listener when component unmounts
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      // Set the selected image in the state
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = firebase.storage().ref(`images/${image.name}`);
    const uploadTask = storageRef.put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.error('Error uploading image:', error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          // Save image info to Firestore
          saveImageInfoToFirestore(downloadURL, image.name);
        });
      }
    );
  };

  const saveImageInfoToFirestore = (downloadURL, imageName) => {
    firebase.firestore().collection('images').add({
      downloadURL,
      imageName,
      userName: user.displayName, // Include user's name in Firestore document
      userAvatar: user.photoURL, // Include user's avatar URL in Firestore document
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Include timestamp
    })
    .then(() => {
      console.log('Image info saved to Firestore');
    })
    .catch((error) => {
      console.error('Error saving image info to Firestore:', error);
    });
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut(); // Sign out the user
      setUser(null); // Update the user state to null
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      {user ? ( // Check if a user is logged in
        <div>
          <div className='user-details mb-5 d-flex justify-content-center align-items-center'>
         <div className='avatar px-3'>{user.photoURL && <img src={user.photoURL} alt="User avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />} </div> 
          <h5 className='px-2'>Welcome, {user.displayName}</h5>
          <button className='logoutbtn btn' onClick={handleLogout}>Logout ▼</button>
          </div>
          <div className='upload-section'>
          <h2 className='m-5'>Image Upload</h2>
          <input className='' type="file" onChange={handleFileChange} />
          <button className='btn btn-success' onClick={handleUpload}>Upload</button>
          {/* Display upload progress */}
          {progress > 0 && <progress value={progress} max="100" />}
          </div>

        </div>
      ) : (
        <h2 className='d-flex'>Please sign in to upload images
        <Link className='px-3' to="/signin"> Sign In </Link>
        </h2>
        
      )}
    </div>
  );
}

export default ImageUpload;
