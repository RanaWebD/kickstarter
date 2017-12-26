import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
//Import components
import ProjectList from './src/components/ProjectList';
import ProjectDetails from './src/components/ProjectDetails';

//React Navigation
export default StackNavigator({
  //initial component
  Projects: {
    screen: ProjectList,
    navigationOptions: {
      title: 'Projects'
    }
  },
  ProjectDetails: {
    screen: ProjectDetails,
    navigationOptions: {
      title: 'ProjectDetails'
    }
  },
});
