import {View, Text} from 'react-native'
import React from 'react';

import {mount} from 'enzyme';

import {LanguageProvider, TransText} from '../src/LanguageProvider';

const name = "Joe"
const dic = {
  "en-US" : "Hello {name} !",
  "fr-FR" : "Salut {name} !"
}

// Using mount
describe('<LanguageProvider/>', () => {
  it('renders correctly, test using mount', () => {
    const wrapper = mount(
      <LanguageProvider language={"en-US"}>
        <View>
            <TransText dictionary = {dic} values = {{"name":name}}/>
        </View>
      </LanguageProvider>
    )

    expect(wrapper.contains(Text)).toBe(true);
  });
});