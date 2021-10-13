import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBJj5SyD9cY9be4wTxC1srkEyox1UL50y4",
  authDomain: "artistake-airdrop.firebaseapp.com",
  projectId: "artistake-airdrop",
  storageBucket: "artistake-airdrop.appspot.com",
  messagingSenderId: "347121891683",
  appId: "1:347121891683:web:df84ab3a0b3ba1333b7b56",
  measurementId: "G-B1K3PXTRSP"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
