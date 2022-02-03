
import React,
    {
        ReactNode,
        createContext,
        useContext,
        useState,
        useEffect
     } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';


const {CLIENT_ID} = process.env;
const {REDIRECT_URI} = process.env;
interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id:string;
    name:string;
    email:string;
    photo?:string;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signOut():Promise<void>;
    userStoreIsLoading:boolean;
}

interface AuthorizationResponse {
    params: {
        access_token:string;   
    },
    type:string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}:AuthProviderProps){
    const [user,setUser] = useState<User>({} as User); 
    const [userStoreIsLoading,setUserStoreIsLoading] = useState(false);
    const userStorageKey = '@gofinances:user';
    
    async function signInWithGoogle(){
        //Login Fake
        const userLogged = {
            id:'1',
            email:'userInfo.email',
            name:'userInfo.given_name',
            photo:'userInfo.picture'
        }
        setUser(userLogged);
        


        /* Login com o google - Descomentar 
        try{
            const RESONSE_TYPE='token';
            const SCOPE=encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESONSE_TYPE}&scope=${SCOPE}`;
            const {type,params} = await AuthSession
                .startAsync({authUrl}) as AuthorizationResponse;

            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();


                const userLogged = {
                    id:userInfo.id,
                    email:userInfo.email,
                    name:userInfo.given_name,
                    photo:userInfo.picture
                }

                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey,JSON.stringify(userLogged));
                
            } 
        }catch (error){
            throw new Error(error as string);
        }
        */

    }

   
    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey);
    }

    useEffect(() => {
       async function loadUserStorageDate() {
           setUserStoreIsLoading(true);
           const userStoraged = await AsyncStorage.getItem(userStorageKey);

           if(userStoraged) {
               const userLogged = JSON.parse(userStoraged) as User;
               setUser(userLogged);
           }
           setUserStoreIsLoading(false);
       }

       loadUserStorageDate();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signOut,
            userStoreIsLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider,useAuth}