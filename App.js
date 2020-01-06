import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ajax from './src/components/ajax';
import DealList from './src/components/DealList'

class App extends React.Component {
  state = {
    deals: [],
  }

  async componentDidMount(){
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
  }

render(){
  return (
    <View style={styles.container}>
      {
        this.state.deals.length > 0 ? (
        <DealList deals={this.state.deals} />
        ) : (
        <Text style={styles.header}>oh hay, you are super cool</Text>
        )
      }
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  }
});

export default App;