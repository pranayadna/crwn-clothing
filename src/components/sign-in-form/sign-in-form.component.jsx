import { useState } from "react"
import { signInWithGooglePopUp, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"

import Button from "../../components/button/button.component"
import FormInput from "../../components/form-input/form-input.component"
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user)
            resetFormFields()
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                alert('User not found')
            }

            if (error.code === 'auth/wrong-password') {
                alert('Wrong password')
            }

            console.log('There was an error while creating an user', error.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopUp()
        const userDocRef = await createUserDocumentFromAuth(user)

        console.log(userDocRef);
    }

    return (
        <div className="sign-in-containers">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput
                    label='Password'
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />

                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button> 
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Sign in with google
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm