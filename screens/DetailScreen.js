import React from 'react';
import {View, Text, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SharedElement} from 'react-navigation-shared-element';

const DetailScreen = ({route, navigation}) => {
  const {item} = route.params;

  return (
    <View key={item.id} style={{flex: 1, backgroundColor: '#1C1A29'}}>
      <SharedElement id={`item.${item.id}.image`}>
        <Image
          key={item.id}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
          style={{
            width: '100%',
            height: 700,
            resizeMode: 'cover',
            margin: 0,
            marginBottom: 6,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        />
      </SharedElement>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{position: 'absolute', top: 55, left: 16}}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="ios-arrow-back" size={22} />
        </View>
      </TouchableOpacity>
      <View style={{marginTop: 12}}>
        <SharedElement id={`item.${item.title}.title`}>
          <Text
            key={item.title}
            style={{
              fontSize: 18,
              fontWeight: '800',
              textAlign: 'center',
              color: 'white',
            }}>
            {item.title}
          </Text>
        </SharedElement>
      </View>
    </View>
  );
};

DetailScreen.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;

  return [
    {id: `item.${item.id}.image`},
    {
      id: `item.${item.title}.title`,
      animation: 'fade',
      resize: 'clip',
      align: 'top-left',
    },
  ];
};

export default DetailScreen;
