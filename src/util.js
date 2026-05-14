import { redirect } from 'react-router-dom'

export default async function requireAuth(){
    const isLogged = localStorage.getItem('loggedin');

    if(!isLogged){
        const response = redirect("/Login?message=You must be logged in before you can access the host page");
        response.body = true;  // Workaround for Mirage JS Response polyfill issue
        throw response;
    }else{
        return null;
    }
}
