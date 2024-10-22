import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { colors } from "../styles/global";
import { RouteProp } from "@react-navigation/native";
import { SimpleLineIcons, FontAwesome5 } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const pictureWidth = SCREEN_WIDTH - 32;
const pictureHeight = pictureWidth * 0.7;

const data = [
  {
    id: "1",
    pictureUrl:
      "https://s3-alpha-sig.figma.com/img/d7eb/2439/565ee2bb708d7a3f27c90a7cd3c9f0fa?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CtHVPTuQB2H3rFOE7XWaC-UpOHFHPtGobXLWgjCZkGnv38OwOtuZksAAt4O0c2e4mgipUcqb~vTWB7cKDdlAGQ4xZA~gJrBaCn7ZEuv6d0oqMbWVMpVGmw29YRZKhhAuHecwcnOmNpCdN4aL5MggbUPVQuB4~YpPgLQUBCaet4K4rZqSCVSTGjydvpRnzErE9SI-bSaYnH17T81foyjbpPlCnOCUekmgzWEsgMyZw-WrpfgYEFxOLnYvICU64wKKQC5cB6YLLDuEz9NyLtxnY23gudoSLAZDGeugJYvcNORusfoShaoasR6bCka3-MFRrz8krBxYac3jAJVoDRRjVQ__",
    pictureName: "Назва 1",
    comments: 1,
    locality: "Місцевість 1",
  },
  {
    id: "2",
    pictureUrl:
      "https://s3-alpha-sig.figma.com/img/d7eb/2439/565ee2bb708d7a3f27c90a7cd3c9f0fa?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CtHVPTuQB2H3rFOE7XWaC-UpOHFHPtGobXLWgjCZkGnv38OwOtuZksAAt4O0c2e4mgipUcqb~vTWB7cKDdlAGQ4xZA~gJrBaCn7ZEuv6d0oqMbWVMpVGmw29YRZKhhAuHecwcnOmNpCdN4aL5MggbUPVQuB4~YpPgLQUBCaet4K4rZqSCVSTGjydvpRnzErE9SI-bSaYnH17T81foyjbpPlCnOCUekmgzWEsgMyZw-WrpfgYEFxOLnYvICU64wKKQC5cB6YLLDuEz9NyLtxnY23gudoSLAZDGeugJYvcNORusfoShaoasR6bCka3-MFRrz8krBxYac3jAJVoDRRjVQ__",
    pictureName: "Назва 2",
    comments: 2,
    locality: "Місцевість 2",
  },
  {
    id: "3",
    pictureUrl:
      "https://s3-alpha-sig.figma.com/img/d7eb/2439/565ee2bb708d7a3f27c90a7cd3c9f0fa?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CtHVPTuQB2H3rFOE7XWaC-UpOHFHPtGobXLWgjCZkGnv38OwOtuZksAAt4O0c2e4mgipUcqb~vTWB7cKDdlAGQ4xZA~gJrBaCn7ZEuv6d0oqMbWVMpVGmw29YRZKhhAuHecwcnOmNpCdN4aL5MggbUPVQuB4~YpPgLQUBCaet4K4rZqSCVSTGjydvpRnzErE9SI-bSaYnH17T81foyjbpPlCnOCUekmgzWEsgMyZw-WrpfgYEFxOLnYvICU64wKKQC5cB6YLLDuEz9NyLtxnY23gudoSLAZDGeugJYvcNORusfoShaoasR6bCka3-MFRrz8krBxYac3jAJVoDRRjVQ__",
    pictureName: "Назва 3",
    comments: 3,
    locality: "Місцевість 3",
  },
];

const avatarUrl =
  "https://s3-alpha-sig.figma.com/img/d7eb/2439/565ee2bb708d7a3f27c90a7cd3c9f0fa?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CtHVPTuQB2H3rFOE7XWaC-UpOHFHPtGobXLWgjCZkGnv38OwOtuZksAAt4O0c2e4mgipUcqb~vTWB7cKDdlAGQ4xZA~gJrBaCn7ZEuv6d0oqMbWVMpVGmw29YRZKhhAuHecwcnOmNpCdN4aL5MggbUPVQuB4~YpPgLQUBCaet4K4rZqSCVSTGjydvpRnzErE9SI-bSaYnH17T81foyjbpPlCnOCUekmgzWEsgMyZw-WrpfgYEFxOLnYvICU64wKKQC5cB6YLLDuEz9NyLtxnY23gudoSLAZDGeugJYvcNORusfoShaoasR6bCka3-MFRrz8krBxYac3jAJVoDRRjVQ__";

type PostsScreenRouteProp = RouteProp<
  { params: { user?: { email: string }; post?: ItemProps } },
  "params"
>;

type ItemProps = {
  id?: string;
  pictureUrl: string;
  pictureName: string;
  comments: number;
  locality: string;
};

const PostsScreen = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: PostsScreenRouteProp;
}) => {
  const [posts, setPosts] = useState<ItemProps[]>(data);
  if (route.params.post) {
    console.log({ post: route.params.post });
    setPosts((prev) => [...prev, route.params.post!]);
  }
  console.log({ posts });
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
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Item
            pictureUrl={item.pictureUrl}
            pictureName={item.pictureName}
            comments={item.comments}
            locality={item.locality}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
};

const Item = ({
  pictureUrl = " ",
  pictureName,
  comments,
  locality,
}: ItemProps) => (
  <>
    <View style={styles.pictureContainer}>
      <Image
        style={styles.picture}
        source={
          pictureUrl && {
            uri: pictureUrl,
          }
        }
      />
    </View>
    <Text style={styles.text}>{pictureName && pictureName}</Text>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <FontAwesome5 name="comment" size={24} color={colors.gray} />
        <Text style={styles.pictureCopy}>{comments && comments}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 6 }}>
        <SimpleLineIcons name="location-pin" size={24} color={colors.gray} />
        <Text style={styles.pictureCopy}>{locality && locality}</Text>
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    gap: 32,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
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
  pictureContainer: {
    width: pictureWidth,
    height: pictureHeight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
  },
  picture: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: colors.light_gray,
  },
  pictureCopy: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "left",
    color: colors.gray,
  },
});

export default PostsScreen;
