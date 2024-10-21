import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { colors } from "../styles/global";

const avatarUrl =
  "https://s3-alpha-sig.figma.com/img/d7eb/2439/565ee2bb708d7a3f27c90a7cd3c9f0fa?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CtHVPTuQB2H3rFOE7XWaC-UpOHFHPtGobXLWgjCZkGnv38OwOtuZksAAt4O0c2e4mgipUcqb~vTWB7cKDdlAGQ4xZA~gJrBaCn7ZEuv6d0oqMbWVMpVGmw29YRZKhhAuHecwcnOmNpCdN4aL5MggbUPVQuB4~YpPgLQUBCaet4K4rZqSCVSTGjydvpRnzErE9SI-bSaYnH17T81foyjbpPlCnOCUekmgzWEsgMyZw-WrpfgYEFxOLnYvICU64wKKQC5cB6YLLDuEz9NyLtxnY23gudoSLAZDGeugJYvcNORusfoShaoasR6bCka3-MFRrz8krBxYac3jAJVoDRRjVQ__";

import { RouteProp } from "@react-navigation/native";

type PostsScreenRouteProp = RouteProp<
  { params: { user: { email: string } } },
  "params"
>;

const PostsScreen = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: PostsScreenRouteProp;
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
        }}
      >
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              avatarUrl && {
                uri: avatarUrl,
              }
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 13, fontWeight: 500 }}>NickName</Text>
          {/* TODO: Add nickname from user data */}
          <Text style={{ fontSize: 11, fontWeight: 400 }}>
            {route?.params?.user && route.params.user.email}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 24,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.light_gray,
    backgroundColor: colors.light_gray,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});

export default PostsScreen;
