import React, { useState } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import { styles } from '../../utils'

export default function Masonry(props: any) {
  const HEIGHT = Dimensions.get('window').height;
  const { data } = props;

  const [pageSize, setPageSize] = useState(50);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);


  const generateData = () => {
    console.log('');
    return data;
  }


  const handleScroll = (e: any) => {
    const { y } = e.nativeEvent.contentOffset;
    const height = scrollViewHeight;
    const lastScreenOffset = height - HEIGHT * 3;
    if (y >= lastScreenOffset) {
      generateData();
    }
  }

  const logScrollViewSize = (width: number, height: number) => {
    setScrollViewHeight(height);
  }


  return (
    <ScrollView>
      <View style={styles.masonryContainer}>
        <View>
          {
            data.length > 0 ?
              data.slice(0, data.length / 2).map((ele: any, index: number) => {
                return props.renderItem(ele, index)
              }) : (<></>)
          }
        </View>
        <View>
          {
            data.length > 0 ?
              data.slice(data.length / 2, data.length).map((ele: any, index: number) => {
                return props.renderItem(ele, index)
              }) : (<></>)
          }
        </View>
      </View>
    </ScrollView>
  )
}
