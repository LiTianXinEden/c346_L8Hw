import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    itemStyle: {
        alignItems: 'center',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },

    headerStyle: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 5
    },
    wordsStyle: {
        flexDirection: 'column',
        alignItems: 'left',
    },
    textStyle: {
        fontSize: 15,

    },
    imageStyle: {
        width: 130,
        height: 260,
        resizeMode: 'contain'
    },
});

const Home = ({navigation}) => {

    const [mydata, setMydata] =useState([]);

    const getData  = async() => {
        let datastr = await AsyncStorage.getItem("bookdata");
        if (datastr != null) {
            let jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        }
        else {
            setMydata(datasource);
        }
    };
    getData();


    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.itemStyle}
                onPress={() => {
                    let datastr = JSON.stringify(mydata);
                    navigation.navigate('Edit', {index: index, type: section.title, isbn: item.isbn, copies: item.copies, image: item.image, key: item.key, datastring:datastr});
                }}
            >
                <View style={styles.wordsStyle}>
                    <Text style={styles.textStyle}>Name: {item.key}</Text>
                    <Text style={styles.textStyle}>ISBN: {item.isbn}</Text>
                    <Text style={styles.textStyle}>Copies Owned: {item.copies}</Text>

                </View>
                <Image source={{uri: item.image}}
                       style={styles.imageStyle}
                       // style={{ width: 330, height: 460 }}
                />
            </TouchableOpacity>
        )
    };

    return (
        <View style={{margin: 10, marginTop:50, marginBottom: 50}}>
            <StatusBar hidden ={true}/>
            <Button title="Add Book" color="#00adc1"
                    onPress={() => {
                        let datastr = JSON.stringify(mydata)
                        navigation.navigate('Add', {datastring:datastr}) }} />
            <Text></Text>
            <SectionList style={{ marginBottom: 50, }}
                // sections={datasource}
                sections={mydata}
                renderItem={renderItem}
                renderSectionHeader={({section: {title, bgcolor}}) => (
                    <View style={[styles.headerStyle, { backgroundColor: bgcolor }]}>
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                )}

            />
        </View>
    )
}


export default Home;
