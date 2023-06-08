import {View, ImageBackground, Platform} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/color';

const Corousel = ({data}) => {
  const carouselRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(data);

  var platform = Platform.OS === 'android' ? true : false;

  const renderItem = ({item, index}) => {
    return (
      <View>
        <ImageBackground
          index={index}
          source={item.gambar}
          style={{
            width: platform ? wp('84%') : wp('88%'),
            height: hp('20%'),
          }}
          imageStyle={{borderRadius: 20}}
        />
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          containerStyle={{
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            paddingVertical: 5,
          }}
          dotStyle={{
            width: wp(2),
            height: hp(1),
            borderRadius: 5,
            backgroundColor: colors.blue,
            marginBottom: hp(1),
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeIndex === carouselItems.length - 1) {
        setActiveIndex(0);
        carouselRef.current.snapToItem(0);
      } else {
        setActiveIndex(activeIndex + 1);
        carouselRef.current.snapToNext();
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [activeIndex]);

  return (
    <View>
      <Carousel
        layout={'default'}
        data={carouselItems}
        ref={carouselRef}
        sliderWidth={350}
        itemWidth={330}
        renderItem={renderItem}
        onSnapToItem={index => setActiveIndex(index)}
      />
    </View>
  );
};

export default Corousel;
