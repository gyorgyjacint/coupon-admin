import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, Modal, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Card } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
//import NotificationCard from '@/components/NotificationCard';

const dateTimeNow : string = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

const data : NotificationData[] = [
  {
    name: "dummy1",
    createdAt: dateTimeNow,
    description: "dummydata1",
    imgUrl: "https://phobiacures.info/blog/wp-content/uploads/2009/12/test-1024x1024.jpg",
    pushed: false,
    tags: ["tag1", "tag2", "tag3"]
  },
  {
    name: "dummy2",
    createdAt: dateTimeNow,
    description: "dummydata2",
    pushed: true
  },
  {
    name: "dummy3",
    createdAt: dateTimeNow,
    description: "dummydata3",
    pushed: false
  },
  {
    name: "dummy4",
    createdAt: dateTimeNow,
    description: "dummydata4",
    pushed: false,
    tags: ["tag9", "tag8", "tag7"]
  },
  {
    name: "dummy5",
    createdAt: dateTimeNow,
    description: "dummydata5",
    pushed: true
  },
  {
    name: "dummy6",
    createdAt: dateTimeNow,
    description: "dummydata6",
    imgUrl: "https://i.ytimg.com/vi/0XegpEKDK9c/maxresdefault.jpg",
    pushed: false
  }
]

function NotificationCard (
  props: any) {
    const {data, k, setModalVisible} = props;
    return (
      <Pressable onPress={setModalVisible ? setModalVisible(true) : () => {}}>
        <Card key={k}>
          <Card.Title>{data.name}</Card.Title>
          {(data.imgUrl != null && data.imgUrl.length > 0)
            ? <Image source={{uri: data.imgUrl}} />
            : <Ionicons name='image' size={32} color={'red'}/>
          }
          <Text>{data.createdAt}</Text>
          <Text>{data.description}</Text>
          <Text>Pushed: {data.pushed + ""}</Text>
          {(data?.tags != null && data.tags.length > 0) && 
            <Text>{data.tags.join(", ")}</Text>
          }
        </Card>
      </Pressable>
    );
};

type CardsComponentsProps = {};

const NotificationsScreen : React.FunctionComponent<CardsComponentsProps> = () =>  {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<NotificationData | null>(null);
  return (
    <SafeAreaView>
      <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => { handleModalOnPress({setVisibility: setModalVisible, tempDataState: setModalData}) }}
      >
        <Pressable
          style={styles.closeButton}
          onPress={() => setModalVisible(!modalVisible)}>
          <Ionicons size={30} name='close-circle-sharp'/>
        </Pressable>
        <Text style={styles.center}>{modalData?.name}</Text>
        {(modalData?.imgUrl != null && modalData?.imgUrl.length > 0)
          ? <Image style={[styles.center, styles.imgLarge]} resizeMode='contain' source={{uri: modalData.imgUrl}} />
          : <Ionicons  style={styles.center} name='image' size={128} color={'red'}/>
        }
        <Text style={styles.center}>{modalData?.createdAt}</Text>
        <Text style={styles.center}>{modalData?.description}</Text>
        <Text style={styles.center}>Pushed: {modalData?.pushed + ""}</Text>
        {(modalData?.tags != null && modalData.tags.length > 0) && 
          <Text style={styles.center}>Tags: {modalData.tags.join(", ")}</Text>
        }
      </Modal>
      <ScrollView>
        <Text style={styles.title}>Notifications</Text>
        {data && data.map((notification : NotificationData, i) => (
        <Pressable 
          onPress={() => handleModalOnPress({setVisibility: setModalVisible, tempDataState: setModalData, data: notification})}
          key={i}
          style={styles.separator}
        >
          <Card containerStyle={styles.card}>
            <Card.Title>{notification.name}</Card.Title>
            {(notification.imgUrl != null && notification.imgUrl.length > 0)
              ? <Image style={[styles.center, styles.imgSmall]} resizeMode='contain' source={{uri: notification.imgUrl}} />
              : <Ionicons style={styles.center} name='image' size={32} color={'red'}/>
            }
            <Text style={styles.center}>{notification.createdAt}</Text>
            <Text style={styles.center}>{notification.description}</Text>
            <Text style={styles.center}>Pushed: {notification.pushed + ""}</Text>
            {(notification?.tags != null && notification.tags.length > 0) && 
              <Text>Tags: {notification.tags.join(", ")}</Text>
            }
          </Card>
        </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default NotificationsScreen;

type ModalProps = {
  setVisibility: Function,
  tempDataState: Function,
  data?: NotificationData
}

function handleModalOnPress({setVisibility, tempDataState, data} : ModalProps) {
  if (data){
    tempDataState(data);
    setVisibility(true);
  } else {
    tempDataState(null);
    setVisibility(false);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
  },
  title: {
    marginBottom: 5,
    marginHorizontal: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 3,
    marginBottom: 0
  },
  center: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginVertical: 5,
    width: '90%',
    shadowOffset: {height: 15, width: 15},
    shadowRadius: 4,
    elevation: 12,
  },
  closeButton: {
    marginLeft: 'auto',
    marginRight: 0,
    padding: 15
  },
  imgSmall: {
    width: 64,
    height: 64
  },
  imgLarge: {
    width: '100%',
    height: undefined,
    aspectRatio: 1
  }
});
