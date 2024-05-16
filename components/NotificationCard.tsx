import React from "react";
/*
import { Ionicons } from "@expo/vector-icons";
import { Card, Image } from "@rneui/themed";
import { Text } from "./Themed";
import { Pressable } from "react-native";
export default function NotificationCard (
  prop: any) {

    const {data, key, setModalVisible} = prop;
    return (
      <Pressable onPress={setModalVisible ? setModalVisible(true) : () => {}}>
        <Card key={key}>
          <Card.Title>{data.name}</Card.Title>
          {(data.imgUrl != null && data.imgUrl.length > 0)
            ? <Image src={data.imgUrl} />
            : <Ionicons name='image' size={32} color={'red'}/>
          }
          <Text>{data.createdAt}</Text>
          <Text>{data.description}</Text>
          <Text>{data.pushed}</Text>
          {(data?.tags != null && data?.tags?.length > 0) && 
            <Text>{data.tags.join(", ")}</Text>
          }
        </Card>
      </Pressable>
    );
};
*/

import { Ionicons } from "@expo/vector-icons";
import { Card, Image } from "@rneui/themed";
import { Text } from "./Themed";
import { Pressable } from "react-native";

const NCard = (
  {data}: {data : NotificationData},
  {key}: {key : string | number},) => (
    <Card key={key}>
      <Card.Title>{data.name}</Card.Title>
      {(data.imgUrl != null && data.imgUrl.length > 0)
        ? <Image src={data.imgUrl} />
        : <Ionicons name='image' size={32} color={'red'}/>
      }
      <Text>{data.createdAt}</Text>
      <Text>{data.description}</Text>
      <Text>{data.pushed}</Text>
      { (data?.tags != null && data?.tags?.length > 0) && 
        <Text>{data.tags.join(", ")}</Text>
      }
    </Card>
  );

export default function NotificationCard (
  {data}: {data : NotificationData},
  {key}: {key : string | number},
  {setModalVisible}: {setModalVisible? : Function}) {

  if (!setModalVisible) {
    return <NCard data={data} key={key}/>;
  } else {
    return (
      <Pressable onPress={setModalVisible(true)}>
        <NCard data={data} key={key}/>
      </Pressable>
    );
  }
};
