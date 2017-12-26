import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//Import components
import Card from './common/Card';
import CardSection from './common/CardSection';

//Create a Component
const ProjectListDetail = ({ project, screenProps }) => {
    const { headingContainerStyle, contentContainerStyle, contentTitle, contentTitleDetail } = styles;
    const projectEndDate = project['end.time'].slice(0, 10);

    return (
        <TouchableOpacity
            //Naviage to Project Details page with the router paramete     
            onPress={() => screenProps.navigation.navigate('ProjectDetails',
                {
                    title: project.title,
                    desc: project.blurb,
                    by: project.by,
                    pledged: project['amt.pledged'],
                    backers: project['num.backers'],
                    EndDate: projectEndDate,
                    country: project.country,
                    location: project.location,
                    persantageFunded: project['percentage.funded']
                })
            }
        >
            <Card>
                <CardSection>
                    <Text style={headingContainerStyle} >{project.title}</Text>
                </CardSection>
                <CardSection>
                    <View style={contentContainerStyle}>
                        <View>
                            <Text style={contentTitle}>Pleadge</Text>
                            <Text style={contentTitleDetail}>{project['amt.pledged']}</Text>
                        </View>
                        <View>
                            <Text style={contentTitle}>Backers</Text>
                            <Text style={contentTitleDetail}>{project['num.backers']}</Text>
                        </View>
                        <View>
                            <Text style={contentTitle}>End Date</Text>
                            <Text style={contentTitleDetail}>
                                {
                                    projectEndDate
                                }
                            </Text>
                        </View>
                    </View>
                </CardSection>
            </Card>
        </TouchableOpacity>
    );
}

export default ProjectListDetail;

const styles = {
    headingContainerStyle: {
        fontFamily: 'georgia',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 12,
        color: 'white'
    },
    contentContainerStyle: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: 90 + '%',
        paddingTop: 7,
        paddingBottom: 7
    },
    contentTitle: {
        fontSize: 13,
        color: 'lightgray',
        fontFamily: 'verdana'
    },
    contentTitleDetail: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white'
    }
};