import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ajax from './src/components/ajax';
import DealList from './src/components/DealList';
import DealDetail from './src/components/DealDetail';
import SearchBar from './src/components/SearchBar';

class App extends React.Component {
  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
  }

  async componentDidMount(){
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
  }

  searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if(searchTerm) {
      dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm);
    this.setState({ dealsFromSearch });
  }
}

  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId
    })
  }

  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null
    })
  }

  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    )
  }

render(){
  if (this.state.currentDealId){
    return (
      <View style={styles.main}>
        <DealDetail initialDealData={this.currentDeal()} onBack={this.unsetCurrentDeal}/>
        </View>
    )
}
const dealsToDisplay = this.state.dealsFromSearch.length > 0
? this.state.dealsFromSearch
: this.state.deals;

  if (dealsToDisplay.length > 0){
    return ( 
    <View style={styles.main}>
      <SearchBar searchDeals={this.searchDeals} />
        <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
    </View>
    )
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
  },
  main: {
   marginTop: 50, 
  }
});

export default App;