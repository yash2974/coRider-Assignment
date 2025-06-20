import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text,Image, Touchable, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, FlatList, ActivityIndicator } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import Bubble from "./Bubble";






export default function ChatScreen() {
    type Sender = {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
    };

    type ChatMessage = {
    id: string;
    message: string;
    sender: Sender;
    time: string;
    };

    const [chatMessagesData, setChatMessagesData] = useState<ChatMessage[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [sender, setSender] = useState<Sender>({
        image: "",
        is_kyc_verified: false,
        self: false,
        user_id: ""
    });
    const [name, setName] = useState<string>("");
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [headerSet, setHeaderSet] = useState<boolean>(false);

    const fetchChatMessages = async () => {
        if (loading) return; // prevent multiple fetches on spam scroll
        setLoading(true);
        const response = await fetch(`https://qa.corider.in/assignment/chat?page=${page}`);
        setPage(prevPage => prevPage + 1);
        const data = await response.json();
        setChatMessagesData((prev) => [...prev, ...data.chats]);
        setLoading(false);
        console.log("Chat messages data:", data.chats, "Page:", page);
        if (!headerSet) {
            setSender(data.sender);
            setName(data.name);
            setFrom(data.from);
            setTo(data.to);
        }
        
        setHeaderSet(true);
    }

    useEffect(() => {
        fetchChatMessages();
    }, []);


    return (
        
             
                <View style={{ flex: 1, backgroundColor: 'rgba(229, 229, 224, 1)' }}>
                    <View
                    style={{
                        backgroundColor: 'rgba(229, 229, 224, 1)',
                        padding: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 2,
                        elevation: 2,
                    }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <MaterialCommunityIcons name="arrow-left" size={28} color="black" />
                                <Text style={{ fontSize: 24, fontFamily: "Mulish-Bold", }}>{name}</Text>
                            </View>
                            <MaterialCommunityIcons name="square-edit-outline" size={28} color="black" />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                <Image
                                source={{ uri: 'https://fastly.picsum.photos/id/551/160/160.jpg?hmac=DKAZaW3KPwMLhYwnJ-s_NOYKngMXo-nR1pEQzcNCgr0' }}
                                style={{ width: 48, height: 48, borderRadius: 25 }}
                                />
                                <View>
                                <Text style={{ fontSize: 16, fontFamily: "Mulish-Medium",color: 'rgba(96, 96, 96, 1)' }}>From <Text style={{ fontFamily: "Mulish-Bold", color: "rgba(20, 30, 13, 1)", fontSize: 18}}>{from}</Text></Text>
                                <Text style={{ fontSize: 16, fontFamily: "Mulish-Medium",color: 'rgba(96, 96, 96, 1)' }}>To <Text style={{ fontFamily: "Mulish-Bold", color: "rgba(20, 30, 13, 1)", fontSize: 18}}>{to}</Text></Text>
                                </View>
                            </View>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="dots-vertical" size={28} color="black" />
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <FlatList
                        data = {chatMessagesData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Bubble message={item.message} sender={item.sender} />}
                        inverted={true}
                        onEndReached={fetchChatMessages}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                        />
                    </View>
                    <View>
                        
                            <View style={{ flexDirection: "row", alignItems: "center", margin: 10, padding: 5, borderRadius: 8, backgroundColor: "rgba(255, 255, 255, 1)" }}>
                                <TextInput
                                    style={{ flex: 1, height: 40, paddingHorizontal: 16, fontFamily: "Mulish-Medium" }}
                                    placeholder="Type a message"
                                    placeholderTextColor={"rgba(183, 183, 183, 1)"}
                                />
                                <TouchableOpacity style={{  marginHorizontal: 8 }}>
                                    <Entypo name="attachment" size={20} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginHorizontal: 8 }}>
                                    <MaterialCommunityIcons name="send" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        
                    </View>
                </View>
            
        
    );

}

