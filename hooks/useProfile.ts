'use client'

import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

export function useProfile() {
  
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                throw error;
            }

            if (data) {
                //@ts-ignore
                setUser(data.user.user_metadata);   
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

  return { user, loading }
}