import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import { catalogVans } from "./data/catalogVans"

export async function seedCatalogVans() {
    const results = []

    for (const van of catalogVans) {
        const ref = doc(db, "vans", van.id)
        const existing = await getDoc(ref)

        if (existing.exists() && existing.data().isCatalog) {
            results.push({ id: van.id, status: "skipped" })
            continue
        }

        const { id, ...data } = van
        await setDoc(ref, {
            ...data,
            isCatalog: true,
        })
        results.push({ id, status: "created" })
    }

    return results
}
