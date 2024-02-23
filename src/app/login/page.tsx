'use client'
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
    const {data:session, status} = useSession()

    useEffect(() => {
        if(status === "unauthenticated"){
            signIn("keycloak")
        }
    }, [status])

    return <div>
        <button onClick={() => signIn("keycloak")}>Login</button>
    </div>
}