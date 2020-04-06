import React, { useState } from 'react';
import { Animated, Text} from 'react-native';
import propTypes  from 'prop-types';

import { Translator } from './helpers/translator';

const TranslationContext = React.createContext();
const TranslationConsumer = TranslationContext.Consumer;

let translator = null;

/*
Language provider component
Provide context for translation
*/
const LanguageProvider = props => {

    translator = new Translator(props.translations, props.defaultLanguage);

    const [language, updateLanguage] = useState(props.language);

    return (
      <TranslationContext.Provider value={{language, updateLanguage}}>
        {props.children}
      </TranslationContext.Provider>
    );
};

/*
TransText component
Return a regular Text component with translated message thanks to the dictionnary
*/
const TransText = props => {
  return (
    <TranslationConsumer>
      {({ language }) => {
        let text = translator.translate(language, props.dictionary, props.values)
        return (<Text {...props}>{text}</Text>)
      }}
    </TranslationConsumer>
  )
};

/*
AnimatedTransText component
Works like Transtext, but can handle the proporties for animated text
*/
const AnimatedTransText = props => {
  return (
    <TranslationConsumer>
      {({ language }) => {
        let text = translator.translate(language, props.dictionary, props.values)
        return (<Animated.Text {...props}>{text}</Animated.Text>)
      }}
    </TranslationConsumer>
  )
};

/*
  Functions using context object
*/
const getTranslation = (dictionary, values = {}) => {

  let contextValue = TranslationContext._currentValue;
  let language = contextValue != undefined ? contextValue.language : translator.defaultLanguage;
  let text = translator.translate(language, dictionary,values);
  //let text = translate(contextValue.language, dictionary,values)
  return text;
};
const getTranslationWithLang = (language, dictionary, values = {}) => {
  let contextValue = TranslationContext._currentValue;
  return translator.translate(language, dictionary, values);
};

const getRedirection = dictionary => {
  let contextValue = TranslationContext._currentValue;
  let language = contextValue != undefined ? contextValue.language : translator.defaultLanguage;
  let rep = translator.redirect(language, dictionary);
  return rep;
};
const getRedirectionWithLang = (language,dictionary) => {
  return translator.redirect(language, dictionary);
};

const setLanguage = language => {

  let contextValue = TranslationContext._currentValue;
  let updateFunc = contextValue != undefined ? contextValue.updateLanguage : ()=>{};
  updateFunc(language);
};
const getLanguage = () => {

  let contextValue = TranslationContext._currentValue;
  let language = contextValue != undefined ? contextValue.language : "en-US";
  return language;
};



LanguageProvider.propTypes = {
  language: propTypes.string.isRequired,
  defaultLanguage: propTypes.string,
  translations: propTypes.object
};
LanguageProvider.defaultProps = {
  language: "en-US",
  defaultLanguage: "en-US",
  translations: null,
};

TransText.propTypes = {
  dictionary: propTypes.oneOfType([propTypes.object,propTypes.string]).isRequired,
  values: propTypes.object
};
TransText.defaultProps = {
  dictionary: {},
  values: {}
};


AnimatedTransText.propTypes = {
  dictionary: propTypes.oneOfType([propTypes.object,propTypes.string]).isRequired,
  values: propTypes.object
};
AnimatedTransText.defaultProps = {
  dictionary: {},
  values: {}
};


export {
  TranslationContext,
  LanguageProvider,
  TranslationConsumer,
  TransText,
  getRedirection,
  AnimatedTransText,
  getTranslation,
  getTranslationWithLang,
  setLanguage,
  getLanguage,
  getRedirectionWithLang
};