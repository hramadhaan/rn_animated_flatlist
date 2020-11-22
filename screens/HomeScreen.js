import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {DATA} from '../data/dummy-data';
import {SharedElement} from 'react-navigation-shared-element';

const HomeScreen = (props) => {
  const [movies, setMovies] = React.useState([]);
  const {width, height} = Dimensions.get('screen');
  const SPACING = 10;
  const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
  const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
  const BACKDROP_HEIGHT = height * 0.65;

  const scrollX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    setMovies([{key: 'empty-left'}, ...DATA, {key: 'empty-right'}]);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text style={styles.amountRp}>Rp. 50.000</Text>
          <View
            style={[
              styles.containerPlace,
              {
                left: width / 3,
                padding: 8,
              },
            ]}>
            <Text style={styles.placeText} numberOfLines={1}>
              Xchange Mall
            </Text>
          </View>
          <Ionicons
            style={{position: 'absolute', right: 0}}
            name="notifications-outline"
            color="white"
            size={24}
          />
        </View>
        <View style={styles.containerPlayingNow}>
          <Text style={{color: 'white', fontSize: 23, fontWeight: '800'}}>
            Playing Now
          </Text>
          <Text style={{color: 'white'}}>See All</Text>
        </View>
        <View style={{height: 600}}>
          <Animated.FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
            renderToHardwareTextureAndroid
            snapToAlignment="start"
            contentContainerStyle={{
              alignItems: 'center',
            }}
            data={movies}
            keyExtractor={(item, index) => item.original_title}
            snapToInterval={ITEM_SIZE}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={16}
            renderItem={({item, index}) => {
              if (!item.poster_path) {
                return (
                  <View
                    style={{
                      width: EMPTY_ITEM_SIZE,
                    }}
                  />
                );
              }

              const inputRange = [
                (index - 2) * ITEM_SIZE,
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
              ];

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [-20, -50, -20],
                extrapolate: 'extend',
              });

              const scale = scrollX.interpolate({
                inputRange: [
                  (index - 2) * ITEM_SIZE,
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                ],
                outputRange: [0.85, 1, 0.85],
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.2, 1, 0.2],
              });

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    props.navigation.navigate('Detail', {
                      item: item,
                    });
                  }}>
                  <View style={{width: ITEM_SIZE}}>
                    <Animated.View
                      style={{
                        marginHorizontal: SPACING,
                        padding: SPACING * 1,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 30,
                        transform: [{translateY}],
                        opacity,
                      }}>
                      <SharedElement
                        id={`item.${item.id}.image`}
                        style={{
                          width: '100%',
                          height: ITEM_SIZE * 1.2,
                          resizeMode: 'cover',
                          borderRadius: 24,
                          margin: 0,
                          marginBottom: 6,
                        }}>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                          }}
                          style={{
                            width: '100%',
                            height: ITEM_SIZE * 1.2,
                            resizeMode: 'cover',
                            borderRadius: 24,
                            margin: 0,
                            marginBottom: 6,
                          }}
                        />
                      </SharedElement>
                      <SharedElement id={`item.${item.title}.title`}>
                        <Text
                          key={item.title}
                          numberOfLines={1}
                          style={{
                            color: 'black',
                            fontSize: 18,
                            fontWeight: '800',
                          }}>
                          {item.title}
                        </Text>
                      </SharedElement>
                    </Animated.View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{marginTop: -80, paddingHorizontal: 12}}>
          <Text style={{color: 'white', fontSize: 23, fontWeight: '800'}}>
            Popular Videos
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A29',
    paddingTop: 54,
  },
  containerTop: {
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  amountRp: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
    left: 0,
    fontWeight: '800',
  },
  containerPlace: {
    width: 123,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#38354B',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  placeText: {
    fontSize: 16,
    color: 'white',
  },
  containerPlayingNow: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
