//Import Liberaries for creating a component
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, ListView, View } from 'react-native';
import axios from 'axios';
import Queries from './Queries';
import ProjectListDetail from './ProjectListDetail';

//Used these values in updateList or fetchMore funtion
var x = 0, y = 20;

//Create a component
class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.fetchMore = this.fetchMore.bind(this);

        this.state = {
            initialData: [],
            dataSource: [],
            allData: null,
            isLoading: true,
            isLoadingMore: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }
    //Fetch data from server
    async fetchData() {
        const res = await axios.get('http://starlord.hackerearth.com/kickstarter');
        this.AsyncStorage(res.data);
    }
    //Store fetched data into local storage
    async AsyncStorage(res) {
        await AsyncStorage.setItem('list', JSON.stringify(res));

        this.updateList();
    }
    //Get data from local storage and use it into this component
    async updateList() {
        let response = await AsyncStorage.getItem('list');
        let response2 = await JSON.parse(response) || [];

        const initialData = response2.slice(x, y);
        this.setState({ initialData, allData: response2 });
        this.viewList();
    }

    //Define ViewList component storage 
    viewList() {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({
            dataSource: ds.cloneWithRows(this.state.initialData),
            isLoading: false
        });
    }

    //Reusable function for updating the local storage data source
    updateDataSource(dataArray) {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.setState({ dataSource: ds.cloneWithRows(dataArray), isLoading: false });
    }

    //Load more daata from local storage alter initial array(initialData) end
    fetchMore() {
        const allData = this.state.allData;
        let initialData = this.state.initialData;
        //Finish fetch more data after the array lenght over
        if (initialData.length !== allData.length) {
            if (x == x && y == y) {
                x = x + 20;
                y = y + 20;
                initialData = initialData.concat(allData.slice(x, y));
                this.setState({ initialData });
                this.updateDataSource(this.state.initialData);
            };
        } else {
            this.setState({ isLoadingMore: false })
        }
    }

    //QUERIES == SEARCH, FILTER, SORT
    //Search query
    searchQuery(term) {
        let searchedList = this.state.initialData.filter(
            item => item.title.toUpperCase().indexOf(term.toUpperCase()) !== -1
        );
        //Update the projects state with new array so that comonent will rander with searched list
        this.updateDataSource(searchedList);
    }

    //Get user input from Queries Component then use these input for filtering on List
    filter(minNum, maxNum) {
        //Filter with spacific rang of Backers
        const filteredList = this.state.initialData.filter(
            item => (Number(minNum) < item['num.backers'] && Number(maxNum) > item['num.backers'])
        );
        //Update the projects state with new array so that comonent will rander with filters list
        this.updateDataSource(filteredList);
    }

    //Get user Input from Queries component then use that input for sorting the Projects list
    sort(input) {
        //Alphabet sorting
        if (input === 'ABC') {
            const sortListByAbt = this.state.initialData.sort((a, b) => {
                if (a.title < b.title)
                    return -1;
                if (a.title > b.title)
                    return 1;
                return 0;
            });
            this.updateDataSource(sortListByAbt);
        }//Time sorting
        else if (input === 'time') {
            const sortListByTime = this.state.initialData.sort((a, b) => {
                if (a['end.time'] < b['end.time'])
                    return -1;
                if (a['end.time'] > b['end.time'])
                    return 1;
                return 0;
            });
            this.updateDataSource(sortListByTime);
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" />
                </View>
            );
        } else {
            return (
                <View style={{ display: 'flex', flex: 1 }}>
                    <Queries search={this.searchQuery.bind(this)}
                        filter={this.filter.bind(this)}
                        sort={this.sort.bind(this)}
                    />
                    <ListView
                        initialListSize={20}
                        onEndReachedThreshold={10}
                        pageSize={20}
                        dataSource={this.state.dataSource}
                        renderRow={rowData => {
                            return (
                                <ProjectListDetail
                                    key={rowData['s.no']}
                                    project={rowData}
                                    screenProps={this.props}
                                />
                            );
                        }}
                        onEndReached={() => {
                            this.setState({ isLoadingMore: true }, () => this.fetchMore());
                        }}
                        renderFooter={() => {
                            return (
                                this.state.isLoadingMore &&
                                <View style={{ flex: 1, padding: 10 }}>
                                    <ActivityIndicator size="small" />
                                </View>
                            );
                        }}
                    />
                </View>
            );
        }
    }
}

export default ProjectList;