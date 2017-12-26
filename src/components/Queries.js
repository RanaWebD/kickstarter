import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Text, View, TouchableOpacity, Picker, Button } from 'react-native';
import Modal from 'react-native-modal';

class Queries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFilterModalVisible: false,
            isSortModalVisible: false,
            sortInput: '',
            minFilterInput: '',
            maxFilterInput: ''
        }
    }

    _showFilterModal = () => this.setState({ isFilterModalVisible: true });
    _showSortModal = () => this.setState({ isSortModalVisible: true });

    minFilterValue = (value) => {
        this.setState({ minFilterInput: value });
    }
    maxFilterValue = (value) => {
        this.setState({ maxFilterInput: value });
    }
    //Store the min or max filter value into two variables and send these values into Projec Details Component with 
    //the help of function parameters
    handleFilterSubmit = () => {
        const minInput = this.state.minFilterInput;
        const maxInput = this.state.maxFilterInput;
        if (minInput == "" && maxInput == "") {
            this.setState({ isFilterModalVisible: false });
        } else {
            this.props.filter(minInput, maxInput);
            this.setState({ isFilterModalVisible: false });
        }
    }
    //Send the sort input into Prject Details component with the help of function parameters
    handleSortSubmit = () => {
        const sortInput = this.state.sortInput;
        if (sortInput == "") {
            this.setState({ isSortModalVisible: false });
        } else {
            this.props.sort(sortInput);
            this.setState({ isSortModalVisible: false });
        }
    }

    render() {
        const { iconsContainer, iconDiv, search } = styles;
        return (
            <View style={iconsContainer}>
                <TextInput
                    style={search}
                    placeholder='search'
                    onChangeText={(input) => { this.props.search(input) }}
                />
                <TouchableOpacity style={iconDiv} onPress={this._showFilterModal}>
                    <Icon name="filter" size={40} color="#c3ad46" />
                </TouchableOpacity >
                {/* Filter Modal */}
                <Modal isVisible={this.state.isFilterModalVisible}>
                    <Picker style={{ backgroundColor: 'white' }} selectedValue={this.state.minFilterInput}
                        onValueChange={(value, itemIndex) => { this.minFilterValue(value) }}>
                        <Picker.Item label="min-value" value="min-value" />
                        <Picker.Item label="0" value="0" />
                        <Picker.Item label="50000" value="50000" />
                        <Picker.Item label="100000" value="100000" />
                        <Picker.Item label="150000" value="150000" />
                        <Picker.Item label="200000" value="200000" />
                    </Picker>
                    <Picker style={{ backgroundColor: 'white' }} selectedValue={this.state.maxFilterInput}
                        onValueChange={(value, itemIndex) => { this.maxFilterValue(value) }}>
                        <Picker.Item label="max-value" value="max-value" />
                        <Picker.Item label="50000" value="50000" />
                        <Picker.Item label="100000" value="100000" />
                        <Picker.Item label="150000" value="150000" />
                        <Picker.Item label="200000" value="200000" />
                        <Picker.Item label="250000" value="250000" />
                    </Picker>
                    <Button style={iconDiv} onPress={this.handleFilterSubmit} title="Submit" color="#c3ad46" />
                </Modal>

                <TouchableOpacity style={iconDiv} onPress={this._showSortModal}>
                    <Icon name="sort" size={40} color="#c3ad46" />
                </TouchableOpacity>
                {/* Sort Modal */}
                <Modal isVisible={this.state.isSortModalVisible}>
                    <Picker style={{ backgroundColor: 'white' }} selectedValue={this.state.sortInput}
                        onValueChange={(value, itemIndex) => { this.setState({ sortInput: value }) }}>
                        <Picker.Item label="Sort by(default)" value='sortBy' />
                        <Picker.Item label="ABC" value="ABC" />
                        <Picker.Item label="Time" value="time" />
                    </Picker>
                    <Button style={iconDiv} onPress={this.handleSortSubmit} title="Submit" color="#c3ad46" />
                </Modal>
            </View>
        )
    }
}

export default Queries;

const styles = {
    iconsContainer: {
        flexDirection: 'row'
    },
    iconDiv: {
        padding: 8,
        marginRight: 5
    },
    search: {
        flex: 1,
        margin: 8,
        paddingLeft: 20,
        paddingTop: 8
    }
}