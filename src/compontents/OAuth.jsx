import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'
import micro from '../assets/svg/Microsoft_logo.png'

import {OAuthProvider} from 'firebase/auth'



const OAuth = () => {
  
  const navigate = useNavigate()
  const location = useLocation()



const onGoogleClick = async() => {

    try {
        
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const msftProvider = new OAuthProvider('microsoft.com')

        const result = await signInWithPopup(auth, provider)
        const user = result.user

        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if(!docSnap.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                email: user.email,
                timestamp: serverTimestamp()
            })
        }
        toast.success(`Welcome ${user.displayName}`)
        navigate('/')

    } catch (error) {
        toast.error('Could not authorize with Google')
    }
}


const onMicrosoftClick = async() => {

    try {
        
        const auth = getAuth()
        
        const msftProvider = new OAuthProvider('microsoft.com')

        const result = await signInWithPopup(auth, msftProvider)
        console.log(result)
        const user = result.user
        console.log(result.user)
        const credential = OAuthProvider.credentialFromResult(result)
        console.log(credential)
        const accessToken = credential.accessToken
        console.log(accessToken)
        const idToken = credential.idToken
        console.log(idToken)

        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if(!docSnap.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                email: user.email,
                timestamp: serverTimestamp()
            })
        }
        toast.success(`Welcome ${user.displayName}`)
        navigate('/')

    } catch (error) {
        toast.error('Could not authorize with Google')
    }
}

    return (
    <div className='socialLogin'>
        <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
        <button className='socialIconDiv' onClick={onGoogleClick}>
            <img className='socialIconImg' src={googleIcon} alt='google' width='34px' height='34px'/>
        </button>

        <button className='socialIconDiv' onClick={onMicrosoftClick}>
            <img className='socialIconImg' src={micro} alt='microsoft' width='34px' height='34px'/>
        </button>

    </div>
  )
}

export default OAuth