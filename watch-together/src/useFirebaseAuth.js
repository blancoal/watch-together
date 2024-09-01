import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

let userCredential; // singleton

const useFirebaseAuth = () => {

    const authenticateApp = () => {
        const auth = getAuth(app);

        const user = process.env.FIREBASE_AUTH_EMAIL;
        const passwd = process.env.FIREBASE_AUTH_PASSWORD;
        if (!user || !passwd) {
            console.error("FIREBASE_AUTH_EMAIL or FIREBASE_AUTH_PASSWORD not defined", { user, passwd });
        }
        return signInWithEmailAndPassword(auth, user, passwd);
    }

    return userCredential || authenticateApp();
};

export useFirebaseAuth;
