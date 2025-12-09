// src/services/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { ref, set, get, child } from "firebase/database";
import { auth, database } from "./firebaseConfig"; // adjust path if needed

// Register user: create Auth user and create profile in Realtime DB (clients/{uid})
export const userRegister = async (email, password, profileData = {}) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      String(email),
      String(password)
    );
    const uid = res.user.uid;

    // write profile to RTDB (do NOT store password)
    await set(ref(database, `clients/${uid}`), {
      id: uid,
      email,
      createdAt: new Date().toISOString(),
      ...profileData,
    });

    return res;
  } catch (err) {
    console.error("userRegister error:", err.code, err.message);
    throw err;
  }
};

// Login user: sign in with Auth, then read /clients/{uid} from RTDB
export const userLogin = async (email, password) => {
  try {
    // authenticate
    const res = await signInWithEmailAndPassword(
      auth,
      String(email),
      String(password)
    );
    const uid = res.user.uid;

    // read profile from RTDB
    const dbRef = ref(database);
    const snap = await get(child(dbRef, `clients/${uid}`));
    const profile = snap.exists() ? snap.val() : null;

    // get a fresh ID token
    const token = await res.user.getIdToken();

    return { authResult: res, profile, token };
  } catch (err) {
    console.error("userLogin error:", err.code, err.message);
    throw err;
  }
};

// Logout: signs out and clears UI keys
export const userLogout = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("client");
    await signOut(auth);
  } catch (err) {
    console.error("userLogout error:", err.code, err.message);
    throw err;
  }
};
