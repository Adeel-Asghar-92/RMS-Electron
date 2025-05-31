import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYVtDHMI-zLq-YeZveZhDXgZoiDjOy4vc",
  authDomain: "second-project-56dd8.firebaseapp.com",
  projectId: "second-project-56dd8",
  storageBucket: "second-project-56dd8.appspot.com",
  messagingSenderId: "341414124065",
  appId: "1:341414124065:web:b1f74146b631599477a160",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Add required permissions/scopes for Facebook login
facebookProvider.addScope("email");
facebookProvider.addScope("public_profile");

// Google Sign-In Function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    // Save token and user data
    localStorage.setItem("accessToken", token);
    console.log("Google User Info: ", user);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

// Facebook Sign-In Function
const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // Fetch additional user data using Facebook Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`
    );
    const data = await response.json();

    // Log and save user data
    console.log("Facebook User Info:", data);
    console.log("Profile Picture URL:", data.picture.data.url);

    localStorage.setItem("accessToken", token);
    localStorage.setItem("facebookUserData", JSON.stringify(data));
  } catch (error) {
    console.error("Facebook Sign-In Error:", error);
  }
};

export { signInWithGoogle, signInWithFacebook };
