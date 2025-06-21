import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import Bubble from "./Bubble"; // assuming this is your chat bubble component

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
    user_id: "",
  });
  const [name, setName] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [headerSet, setHeaderSet] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const fetchChatMessages = async () => {
    if (loading) return;
    setLoading(true);
    const response = await fetch(`https://qa.corider.in/assignment/chat?page=${page}`);
    const data = await response.json();
    setChatMessagesData((prev) => [...prev, ...data.chats]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);

    if (!headerSet) {
      setSender(data.sender);
      setName(data.name.match(/\d+/)[0]);
      setFrom(data.from);
      setTo(data.to);
      setHeaderSet(true);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(250, 249, 244, 1)" }}>
      <View
        style={{
          padding: 16,
          backgroundColor: "rgba(250, 249, 244, 1)",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 2,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
            <Text style={{ fontSize: 24, fontFamily: "Mulish-Bold" }}>Trip {name}</Text>
          </View>
          <Feather name="edit" size={20} color="black" />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Image
              source={{
                uri:"https://fastly.picsum.photos/id/551/160/160.jpg?hmac=DKAZaW3KPwMLhYwnJ-s_NOYKngMXo-nR1pEQzcNCgr0",
              }}
              style={{ width: 48, height: 48, borderRadius: 24 }}
            />
            <View>
              <Text style={{ fontSize: 16, fontFamily: "Mulish-Medium", color: "rgba(96, 96, 96, 1)" }}>
                From <Text style={{ fontFamily: "Mulish-Bold", color: "rgba(20, 30, 13, 1)", fontSize: 18 }}>{from}</Text>
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "Mulish-Medium", color: "rgba(96, 96, 96, 1)" }}>
                To <Text style={{ fontFamily: "Mulish-Bold", color: "rgba(20, 30, 13, 1)", fontSize: 18 }}>{to}</Text>
              </Text>
            </View>
          </View>
          <Menu>
            <MenuTrigger>
              <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  width: 160,  
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  padding: 5
                },
              }}
            >
              <MenuOption>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5}}>
                  <Feather name="users" size={20} />
                  <Text style={{ padding: 8, fontSize: 16, fontFamily: "Mulish-Medium", color: "rgba(20, 30, 13, 1)" }}>
                    Members
                  </Text>
                </View>
              </MenuOption>
              <View style={{ height: 1, backgroundColor: "rgba(229, 229, 224, 1)" }} />
              <MenuOption>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5}}>
                  <Feather name="phone" size={20} /> 
                  <Text style={{ padding: 8, fontSize: 16, fontFamily: "Mulish-Medium", color: "rgba(20, 30, 13, 1)" }}>
                    Share Number
                  </Text>
                </View>
              </MenuOption>
              <View style={{ height: 1, backgroundColor: "rgba(229, 229, 224, 1)"}} />
              <MenuOption>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5}}>
                  <Feather name="alert-triangle" size={20} />
                  <Text style={{ padding: 8, fontSize: 16, fontFamily: "Mulish-Medium", color: "rgba(20, 30, 13, 1)" }}>
                    Report
                  </Text>
                </View>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={chatMessagesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Bubble message={item.message} sender={item.sender} />}
          inverted
          onEndReached={fetchChatMessages}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        />
      </View>

      <View style={{ margin: 10, position: "relative" }}>
        {showPopup && (
            <View style={{ position: "absolute", bottom: 55, right: 20, alignItems: "center", zIndex: 1 }}>
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "rgba(0, 128, 0, 1)",
                        borderRadius: 30,
                        padding: 8,
                        gap: 12,
                    }}
                    >
                    <TouchableOpacity style={{ padding: 5 }}>
                        <Feather name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 5 }}>
                        <Feather name="video" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 5 }}>
                        <Feather name="file-text" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                    <View
                    style={{
                        width: 12,
                        height: 12,
                        backgroundColor: "rgba(0, 128, 0, 1)",
                        transform: [{ rotate: "45deg" }],
                        marginTop: -6,
                    }}
                    />
            </View>
    )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
            borderRadius: 8,
            backgroundColor: "#fff",
            margin: 10
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              paddingHorizontal: 16,
              fontFamily: "Mulish-Medium",
            }}
            placeholder="Reply to @User"
            placeholderTextColor="rgba(183, 183, 183, 1)"
          />
          <TouchableOpacity onPress={() => setShowPopup(!showPopup)}>
            <Entypo name="attachment" size={20} color="rgba(20, 30, 13, 1)" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight:20, marginLeft:20 }}>
            <MaterialCommunityIcons name="send" size={20} color="rgba(20, 30, 13, 1)" />
            {/* inconsistent icon packages */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
