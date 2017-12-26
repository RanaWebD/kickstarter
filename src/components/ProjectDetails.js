//import Liberaries `for creating a component
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//Create a Component
class ProjectDetails extends Component {
    render() {
        const { heading, projectDescription, projectArtist, projectDetail, projectDetailText } = styles;
        //take project details from params variables
        const { params } = this.props.navigation.state;
        return (
            <ScrollView >
                <LinearGradient colors={['#ffffff', '#ffffff']} style={{ paddingBottom: 100 }}>
                    <LinearGradient colors={['#214d77', '#214d77']}>
                        <Text style={heading}>{params.title}</Text>
                    </LinearGradient>

                    <LinearGradient colors={['#c3ad46', '#c3ad46']}>
                        <Text style={projectDescription}>{params.desc}</Text>
                    </LinearGradient>

                    <View style={projectArtist}>
                        <Text >by: {params.by}</Text>
                    </View>
                    <View style={projectDetail}>
                        <Text style={projectDetailText}>Pledge:</Text>
                        <Text style={projectDetailText}>{params.pledged}</Text>
                    </View>
                    <View style={projectDetail}>
                        <Text style={projectDetailText}>Backers:</Text>
                        <Text style={projectDetailText}>{params.backers}</Text>
                    </View>
                    <View style={projectDetail}>
                        <Text style={projectDetailText}>No. of days to go:</Text>
                        <Text style={projectDetailText}>{params.EndDate}</Text>
                    </View>
                    <View style={projectDetail}>
                        <Text style={projectDetailText}>Country:</Text>
                        <Text style={projectDetailText}>{params.country}</Text>
                    </View>
                    <View style={projectDetail}>
                        <Text style={projectDetailText}>Location:</Text>
                        <Text style={projectDetailText}>{params.location}</Text>
                    </View>
                    <View style={projectDetail}>
                        <Text style={projectDetailText}>Persantage Funded:</Text>
                        <Text style={projectDetailText}>{params.persantageFunded}</Text>
                    </View>
                </LinearGradient>
            </ScrollView>
        );
    }
}

//Export Component
export default ProjectDetails;

const styles = {
    heading: {
        fontFamily: 'georgia',
        fontSize: 30,
        fontWeight: 'bold',
        padding: 15,
        color: '#ffffff'
    },
    projectDescription: {
        fontFamily: 'georgia',
        fontSize: 16,
        padding: 8,
        color: 'white'
    },
    projectArtist: {
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    projectDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100 + '%',
        padding: 10
    },
    projectDetailText: {
        fontSize: 16,
        fontFamily: "georgia"
    }
};