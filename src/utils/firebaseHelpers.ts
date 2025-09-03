import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
interface User {
  name: string;
  email: string;
  photoURL?: string;
}

// Fetch user data from the database
export const fetchUserFromDatabase = async (email: string) => {
  const userDocRef = doc(firestore, "users", email);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

// Save user data to Firestore
export const saveUserInDatabase = async (user: User) => {
  try {
    // Ensure the email exists
    if (!user.email) {
      console.error("User email is missing!");
      return;
    }

    const db = getFirestore();
    const userRef = doc(db, "users", user.email);

    // Write the user data to Firestore, including only the required fields
    await setDoc(userRef, {
      email: user.email,
      name: user.name || "",
      photoURL: user.photoURL || "",
    });

    console.info("User data saved in Firestore!");
  } catch (error) {
    console.error("Error saving user data in Firestore:", error);
  }
};
