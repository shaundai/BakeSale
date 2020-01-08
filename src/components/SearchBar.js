import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

class SearchBar extends React.Component {
    state = {
        searchTerm: '',
    }

    handleChange = (searchTerm) => {
        this.setState({ searchTerm });
    }

    render(){
        return (
        <TextInput 
        placeholder="Search All Deals"
        style={styles.input}
        onChangeText={this.handleChange}>
            </TextInput>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: '90%',
        marginHorizontal: 12,
    },
})

export default SearchBar;