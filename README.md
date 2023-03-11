# Project Settings:

React native expo sdk47

Firebase config:
_nano /src/utils/firebase.js_

```
import { initializeApp } from  "firebase/app";
import { getFirestore } from  "firebase/firestore";

const  firebaseConfig = {
apiKey:  "Your apiKey",
authDomain:  "Your auth domain",
projectId:  "Your project id",
storageBucket:  "Your storageBucket",
messagingSenderId:  "Your messagingSenderId",
appId:  "Your appId"

};
export  const  initFirebase = initializeApp(firebaseConfig);
export  const  db = getFirestore(initFirebase);
```
