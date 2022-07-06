import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button  } from 'react-native';
import React,{useState,useEffect} from 'react';
import QR_Scanner2 from './screen/QR_Scanner_2';
export default function App() {
  return (
    <QR_Scanner2/>
  );
}