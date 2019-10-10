import React, { useState, useEffect } from 'react';
import { Animated, Text} from 'react-native';
import PropTypes  from 'prop-types';

const TranslationContext = React.createContext();
const TranslationConsumer = TranslationContext.Consumer;

/*
Use the provided dictionary and values
to generate the transleted text
*/
translate = (language, dictionary, values) =>{
  // TODO : Improve checks
  if (dictionary == undefined) return "no dictionnary"
  if (dictionary[language] == undefined) return "unknown dictionnary"
  let text = dictionary[language]
  Object.keys(values).forEach(key => {
    text = text.replace(`{${key}}`,values[key])
  });
  return text;
}

/*
Language provider component
Provide context for translation
*/
const LanguageProvider = props => {

    let locale = props.language !== undefined ? props.language : props.defaultLanguage;

    const [language, updateLanguage] = useState(locale);

    return (
      <TranslationContext.Provider value={{language,updateLanguage}}>
        {props.children}
      </TranslationContext.Provider>
    );
}

/*
TransText component
Return a regular Text component with translated message thanks to the dictionnary
*/
const TransText = props => {

  let values = props.values != undefined ? props.values : {}
  return (
    <TranslationConsumer>
      {({ language }) => {
        let text = translate(language,props.dictionary,values)
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

  let values = props.values != undefined ? props.values : {}
  return (
    <TranslationConsumer>
      {({ language }) => {
        let text = translate(language,props.dictionary,values)
        return (<Animated.Text {...props}>{text}</Animated.Text>)
      }}
    </TranslationConsumer>
  )
};

/*
This function is called to get a translation needed outside a Text component in the render function
*/
const getTranslation = (dictionary, values = {}) => {

  let contextValue = TranslationContext._currentValue
  let language = contextValue != undefined ? contextValue.language : "en-US"
  //let language = "en-US"
  // console.log(LanguageContext._currentValue.language)
  let text = translate(language,dictionary,values)
  return text;
}

LanguageProvider.PropTypes = {
  language: PropTypes.string.isRequired,
  defaultLanguage: PropTypes.string
}
LanguageProvider.defaultProps = {
  language: "en-US",
  defaultLanguage: "en-US"
}

TransText.PropTypes = {
  dictionary: PropTypes.object.isRequired,
  values: PropTypes.string
}
TransText.defaultProps = {
  dictionary: {},
  values: {}
}


AnimatedTransText.PropTypes = {
  dictionary: PropTypes.object.isRequired,
  values: PropTypes.string
}
AnimatedTransText.defaultProps = {
  dictionary: {},
  values: {}
}


export {
  LanguageProvider,
  TranslationConsumer,
  TransText,
  AnimatedTransText,
  getTranslation
}