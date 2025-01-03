import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert, Image} from 'react-native';
// import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {

    let mydata =JSON.parse(route.params.datastring);
    let myindex = route.params.index;

    const [title, setTitle] = useState(route.params.key);
    const [copies, setCopies] = useState(route.params.copies);
    const [image, setImage] = useState(route.params.image);

    const setData = async(value) => {
        AsyncStorage.setItem("bookdata", value);
        navigation.navigate("Home");
    };

    return (
        <View style={{margin: 10, marginTop:50}}>
            <View style={{ padding: 10 }}>
                <Text>Book title:</Text>
                <TextInput style={{ borderWidth: 1 }} value={title} onChangeText={(text) => setTitle(text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text>Number of copies owned:</Text>
                <TextInput style={{ borderWidth: 1 }} value={copies} onChangeText={(text) => setCopies(text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text>Image URL: </Text>
                <TextInput style={{ borderWidth: 1 }} value={image} onChangeText={(text) => setImage(text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text>Image Preview:</Text>
                <Image source={{uri: image}} style={{ width: 330, height: 460 }}/>
            </View>

            <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={{ flex: 1, margin: 10 }}>
                    <Button title="Save" color="#7cc200"
                            onPress={() => {
                                let indexnum = 1
                                if (route.params.type === "Fictional") {
                                    indexnum = 0;
                                }
                                if (route.params.type === "Non-Fictional") {
                                    indexnum = 1;
                                }

                                mydata[indexnum].data[route.params.index]= {
                                    key: title,
                                    copies: copies,
                                    image: image,
                                    isbn: route.params.isbn,
                                };
                                let stringdata = JSON.stringify(mydata);
                                setData(stringdata);
                            }
                            }
                    />
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    <Button title="Delete" color="#c8283a"
                            onPress={() => {
                                let indexnum = 1
                                if (route.params.type === "Fictional") {
                                    indexnum = 0;
                                }
                                if (route.params.type === "Non-Fictional") {
                                    indexnum = 1;
                                }
                                Alert.alert("Are you sure?", '',
                                    [{
                                        text: "Yes", onPress: () => {
                                            mydata[indexnum].data.splice(route.params.index, 1);
                                            let stringdata = JSON.stringify(mydata);
                                            setData(stringdata);
                                        }
                                    },
                                        { text: 'No' }])
                            }
                            }
                    />
                </View>
            </View>
        </View>
    )
}

export default Edit;
