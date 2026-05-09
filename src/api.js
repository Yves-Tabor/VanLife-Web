// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCpkB6_xXSQ9A4f-KNZ4XIeOXbscm8gARA",
//   authDomain: "vanlife-864e0.firebaseapp.com",
//   projectId: "vanlife-864e0",
//   storageBucket: "vanlife-864e0.firebasestorage.app",
//   messagingSenderId: "932957926693",
//   appId: "1:932957926693:web:ee326c388afa65110016cc",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const vansCollection = collection(db, 'vans');

// export default async function getVans(){
//     const querySnapshot = await getDocs(vansCollection);
//     const dataArr = querySnapshot.docs.map(doc =>{
//         return {
//             ...doc.data(),
//             id: doc.id
//         };
//     });
//     return dataArr;
// }

// export async function getVan(id){
//     const q = query(vansCollection, where('hostId', '==', "123"));
//     const querySnapshot = await getDocs(q);
//     if (querySnapshot.empty) {
//         throw {
//             message: "Van not found",
//             statusText: "Not Found",
//             status: 404
//         };
//     }
//     return docSnap.data();
// }

async function getVans(){
    const res = await fetch('/api/vans') 
    if(!res.ok){
        throw{
            message: "Failed to fetch vans!!",
            statusText: res.statusText,
            status: res.status
        }
    }
    
    const data = await res.json();
    return data.vans;
}

async function getVan(id){
    const res = await fetch(`/api/vans/${id}`) 
    if(!res.ok){
        throw{
            message: "Failed to fetch van details!!",
            statusText: res.statusText,
            status: res.status
        }
    }
    
    const data = await res.json();
    return data.vans;
}

async function getHostVans(){
    const res = await fetch('/api/vans') 
    if(!res.ok){
        throw{
            message: "Failed to fetch host vans!!",
            statusText: res.statusText,
            status: res.status
        }
    }
    
    const data = await res.json();
    return data.vans;
}

async function getHostVan(id){
    const res = await fetch(`/api/vans/${id}`) 
    if(!res.ok){
        throw{
            message: "Failed to fetch host van details!!",
            statusText: res.statusText,
            status: res.status
        }
    }
    
    const data = await res.json();
    return data.vans;
}

export default getVans;
export { getVan, getHostVans, getHostVan };

export async function loginUser(creds){
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
    if(!res.ok){
        const errorData = await res.json();
        throw{
            message: errorData.message || "Login failed",
            statusText: res.statusText,
            status: res.status
        }
    }
    
    const data = await res.json();
    return data;
}
