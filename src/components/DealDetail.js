import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, PanResponder, Animated } from 'react-native';
import PropTypes from 'prop-types';
import ajax from './ajax'

import { priceDisplay } from '../util';

class DealDetail extends React.Component {
    imagePanResponder = PanResponder.create({
        onStateShouldSetPanRespondr: () => true,
        onPanResponderMove: (evt, gs) => {
            console.log('MOVING');
        },
        onPanResponderRelease: (evt, gs) => {
            console.log('RELEASED');
        },
    }
    );

    static propTypes = {
        deal: PropTypes.object,
        onBack: PropTypes.func.isRequired,
    }
    state = {
        deal: this.props.initialDealData,
        imageIndex: 0,
    };
    async componentDidMount(){
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
        this.setState({
            deal: fullDeal,
        })
    }
    render(){
        const { deal } = this.state;
        return (
            <View style={styles.itemcontainer}>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={styles.backlink}>Back</Text>
                </TouchableOpacity>
                <Image
                {...this.imagePanResponder.panHandlers}
                style={styles.image}
                source={{ uri: deal.media[this.state.imageIndex]}}
                />
            <View style={styles.textcontainer}>
                <Text style={styles.title}>{deal.title}</Text>
            <View style={styles.footer}>
                <Text style={styles.cause}>{deal.cause.name}</Text>
                <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
            </View>
            <View>
                <Text style={styles.description}>{deal.description}</Text>
            </View>
            </View>
            {deal.user && (<View style={styles.user}>
                <Image source={{ uri: deal.user.avatar}} style={styles.avatar}/>
                <Text>{deal.user.name}</Text>
            </View>)}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemcontainer: {
        width: '100%',
        marginBottom: 10,
    },
    
    title: {
        fontWeight: '700',
        fontSize: 20,
        padding: 10,
        marginBottom: 5,
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
    },
    backlink: {
        marginBottom: 5,
        marginRight: 15,
        color: '#22f',
        alignSelf: 'flex-end',
    },
    textcontainer: {
        alignSelf: 'center',
        paddingBottom: 5,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 30,
    },
    price: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    cause: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 15,
    },
    description: {
        margin: 10,
        padding: 10, 
    },
    user: {
        alignItems: 'center',
      },
})

export default DealDetail;