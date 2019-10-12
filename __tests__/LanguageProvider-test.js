import {View, Text} from 'react-native'
import React from 'react';

import {mount} from 'enzyme';

import {LanguageProvider, TransText} from '../src/LanguageProvider';

// Pre-defined testing props
const name = "Joe"
const simpleDic = {
  "en-US" : "Hello !",
  "fr-FR" : "Salut !"
}
const varDic = {
  "en-US" : "Hello {name} !",
  "fr-FR" : "Salut {name} !"
}
const brokenDic = {
  "es-ES" : "Hola {name} !",
  "fr-FR" : "Salut {name} !"
}

/*
* Providing language different than default fallback language
* using transtex providing dictionary no values
*/
describe('LanguageProvider normal use', () => {
  it('Rendering with provided langu dic', () => {
    const wrapper = mount(
      <LanguageProvider language={"fr-FR"}>
        <View>
            <TransText dictionary = {simpleDic}/>
        </View>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Salut !");
  });
});

/*
* Providing language
* using TransText providing dictionary and values
*/
describe('LanguageProvider normal use', () => {
  it('Rendering with provided langu dic and values', () => {
    const wrapper = mount(
      <LanguageProvider language={"en-US"}>
        <View>
            <TransText dictionary = {varDic} values = {{"name":name}}/>
        </View>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Hello Joe !");
  });
});

/*
* Providing wrong language but good fallback Language
* using transtex providing dictionary no values
*/
describe('Providing wrong language but good fallback Language', () => {
  it('wrong language and no/wrong fallback language', () => {
    const wrapper = mount(
      <LanguageProvider language={"Ee-US"} defaultLanguage={"fr-FR"}>
        <View>
            <TransText dictionary = {simpleDic}/>
        </View>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Salut !");
  });
});

/*
* Providing wrong language and no/wrong fallback language
* using transtex providing dictionary no values
*/
describe('LanguageProvider normal use', () => {
  it('wrong language and no/wrong fallback language', () => {
    const wrapper = mount(
      <LanguageProvider language={"Ee-US"}>
        <View>
            <TransText dictionary = {simpleDic}/>
        </View>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Hello !");
  });
});

/*
* Providing wrong dictionary (language not found)
* using transtex providing dictionary no values
*/
describe('wrong dictionary (language not found)', () => {
  it('Rendering with provided langu dic and values', () => {
    const wrapper = mount(
      <LanguageProvider language={"en-US"}>
        <View>
            <TransText dictionary = {brokenDic}/>
        </View>
      </LanguageProvider>
    )
    expect(wrapper.find(TransText).children().find(Text).text()).toContain("Error");
  });
});

