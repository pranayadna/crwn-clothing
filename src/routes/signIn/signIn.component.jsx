import { signInGoogleWithPopUp, createUserDocFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInGoogleWithPopUp()
        const userDocRef = await createUserDocFromAuth(user)
    }

    return (
        <div className="">
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>
                Sign in with google pop up
            </button>
        </div>
    )
}

export default SignIn