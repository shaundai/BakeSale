import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { priceDisplay} from '../util';

class DealItem extends React.Component {
    static propTypes = {
        deal: PropTypes.object.isRequired,
    }
    render(){
        const { deal } = this.props;
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemcontainer: {
        width: '100%',
        borderColor: 'black',
        marginBottom: 10,
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 5,
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
        marginBottom: 10,
    },
    price: {
        fontSize: 17,
    },
    cause: {
        fontSize: 17,
    },
})

export default DealItem;