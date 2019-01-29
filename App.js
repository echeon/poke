import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import PokemonList from './src/components/PokemonList';
import PokemonDetail from './src/components/PokemonDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

const views = {
  POKEMON_DETAIL: 'POKEMON_DETAIL',
  POKEMON_LIST: 'POKEMON_LIST',
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: views.POKEMON_LIST,
      selectedPokemonName: null,
    };
  }

  showPokemonList = () => {
    this.setState({
      currentView: views.POKEMON_LIST,
      selectedPokemonName: null,
    });
  }

  showPokemonDetail = pokemonName => () => {
    this.setState({
      currentView: views.POKEMON_DETAIL,
      selectedPokemonName: pokemonName,
    });
  }

  render() {
    const {
      selectedPokemonName,
      currentView,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {
          currentView === views.POKEMON_LIST
            ? (
              <PokemonList
                onPressListItem={this.showPokemonDetail}
              />
            )
            : (
              <PokemonDetail
                name={selectedPokemonName}
                showPokemonList={this.showPokemonList}
                showPokemonDetail={this.showPokemonDetail}
              />
            )
        }
      </SafeAreaView>
    );
  }
}
