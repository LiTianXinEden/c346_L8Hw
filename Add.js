import React, { useState } from 'react';
import { View, Text, TextInput, Button, } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
// import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({navigation, route}) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');

    const setData = async(value) => {
        AsyncStorage.setItem("bookdata", value);
        navigation.navigate("Home");
    };


    return (
        <View style={{margin: 10, marginTop:50}}>
            <View style={{ padding: 10 }}>
                <Text>Book title:</Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setTitle(text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text>ISBN:</Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setIsbn(text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text>Number of copies owned:</Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setCopies(text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text>Book type: </Text>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: 'Fictional', value: 'Fictional' },
                        { label: 'Non-Fictional', value: 'Non-Fictional' },
                    ]}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text>Image URL: </Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setImage(text)} />
            </View>

            <Button title="Add Book"
                    onPress={() => {
                        let mydata = JSON.parse(route.params.datastring);
                        let item = {key: title, image: image, isbn: isbn, copies: copies};
                        let indexnum = 1;
                        if (type == "Fictional") {
                            indexnum = 0;
                        }
                        if (type == "Non-Fictional") {
                            indexnum = 1;
                        }
                        mydata[indexnum].data.push(item);
                        let stringdata = JSON.stringify(mydata);
                        setData(stringdata);
                        // datasource[indexnum].data.push(item);
                        // navigation.navigate("Home")
                    }}
                    color="#c1ca5f"
            />

        </View>
    )
}
export default Add;
