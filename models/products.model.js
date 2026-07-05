/*
let products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 25 }
];
*/

import { db } from "../config/firebase.js";
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

const productsCollection = collection(db, "products");
const counterRef = doc(db, "counters", "productsCounter");

export const getAllProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// No por ID de Firestore, sino por el productId que es incremental
export const getProductByProductId = async (productId) => {
  const snapshot = await getDocs(productsCollection);
  const product = snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .find(p => Number(p.productId) === Number(productId)); // 🔑 comparación numérica

  return product || null;
};

export const createProduct = async (data) => {
  const counterSnap = await getDoc(counterRef);
  let newId = 1;
  if (counterSnap.exists()) {
    const lastId = counterSnap.data().lastId;
    newId = lastId + 1;

    // Actualizar contador
    await updateDoc(counterRef, { lastId: newId });
  }

  // Crear producto con ID incremental
  const docRef = await addDoc(productsCollection, { productId: newId, ...data });
  return { id: docRef.id, productId: newId, ...data };
};

export const deleteProduct = async (productId) => {
  const snapshot = await getDocs(productsCollection);
  const productDoc = snapshot.docs.find(doc => doc.data().productId == productId);
  if (!productDoc) {
    throw new Error("Producto no encontrado");
  }

  await deleteDoc(doc(db, "products", productDoc.id));
};
