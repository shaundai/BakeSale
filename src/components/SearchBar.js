import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
    }

    state = {
        searchTerm: '',
    }

    debouncedSearchDeals = debounce(this.props.searchDeals, 300);

    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debouncedSearchDeals(this.state.searchTerm);
        });
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