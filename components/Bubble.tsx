import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

type BubbleProps = {
    message: string;
    sender: {
        self: boolean;
        image: string;
    };
};

export default function Bubble({ message, sender }: BubbleProps) {
    const isSelf = sender.self;

    return (
        <View 
            style={{
                flexDirection: isSelf ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                marginVertical: 5,
                marginHorizontal: 10,
            }}
        >
            {isSelf ? null : (<Image
                source={{ uri: sender.image }}
                style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    marginRight: isSelf ? 0 : 10,
                    marginLeft: isSelf ? 10 : 0,
                }}
            />)}
            
            <View
                style={{
                    backgroundColor: isSelf ? 'rgba(28, 99, 213, 1)' : 'rgba(255, 255, 255, 1)',
                    padding: 10,
                    borderRadius: 10,
                    borderTopLeftRadius: isSelf ? 10 : 0,
                    borderBottomRightRadius: isSelf ? 0 : 10,
                    maxWidth: '80%',
                    }}
                >
                <Text style={{ color: isSelf ? "rgba(255, 255, 255, 1)" : "rgba(96, 96, 96, 1)" , fontSize: 14 }}>{message}</Text>
            </View>
        </View>
    );
}