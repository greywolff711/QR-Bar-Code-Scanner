import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { collection, addDoc,doc, getDoc,getDocs } from "firebase/firestore"; 
import { db } from '../components/config';
export default function QR_Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned')
    const [users, setUsers] = useState([]);
    const [user,setUser]=useState('No user yet');
    const [userEmail,setuserEmail]=useState('No email');
    const [userId,setuserId]=useState('No ID');
    const userCollectionRef = collection(db, "users");
    const getAllUsers=()=>{
        return getDocs(userCollectionRef);
    }
    const getUsers=async () => {
        const data = await getAllUsers();
        setUsers(data.docs.map(doc=>({...doc.data(),id:doc.id})))
    }
    const obtain=(data)=>{
        const res=users.filter((user)=>(user.empId===data));
        // console.log(res);
        if(res.length===0){
            // Alert.alert(
            //     "Wrong Employee Id",
            //     "This is an invalid ID scanned",
            //     [
            //       { text: "OK", onPress: () => console.log("OK Pressed") }
            //     ]
            //   );
            console.log('NONE');
            return;
        }
        setUser(res[0].username);
        setuserEmail(res[0].email);
        setuserId(res[0].empId);
    }
    const askForPermission=()=>{
        (async ()=>{
        const {status}=await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status==='granted');
        })()
    }

    // Request Camera permission
    useEffect(()=>{
        setUser('No user yet');
        setuserEmail('No email');
        setuserId('No ID');
        getUsers();
        askForPermission();
    },[text]);

    // Scanning bar code
    const handleBarCodeScanned=({type,data})=>{
        setScanned(true);
        setText(data);
        // console.log("data->"+data);
        // console.log(data+" "+scanned);
        obtain(data);
    }

    if(hasPermission===null){
        return (
        <View style={styles.container}>
            <Text>Requesting for Camera permission</Text>
        </View>
        )
    }

    if(hasPermission===false){
        return(<View style={styles.container}>
            <Text style={{margin:10}}>No Access to camera</Text>
            <Button title='Please Grant Permission' onPress={()=>{askForPermission()}}></Button>
        </View>
        )
    }

    return (
        <View style={styles.container}>
        <View style={styles.barcodebox}>
            <BarCodeScanner 
            onBarCodeScanned={handleBarCodeScanned} 
            style={{height:1000,width:400}}
            />
        </View>
        {/* <Text style={styles.maintext}>
            {text}
        </Text> */}
        <Text style={styles.maintext}>
            USER IS :{user}
        </Text>
        <Text style={styles.maintext}>
            EMAIL IS :{userEmail}
        </Text>
        <Text style={styles.maintext}>
            Employee Id IS :{userId}
        </Text>
        {/* {scanned&&<Button title='Scan Again?' onPress={()=>setScanned(false)} color='tomato'/>} */}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor:'tomato'
  }
});