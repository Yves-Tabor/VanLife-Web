import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"
import { auth, db } from "./firebase"

const vansCollectionRef = collection(db, "vans")

function authErrorMessage(code) {
    switch (code) {
        case "auth/email-already-in-use":
            return "An account with this email already exists."
        case "auth/invalid-email":
            return "Please enter a valid email address."
        case "auth/weak-password":
            return "Password must be at least 6 characters."
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Invalid email or password."
        case "auth/too-many-requests":
            return "Too many attempts. Please try again later."
        default:
            return "Authentication failed. Please try again."
    }
}

export async function loginUser({ email, password }) {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user
    } catch (err) {
        throw { message: authErrorMessage(err.code) }
    }
}

export async function signupUser({ email, password }) {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        return user
    } catch (err) {
        throw { message: authErrorMessage(err.code) }
    }
}

export async function logoutUser() {
    await signOut(auth)
}

export default async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    return querySnapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        id: docSnap.id,
    }))
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    if (!vanSnapshot.exists()) {
        throw {
            message: "Van not found",
            statusText: "Not Found",
            status: 404,
        }
    }
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id,
    }
}

export async function getHostVans() {
    const hostId = auth.currentUser?.uid
    if (!hostId) {
        throw {
            message: "You must be logged in to view your vans.",
            status: 401,
        }
    }
    const q = query(vansCollectionRef, where("hostId", "==", hostId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        id: docSnap.id,
    }))
}

export async function getHostVan(id) {
    const hostId = auth.currentUser?.uid
    if (!hostId) {
        throw {
            message: "You must be logged in to view this van.",
            status: 401,
        }
    }
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    const data = vanSnapshot.data()
    if (!vanSnapshot.exists() || data.hostId !== hostId) {
        throw {
            message: "Van not found",
            statusText: "Not Found",
            status: 404,
        }
    }
    return {
        ...data,
        id: vanSnapshot.id,
    }
}
