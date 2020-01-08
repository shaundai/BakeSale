import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import DealItem from './DealItem'

class DealList extends React.Component {
    static propTypes = {
        deals: PropTypes.array.isRequired,
        onItemPress: PropTypes.func.isRequired,
    };

    render(){
        return (
        <View style={styles.list}>
            <FlatList
            data={this.props.deals}
            renderItem={({ item }) => <DealItem deal={item} onPress={this.props.onItemPress} />}
            keyExtractor={item => item.key}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        width: '100%',
    }
})
export default DealList;