import React from 'react';
import {View} from 'react-native';
import {LanguageProvider, TransText} from '../src/LanguageProvider';

import renderer from 'react-test-renderer';

test('renders correctly with language and value', () => {


  const translation = renderer.create(
        <LanguageProvider language={"en-US"}>
            <View>
                <TransText dictionary = {{"en-US" : "Hello {name} !","fr-FR" : "Salut {name} !"}} values = {{"name":"Joe"}}/>
            </View>
        </LanguageProvider>
    
    ).toJSON();
  expect(tree).toMatchSnapshot();
});