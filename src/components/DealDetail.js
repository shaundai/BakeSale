import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, PanResponder, Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import ajax from './ajax'

import { priceDisplay } from '../util';

class DealDetail extends React.Component {
    imageXPos = new Animated.Value(0);
    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
            this.imageXPos.setValue(gs.dx);
        },
        onPanResponderRelease: (evt, gs) => {
            this.width = Dimensions.get('window').width;
            if(Math.abs(gs.dx) > this.width * 0.4){
                const direction = Math.sign(gs.dx);
                Animated.timing(this.imageXPos, {
                    toValue: direction * this.width,
                    duration: 250,
                }).start(() => this.handleSwipe(-1 * direction));
            } else {
                Animated.spring(this.imageXPos, {
                    toValue: 0,
                }).start();
            }
        },
    }
    );

    handleSwipe = (indexDirection) => {
        if(!this.state.deal.media[this.state.imageIndex + indexDirection]){
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
            return;
        }
        this.setState((prevState) => ({
            imageIndex: prevState.imageIndex + indexDirection
        }), () => {
            this.imageXPos.setValue(indexDirection * this.width);
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
        }
        )
    }

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
                <Animated.Image
                {...this.imagePanResponder.panHandlers}
                style={[{ left: this.imageXPos }, styles.image]}
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
        textAlign: 'center',
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
        width: '100%',
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