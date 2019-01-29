import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import fetchAPIs from '../../utils/fetchAPIs';
import capitalize from '../../utils/capitalize';

const styles = StyleSheet.create({
  dataLabel: {
    fontSize: 16,
    marginTop: 4,
  },
  dataValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default class PokemonDetail extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    showPokemonDetail: PropTypes.func.isRequired,
    showPokemonList: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      imageUrl: '',
      pokemonDetail: undefined,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchPokemonDetails();
  }

  componentDidUpdate(prevProps) {
    const { name: prevName } = prevProps;
    const { name: currName } = this.props;

    if (prevName !== currName) {
      this.setState({
        imageUrl: '',
        isLoading: true,
        pokemonDetail: undefined,
      }, this.fetchPokemonDetails);
    }
  }

  fetchPokemonDetails = () => {
    const { name } = this.props;

    fetchAPIs([
      `https://pokeapi.co/api/v2/pokemon/${name}`,
      `https://pokeapi.co/api/v2/pokemon-species/${name}`,
    ], ([data1, data2]) => {
      this.setState({
        imageUrl: data1.sprites.front_default,
        isLoading: false,
        pokemonDetail: data2,
      });
    });
  }

  renderDetailsList = () => {
    const { name, showPokemonDetail } = this.props;
    const {
      pokemonDetail: {
        id,
        evolves_from_species: evolvesFromSpecies,
      } = {},
    } = this.state;

    const data = [
      { label: 'ID', value: id },
      { label: 'Name', value: capitalize(name) },
      {
        label: 'Evolves From',
        value: evolvesFromSpecies ? capitalize(evolvesFromSpecies.name) : 'N/A',
        onPress: evolvesFromSpecies
          ? showPokemonDetail(evolvesFromSpecies.name)
          : null,
      },
    ];

    return (
      <View>
        {
          data.map(({ label, value, onPress }) => (
            <View
              key={label}
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.dataLabel}>{label}</Text>
              {
                onPress ? (
                  <TouchableOpacity onPress={onPress}>
                    <Text style={[styles.dataValue, { color: '#007AFF' }]}>{value}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.dataValue}>{value}</Text>
                )
              }
            </View>
          ))
        }
      </View>
    );
  }

  render() {
    const {
      showPokemonList,
    } = this.props;

    const {
      imageUrl,
      isLoading,
    } = this.state;

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Button
          onPress={showPokemonList}
          title="Back to List"
        />
        <ScrollView style={{ flex: 1 }}>
          {
            imageUrl && (
              <Image
                style={{ alignSelf: 'center', height: 200, width: 200 }}
                source={{ uri: imageUrl }}
              />
            )
          }
          {this.renderDetailsList()}
        </ScrollView>
      </View>
    );
  }
}
