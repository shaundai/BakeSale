import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ajax from './src/components/ajax';
import DealList from './src/components/DealList';
import DealDetail from './src/components/DealDetail';

class App extends React.Component {
  state = {
    deals: [],
    currentDealId: null,
  }

  async componentDidMount(){
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
  }
  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId
    })
  }

  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    )
  }

render(){
  if (this.state.currentDealId){
    return <DealDetail initialDealData={this.currentDeal()}/>
  }
  if (this.state.deals.length > 0){
    return  <DealList deals={this.state.deals} onItemPress={this.setCurrentDeal} />
  }
  return (
    <View style={styles.container}>
        <Text style={styles.header}>oh hay, you are super cool</Text>
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