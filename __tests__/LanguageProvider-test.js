/**
 * @format
 */

import 'react-native';
import {View} from 'react-native'
import React from 'react';
import { shallow } from 'enzyme';
import {LanguageProvider, TransText} from '../src/LanguageProvider';

// Note: this is just for use with Jest snapshot testing
// and comes packaged with react-native init project.
// You do not need this if using Enzyme 'toMatchSnapshot' etc.
import renderer from 'react-test-renderer';

// This test just uses Jest snapshot testing
/*it('renders correctly, test using Jest', () => {
  renderer.create(
    <LanguageProvider language={"en-US"}>
      <View>
          <TransText dictionary = {{"en-US" : "Hello {name} !","fr-FR" : "Salut {name} !"}} values = {{"name":"Joe"}}/>
      </View>
    </LanguageProvider>);
});*/


const name = "Joe"
const dic = {
  "en-US" : "Hello {name} !",
  "fr-FR" : "Salut {name} !"
}

// Using Jest + Enzyme
describe('<LanguageProvider/>', () => {
  it('renders correctly, test using Jest + Enzyme', () => {
    expect(shallow(
      <LanguageProvider language={"en-US"}>
        <View>
            <TransText dictionary = {dic} values = {{"name":name}}/>
        </View>
      </LanguageProvider>
    )).toMatchSnapshot();
  });
});
