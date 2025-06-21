import React from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type BubbleProps = {
    message: string;
    sender: {
        self: boolean;
        image: string;
        is_kyc_verified: boolean
    };
};

export default function Bubble({ message, sender }: BubbleProps) {
    const isSelf = sender.self;

    // Shadow styles for cross-platform compatibility
    const shadowStyle = Platform.select({
        ios: {
            shadowColor: "rgba(0, 0, 0, 0.08)",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 8,
        },
        android: {
            elevation:2,
            
        },
    });

    return (
        <View 
            style={{
                flexDirection: isSelf ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                marginVertical: 12,
                marginHorizontal: 10,
            }}
        >
            {isSelf ? null : (
                <View style={{position: "relative"}}>
                    <Image
                        source={{ uri: sender.image }}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 20,
                            marginRight: isSelf ? 0 : 10,
                            marginLeft: isSelf ? 10 : 0,
                        }}
                    />
                    {sender.is_kyc_verified && (
                        <View
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 10,
                                backgroundColor: "#fff",
                                borderRadius: 8,
                        }}>
                            <MaterialIcons
                                name="verified"
                                size={9}
                                color="#0080FF"
                            />
                        </View>
                    )}
                </View>
            )}
            
            <View
                style={[
                    {
                        backgroundColor: isSelf ? 'rgba(28, 99, 213, 1)' : 'rgba(255, 255, 255, 1)',
                        padding: 10,
                        borderRadius: 10,
                        borderTopLeftRadius: isSelf ? 10 : 0,
                        borderBottomRightRadius: isSelf ? 0 : 10,
                        maxWidth: '80%',
                    },
                    shadowStyle
                ]}
            >
                <Text style={{ color: isSelf ? "rgba(255, 255, 255, 1)" : "rgba(96, 96, 96, 1)" , fontSize: 14, fontFamily: "Mulish-Regular" }}>{message}</Text>
            </View>
            
        </View>
    );
}