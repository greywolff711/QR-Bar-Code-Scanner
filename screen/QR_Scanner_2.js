import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import "isomorphic-fetch"
export default function QR_Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned')
    const [users, setUsers] = useState([]);
    const [user,setUser]=useState('No user yet');
    const [userEmail,setuserEmail]=useState('No email');
    const [userId,setuserId]=useState('No ID');
    //api endpoint
    const userCollection='http://192.168.1.9:8090/api/users';
    const getAllUsers=()=>{
        fetch(userCollection)
        .then((response)=>response.json())
        .then((json)=>setUsers(json))
        .catch((err)=>console.log(err));
    }
    const obtain=(data)=>{
        console.log(data);
        const res=users.filter((user)=>(user.empid==data));
        console.log(res);
        if(res.length===0){
            console.log('NONE');
            return;
        }
        console.log(res);
        setUser(res[0].username);
        setuserEmail(res[0].email);
        setuserId(res[0].empid);
    }
    const askForPermission=()=>{
        (async ()=>{
        const {status}=await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status==='granted');
        })()
    }

    useEffect(()=>{
        setUser('No user yet');
        setuserEmail('No email');
        setuserId('No ID');
        getAllUsers();
        askForPermission();
    },[text]);

    const handleBarCodeScanned=({type,data})=>{
        setScanned(true);
        setText(data);
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
        <Text style={styles.maintext}>
            USER IS :{user}
        </Text>
        <Text style={styles.maintext}>
            EMAIL IS :{userEmail}
        </Text>
        <Text style={styles.maintext}>
            Employee Id IS :{userId}
        </Text>
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