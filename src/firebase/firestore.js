import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase"; 

const addPlaydate = async (playdateData) => {
  try {
    const docRef = await addDoc(collection(db, "playdates"), playdateData);
    console.log("Playdate document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding playdate document: ", error);
    throw error;
  }
};

export default addPlaydate;
