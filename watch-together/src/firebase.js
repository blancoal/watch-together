import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: move api key to env var
// TODO: change DB config from test
const firebaseConfig = {
        apiKey: "AIzaSyCLdChaGv_9JUQ9GAfhQqC1P_kxqTSsxGo",
        authDomain: "watch-together-2f581.firebaseapp.com",
        databaseURL: "https://watch-together-2f581-default-rtdb.firebaseio.com",
        projectId: "watch-together-2f581",
        storageBucket: "watch-together-2f581.appspot.com",
        messagingSenderId: "524754546150",
        appId: "1:524754546150:web:504afcc3e6a9174bcf7a27"
      };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
