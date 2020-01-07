import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import ajax from './ajax'

import { priceDisplay} from '../util';

class DealDetail extends React.Component {
    static propTypes = {
        deal: PropTypes.object.isRequired,
    }
    state = {
        deal: this.props.initialDealData,
    };
    async componentDidMount(){
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
        this.setState({
            deal: fullDeal
        })
    }
    render(){
        const { deal } = this.state;
        return (
            <View style={styles.itemcontainer}>
                <Image style={styles.image} source={{ uri: deal.media[0] }} />
            <View style={styles.textcontainer}>
                <Text style={styles.title}>{deal.title}</Text>
            <View style={styles.footer}>
                <Text style={styles.cause}>{deal.cause.name}</Text>
                <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
            </View>
            </View>
            {deal.user && (<View style={styles.user}>
                <Image source={{ uri: deal.user.avatar}} style={styles.avatar}/>
                <Text>{deal.user.name}</Text>
            </View>)}
            <View>
                <Text style={styles.description}>{deal.description}</Text>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemcontainer: {
        width: '100%',
        borderColor: 'black',
        marginBottom: 10,
        marginTop: 60,
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
        padding: 10,
        marginBottom: 5,
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
    },
    textcontainer: {
        width: '90%',
        alignSelf: 'center',
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 5,
        backgroundColor: '#fff',
    },
    image: {
        width: '90%',
        height: 150,
        alignSelf: 'center',
        backgroundColor: '#ccc',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 10,
    },
    price: {
        fontSize: 17,
    },
    cause: {
        fontSize: 17,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    description: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderStyle: 'dotted',
        margin: 10,
        padding: 10, 
    },
    user: {
        alignItems: 'center',
      },
})

export default DealDetail;