import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

export default class FirebaseUserService {
    static authE = (auth,login) => {
        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'https://www.example.com/finishSignUp?cartId=1234',
            // This must be true.
            handleCodeInApp: true,
            iOS: {
              bundleId: 'com.example.ios'
            },
            android: {
              packageName: 'com.example.android',
              installApp: true,
              minimumVersion: '12'
            },
            dynamicLinkDomain: 'example.page.link'
          };
        sendSignInLinkToEmail(auth, login, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', login);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
    }
    static signup = (auth, login, password, callback) => {
        createUserWithEmailAndPassword(
            auth,
            login,
            password
        )
            .then(
                (userCredential) => {
                    callback(true,userCredential.user)
                }
            )
            .catch(
                (error) => {
                    callback(false,error.code)
                    console.log(error.code)
                }
            )
    }

    static login = (auth, login, password, callback) => {
        signInWithEmailAndPassword(
            auth,
            login,
            password
        )
            .then(
                (userCredential) => {
                    callback(userCredential.user)
                }
            )
            .catch(error => { callback(null); console.log(error) })
    }

    static logout = (auth, callback) => {
        signOut(auth)
            .then(() => { callback(true) })
            .catch(error => { callback(false); console.log(error) })
    }
}