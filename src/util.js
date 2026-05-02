import { redirect } from 'react-router-dom'

export default async function requireAuth(){
    const isLogged = 'false';

    if(!isLogged){
        throw redirect('/Login?message=You must be logged in before you can access the host page');
    }else{
        return null;
    }
}
