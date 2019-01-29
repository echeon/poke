import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
} from 'react-native';

import PokemonListItem from './PokemonListItem';
import fetchAPI from '../../utils/fetchAPI';

export default class PokemonList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      api: 'https://pokeapi.co/api/v2/pokemon/',
      pokemons: [],
      isLoading: true,
      isLoadingMore: false,
    }
  }

  componentDidMount() {
    this.fetchPokemons();
  }

  fetchPokemons = () => {
    const { api } = this.state;

    fetchAPI(api, data => {
      const { pokemons } = this.state;
      const { next, results } = data;
  
      this.setState({
        api: next,
        isLoading: false,
        isLoadingMore: false,
        pokemons: pokemons.concat(results),
      });
    });
  }

  fetchMorePokemons = () => {
    if (!this.state.isLoadingMore) {
      this.setState({ isLoadingMore: true }, this.fetchPokemons)
    }
  }

  renderItem = ({ item }) => {
    const { onPressListItem } = this.props;

    return (
      <PokemonListItem
        onPress={onPressListItem(item.name)}
        pokemon={item}
      />
    )
  }

  renderItemSeparator = () => {
    return (
      <View style={{ height: 1, backgroundColor: 'royalblue' }} />
    );
  }

  renderHeaderComponent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Text style={{ padding: 10, textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>Pokemons</Text>
        {this.renderItemSeparator()}
      </View>
    )
  }

  renderFooterComponent = () => {
    const { isLoadingMore } = this.state;

    if (!isLoadingMore) {
      return null;
    }

    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator />
      </View>
    );
  }

  render() {
    const { pokemons, isLoading } = this.state;
    
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={pokemons}
          ItemSeparatorComponent={this.renderItemSeparator}
          keyExtractor={(item) => item.name}
          ListHeaderComponent={this.renderHeaderComponent}
          ListFooterComponent={this.renderFooterComponent}
          onEndReached={this.fetchMorePokemons}
          onEndReachedThreshold={0.5}
          renderItem={this.renderItem}
          stickyHeaderIndices={[0]}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}
