import {useEffect, useState} from "react"
import {useAuthProvider} from "../providers/AuthProvider.jsx"

export default function Verification () {
    const {API} = useAuthProvider()
    console.log(API)

    return (
        <div className= "verification">
            <h1>verification</h1>
        </div>
    )
}