import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { userAccess } from "../jsonFiles/userAccess";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  //Additional usestates
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [regErrorMsg, setRegErrorMsg] = useState("");

  // Posts
  const [postList, setPostList] = useState([]);
  const [adsList, setAdsList] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "mgNewsPost"), orderBy("addedAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc?.id, ...doc?.data() });
      });
      setPostList(list);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "mgAdvertisements"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc?.id, ...doc?.data() });
      });
      setAdsList(list);
    });
  }, []);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          user.getIdTokenResult().then((res) => {
            setUserType(res.claims.userType);
            setDesignation(res.claims.designation);
          });
        } else {
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const logout = () => {
    setLoading(true);
    signOut(auth);
    setLoading(false);
  };

  const registerWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(credential);
      console.log(credential?.user?.uid);
      console.log(credential?.user?.email);
      // Add user to mgUsers collection
      await setDoc(doc(db, "mgUsers", credential?.user?.uid), {
        email: credential?.user?.email,
      });
    } catch (e) {
      setRegErrorMsg(e?.message);
    }
    setLoading(false);
  };

  const loginWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email, 
        password
      );
    } catch (e) {
      setLoginErrorMsg(e?.message);
    }
    setLoading(false);
  };

  const memoValues = useMemo(
    () => ({
      user,
      loading,
      registerWithEmailAndPassword,
      loginWithEmailAndPassword,
      logout,
      userType: userAccess?.find((e) => e?.email === user?.email)?.userType,
      designation: userAccess?.find((e) => e?.email === user?.email)
        ?.designation,
      //
      regErrorMsg,
      loginErrorMsg,
      // posts
      postList,
      adsList,
    }),
    [user, loading, userType, designation, postList, adsList]
  );
  return (
    <AuthContext.Provider value={memoValues}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
