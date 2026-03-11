import { supabase } from './supabaseClient'

//Signup
export async function signUp(email, password){
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })

    if(error) throw error
    return data
}

//login
export async function signIn(email, password){
    const{ data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) throw error 
    return data
}

//logout
export async function signOut(){
    const { erre } = await supabase.auth.signOut()

    if (error) throw error
}