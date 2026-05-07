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