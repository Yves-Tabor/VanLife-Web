import {
    addDoc,
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

function authErrorMessage(err) {
    const code = err?.code ?? ""

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
        case "auth/operation-not-allowed":
        case "auth/admin-restricted-operation":
            return "Email/password sign-in is disabled in Firebase. Open Firebase Console → Authentication → Sign-in method → enable Email/Password, then try again."
        case "auth/unauthorized-domain":
            return "This site is not authorized for Firebase Auth. Add your domain (e.g. localhost) under Authentication → Settings → Authorized domains."
        case "auth/network-request-failed":
            return "Network error. Check your connection and try again."
        case "auth/missing-password":
            return "Please enter a password."
        default:
            return (
                err?.message ||
                (code
                    ? `Authentication failed (${code}). Please try again.`
                    : "Authentication failed. Please try again.")
            )
    }
}

export async function loginUser({ email, password }) {
    try {
        const { user } = await signInWithEmailAndPassword(
            auth,
            email.trim(),
            password
        )
        return user
    } catch (err) {
        throw { message: authErrorMessage(err) }
    }
}

export async function signupUser({ email, password }) {
    try {
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            password
        )
        return user
    } catch (err) {
        throw { message: authErrorMessage(err) }
    }
}

export async function logoutUser() {
    await signOut(auth)
}

export default async function getVans() {
    const catalogQuery = query(vansCollectionRef, where("isCatalog", "==", true))
    const catalogSnapshot = await getDocs(catalogQuery)

    if (!catalogSnapshot.empty) {
        return catalogSnapshot.docs.map((docSnap) => ({
            ...docSnap.data(),
            id: docSnap.id,
        }))
    }

    // Fallback for legacy docs missing isCatalog (pre-seed data)
    const allSnapshot = await getDocs(vansCollectionRef)
    return allSnapshot.docs
        .filter((docSnap) => {
            const data = docSnap.data()
            return data.isCatalog === true || !data.hostId
        })
        .map((docSnap) => ({
            ...docSnap.data(),
            id: docSnap.id,
        }))
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    const data = vanSnapshot.data()
    if (!vanSnapshot.exists() || !data?.isCatalog) {
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

export async function rentVan(catalogVanId) {
    const hostId = auth.currentUser?.uid
    if (!hostId) {
        throw { message: "You must be logged in to rent a van." }
    }

    const catalogRef = doc(db, "vans", catalogVanId)
    const catalogSnap = await getDoc(catalogRef)
    const catalogData = catalogSnap.data()

    if (!catalogSnap.exists() || !catalogData?.isCatalog) {
        throw { message: "This van is not available in the catalog." }
    }

    const existingQuery = query(
        vansCollectionRef,
        where("hostId", "==", hostId),
        where("catalogVanId", "==", catalogVanId)
    )
    const existingSnap = await getDocs(existingQuery)
    if (!existingSnap.empty) {
        return existingSnap.docs[0].id
    }

    const { name, price, description, imageUrl, type } = catalogData
    const newRef = await addDoc(vansCollectionRef, {
        name,
        price,
        description,
        imageUrl,
        type,
        hostId,
        isCatalog: false,
        catalogVanId,
    })

    return newRef.id
}

export async function getHostVans() {
    const hostId = auth.currentUser?.uid
    if (!hostId) {
        throw {
            message: "You must be logged in to view your vans.",
            status: 401,
        }
    }
    const q = query(
        vansCollectionRef,
        where("hostId", "==", hostId),
        where("isCatalog", "==", false)
    )
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
    if (
        !vanSnapshot.exists() ||
        data.isCatalog ||
        data.hostId !== hostId
    ) {
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
