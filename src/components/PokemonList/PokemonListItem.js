import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

export default class PokemonListItem extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    pokemon: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      onPress,
      pokemon,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ padding: 15 }}
      >
        <Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>{pokemon.name}</Text>
      </TouchableOpacity>
    );
  }
}
