import React from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Button from '@mui/material/Button';

function SignIn() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      // Redirect to home page after successful sign-in
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <Button variant="contained" color="primary" onClick={handleGoogleSignIn}>
        Sign In with Google
      </Button>
    </div>
  );
}

export default SignIn;
