/* -------------------------------------------------------------------------- */
/*                       Componente HomeStackNavigation                       */
/* -------------------------------------------------------------------------- */
// Este componente contiene la navegación de tipo Stack de todas las pantallas del feed general.

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import HomeFeed from '../../Home';
import Profile from '../../Profile';
import Followers from '../../Followers';
import NewTweet from '../../NewTweet';
import MySavedTweets from '../../MySavedTweets';
import NewComment from '../../NewComment';
import TweetFullScreen from '../../TweetFullScreen';
import UserLikeList from '../../UsersLikeList';
import UsersRetweetList from '../../UsersRetweetList';



const Stack = createStackNavigator();

export default function HomeStack({navigation,route}) {
  if(route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  };
  return (
      <Stack.Navigator screenOptions={{ headerBackTitleVisible:false,
        headerShown: true ,
        headerMode: 'screen'}} initialRouteName="HomeFeed">
        <Stack.Screen 
            name="HomeFeed" 
            options={{ title: (<MaterialCommunityIcons name="twitter" color={'#00ACEE'} size={38}/>), headerTitleAlign:'center'}} 
            component={HomeFeed} />
        <Stack.Screen 
            name="Profile" 
            options={{ title: (<MaterialCommunityIcons name="twitter" color={'#00ACEE'} size={38}/>), headerTitleAlign:'center'}} 
            component={Profile} />
        <Stack.Screen 
            name="Followers" 
            options={{ title: (<MaterialCommunityIcons name="twitter" color={'#00ACEE'} size={38}/>), headerTitleAlign:'center'}} 
            component={Followers} />
        <Stack.Screen 
            name="NewTweet" 
            options={{ title: (<MaterialCommunityIcons name="twitter" color={'#00ACEE'} size={38}/>), headerTitleAlign:'center'}} 
            component={NewTweet} />
        <Stack.Screen 
            name="SavedTweets" 
            options={{ title:'Elementos guardados', headerTitleAlign:'center'}} 
            component={MySavedTweets} />
        <Stack.Screen 
            name="TweetFullScreen" 
            options={{ title:'Tweet', headerTitleAlign:'center'}} 
            component={TweetFullScreen} />
        <Stack.Screen 
            name="NewComment" 
            options={{ title: (<MaterialCommunityIcons name="twitter" color={'#00ACEE'} size={38}/>), headerTitleAlign:'center'}} 
            component={NewComment} />
        <Stack.Screen 
            name="UserRetweetList" 
            options={{ title:'Retweets', headerTitleAlign:'center'}} 
            component={UsersRetweetList} />
        <Stack.Screen 
            name="UserLikeList" 
            options={{ title:'Marcados como Me Gusta por', headerTitleAlign:'center'}} 
            component={UserLikeList} />

        
        
      </Stack.Navigator>
   
  );
}