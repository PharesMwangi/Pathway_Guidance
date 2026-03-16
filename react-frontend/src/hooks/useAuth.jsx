import { createContext, useContext, useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const isFetching = useRef(false);  // 👈 flag to prevent double fetch

    const fetchProfile = async (userId) => {
        if (isFetching.current) return;  // 👈 if already fetching, skip
        isFetching.current = true;

        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("role, full_name")
                .eq("id", userId)
                .single();

            if (!error && data) setRole(data.role);
        } finally {
            isFetching.current = false;
        }
    };

    useEffect(() => {
        // Only use onAuthStateChange — remove getSession() to avoid overlap
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null);
                if (session?.user) {
                    await fetchProfile(session.user.id);
                } else {
                    setRole(null);
                }
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}