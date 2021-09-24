import firebase from "firebase/app";
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { User } from '@firebase/auth-types';
import { GalleryCardType } from "../redux/mainContentReducer";

let firebaseConfig = {
    apiKey: "AIzaSyCmVSirreqo2Yg5J0DILaNDeS_nmHVlM4g",
    authDomain: "mestos-2f5b4.firebaseapp.com",
    projectId: "mestos-2f5b4",
    storageBucket: "mestos-2f5b4.appspot.com",
    messagingSenderId: "705771100749",
    appId: "1:705771100749:web:3e88e7fbe7cb2710951a04",
    measurementId: "G-VL1H3VE362"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let fs = firebase.firestore();
let storage = firebase.storage();

export let loginAPI = {
    signUp: async (email: string, password: string) => {
        let response = await firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => error);
        if (response.user) return response.user.uid;
        return response;
    },
    signIn: async (email: string, password: string) => {
        let response = await firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => error);
        if (response.user) return response.user.uid;
        return response;
    },
    logOut: async () => {
        return await firebase.auth().signOut();
    },
    emailVerefication: async (): Promise<any> => {
        let userCredential = firebase.auth().currentUser;
        if (userCredential) {
            return await userCredential.sendEmailVerification();
        }
    }
};

export let userAPI = {
    initializeUser: async (): Promise<string | null> => {
        let userCredential: User | null = await new Promise((resolve, reject) => {
            let unsubscribe = firebase.auth().onAuthStateChanged(uc => {
                resolve(uc);
                unsubscribe();
            });
        });
        if (userCredential) return userCredential.uid;
        return userCredential; //it'll return null
    },
    setUser: async (nameAndLastName: string, profession: string, id: string | undefined) => {
        if (id) {
            return await fs.collection('users').doc(id).set({
                nameAndLastName,
                profession,
                galleryCards: [],
                avatar: firebase.auth().currentUser?.photoURL
            });
        };
    },
    getUser: async (id: string) => {
        let doc = await fs.collection('users').doc(id).get();
        return doc.data();
    }
};

export let galleryCardsAPI = {
    setGalleryCard: async (img: File, name: string): Promise<string> => {
        //userId must be here
        let userId = firebase.auth().currentUser!.uid;
        let imgRef = storage.ref().child('users').child(userId).child(img.name);
        await imgRef.put(img);
        let imgUrl = await imgRef.getDownloadURL()
        fs.collection('users').doc(userId).update({
            galleryCards: firebase.firestore.FieldValue.arrayUnion({
                name,
                src: imgUrl,
                isLiked: false
            })
        });
        return imgUrl;
    },
    updateIsLiked: async (isLiked: boolean, name: string) => {
        // 0_0
        let userId = firebase.auth().currentUser?.uid;
        let userDoc = await fs.collection('users').doc(userId).get()
        let galleryCards: Array<GalleryCardType> = await userDoc.data()?.galleryCards;
        let currentCardIndex = galleryCards.findIndex(c => c.name === name);
        galleryCards[currentCardIndex].isLiked = isLiked;
        fs.collection('users').doc(userId).update({
            galleryCards
        });
        return galleryCards;
    },
    deleteGalleryCard: async (name: string, img: string) => {
        //userId must be here
        let userId = firebase.auth().currentUser!.uid;
        let userDoc = await fs.collection('users').doc(userId).get();
        let galleryCards: Array<GalleryCardType> = await userDoc.data()?.galleryCards;
        let filtredGalleryCards = galleryCards.filter(c => c.name !== name);
        let imgRef = storage.refFromURL(img);
        await imgRef.delete();
        fs.collection('users').doc(userId).update({
            galleryCards: filtredGalleryCards
        });
        return filtredGalleryCards;
    }
};

export let personalInformationAPI = {
    updatePersonalInformation: async (nameAndLastName: string, profession: string) => {
        let userId = firebase.auth().currentUser?.uid;
        return fs.collection('users').doc(userId).update({
            nameAndLastName,
            profession
        });
    },
    updateAvatar: async (avatar: File): Promise<string> => {
        //userId must be here
        let userId = firebase.auth().currentUser!.uid;
        let avatarRef = storage.ref().child('users').child(userId).child(avatar.name);
        await avatarRef.put(avatar);
        let avatarUrl: string = await avatarRef.getDownloadURL()
        fs.collection('users').doc(userId).update({
            avatar: avatarUrl
        });
        return avatarUrl;
    },
};