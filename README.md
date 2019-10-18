[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.com/Exorth98/react-native-translation.svg?branch=master)](https://travis-ci.com/Exorth98/react-native-translation)     [![Coverage Status](https://coveralls.io/repos/github/Exorth98/react-native-translation/badge.svg?branch=master)](https://coveralls.io/github/Exorth98/react-native-translation?branch=master)


# react-native-translation

## Overview
This package provides you an easy and flexible solution for implementing a translation system in react-native apps, using the React Context API.


Comming Features :
- Handling the device locale automaticaly.
- Possibility to use one translation object for each language.
- JSON format support for translation files.
- ...

## Installation

Use the package manager npm to run the install command :

```bash
npm install react-native-translation
```

## Dependencies

This package is using some recent React features such as Hooks.
So you need to have at least React version 16.8.0 installed.

You may also require dependencies to get the device locale (See section Usage - 1).

## Usage

### 1 - Setup the language

The first thing you need is the language in wich you want you app to run in.<br>
There is two main ways to do that :

- Get it from user preferences (from database or storage)
- Get the device locale (from device settings)

You will might deal with both if you want the user to chose the language, but also use the device language as default.

Getting the device locale can be done easily depending on your project :
- For **Expo project**, you can use ``` Localization.getLocale()``` from [expo-localization](https://docs.expo.io/versions/latest/sdk/localization/)
- For other react native apps, a lot of packages exist to get this value.<br>[react-native-localize](https://github.com/react-native-community/react-native-localize),  [react-native-locale](https://github.com/fixd/react-native-locale), [react-native-device-info](https://github.com/react-native-community/react-native-device-info),  and more ...



### 2 - Setup the LanguageProvider

In order to have the selected language available anywhere on the app, you have to wrap your app in a ```<LanguageProvider>``` component.

```javascript
import React from 'react';
import Root from './Root';

// For this exemple I'm getting the device locale with expo-localization
import * as Localization from 'expo-localization';

import {LanguageProvider} from 'react-native-translation'
const locale = Localization.locale

export default class App extends React.Component {
  render() {
    return (
      <LanguageProvider language={locale}>
        <Root/>
      </LanguageProvider>
    );
  }
}
```

### 3 - Translating Text components

This package provides a new ```<Text>``` component named ```<TransText>```.
When providing a `dictonary` prop to this component, it will automaticaly render the text in the right language.

The dictionary must be an object with locale codes (string) in keys and the corresponding text in value.

```javascript
// Import component
import {TransText} from 'react-native-translation'

...

// Initialize dictionary
const message = {
  "en-US" : "Hello !",
  "fr-FR" : "Salut !",
}

...

// In the render method
<TransText style = {styles.text} dictionary = {message}/>
```
> If you want to translate an `<Animated.Text>` you can use `<AnimatedTransText>` the same way.

> The dictionary can be imported from a seperate file with a general tranlation object.

### 4 - Translating other texts

Most of the time you will also need to translate texts outside of ```<Text>``` components (ie : input placeholder, button title, or any prop or object using text that need to be translated).

The ```getTranslation()``` function is the solution for that.

You can call this function wherever you want inside the provider with a dictionary as parameter (just like for ```<TransText>```), and it will return a string containing the text in the right language.

```javascript
// Import function
import {getTranslation} from 'react-native-translation'

...

// Initialize dictionary and text
const message = {
  "en-US" : "Press Me",
  "fr-FR" : "Appuyer ici",
}

const buttonTitle = getTranslation(message)
...

// In the render method
<Button title = {buttonTitle} onPress = {()=>{}}/>
```

## Advanced Usage

### 1 - Passing variables to dictionaries

You might have texts wich contain variables, for exemple: "Hello Joe, Welcome back !", where "Joe" would be a variable depending on the user.<br>
The solution for that is passing a `value` object with the dictionary.
The translation text must contain the variables you want to inject between braces.

```javascript
// Import component
import {TransText} from 'react-native-translation'

...

// Initialize dictionary
const message = {
  "en-US" : "Hello {name}, Welcome back !",
  "fr-FR" : "Salut {name}, ravi de vous revoir !",
}
// Here I initialize the name variable just for the exemple
const name = "Joe"

...

// In the render method
<TransText style = {styles.text} dictionary = {message} values = {"name":name}/>

```

### 2 - Using a unique translation object

In the previous exemples I declared the dictionaries objects localy in the file where I need the translation. But the most convenient for intermediate and big apps is to use a unique translation object in a single file.
A dark side of that is that you'll need to import your translation object on each file that use it.
Here is the solution :
1. Add the translation object as `translations` prop to the `<LanguageProvider>`.
```javascript

//Importing your translations file
import AllTranslations from './Translations'
import { LanguageProvider } from 'react-native-translations'

...

<LanguageProvider language = {locale} translations = {AllTranslations}>
  <Root/>
</LanguageProvider>

```
2. When you need to refer a dictionary contained in your translation file, just give a string path.

```javascript
import { TransText } from 'react-native-translations'

...

// This also works with the getTranslation method
const preTranslatedText = getTranslation("home.welcomeMessage")

...

<TransText style = {styles.text} dictionary = {"home.welcomeMessage"}/>

```

> If your using this tip, note that at any moment if you want to use a dictionary located in another file, you can still use it after importing.


### 3 - TranslationConsumer : Changing the language in app

If you want to provide to the user the ability to change the language, you need to wrap the component you're using in a `<TranslationConsumer>`.
The consumer component gives you access to the `updateLanguage()` function.

Exemple using a button :

```javascript
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import  {TransText, TranslationConsumer } from 'react-native-translation';

export default class MyView extends React.Component {
  render() {

    const button: {
      "en-US" : "Hello !",
      "fr-FR" : "Salut !",
    }

    return (
        <View style = {styles.container}>
          
          {/*
          Display "Hello !" before pressing button
          and "Salut !" after pressing the button
          */}
          <TransText style = {styles.text} dictionary={dic.message}/>

          <TranslationConsumer>
            {({ language, updateLanguage }) => {
              return(<Button title={"Change Language"} onPress={() = {updateLanguage("fr-FR")}}/>)
            }}
          </TranslationConsumer>

          <Button title={getTranslation(dic.button)} onPress={()=>{alert()}}/>
        </View>
    );
  }
}
```

### 5 - TranslationConsumer : Customize whatever you want

In the previous section, I showed you an exemple of the `<TranslationConsumer>` use.<br>
But the fact is you can use this component wherever you want inside the provider, and it will give you access no only to the `updateLanguage()` function, but also to the `language` variable that represents the current app language.<br>
If you have the language you can get a translation with the `getTranslationWithLang(language, dictionary, ?values)`.

Based on that, you can create auto translated component like `<TransText>` by yourself (for exemple: TransButton, TransInput, or whatever you want).


## Components and functions detail

### LanguageProvider component

Prop  | Type | Required | Description | Default value 
------|------|----------|-------------|--------------
language  | string | Yes | The selectioned language | defaultLanguage
defaultLanguage  | string | No | Fallback language | "en-US"
translations  | object | No | Default dictionaries object | null

> Create an Translation context in the provided language

### TransText component

Prop  | Type | Required | Description | Default value
------|------|----------|-------------|--------------
dictionary  | string for searching in the default translations object, or directly an object | Yes | The object or path to object containing translations | null
values  | object { string : any } | No | Variables to inject in the text | { }
> It can also take any prop a `<Text>` component can take.

> This tab is also available for `<AnimatedTransText>`

> Renders a `<Text>` with the translated text.

### getTranslation function

Parameter  | Type | Required | Description
-----------|------|----------|------------
dictionary  | string for searching in the default translations object, or directly an object | Yes | The object or path to object containing translations
values  | object { string : any } | No | Variables to inject in the text

> Returns the text translated in the right language.

### getTranslationWithLang function

Parameter  | Type | Required | Description
-----------|------|----------|------------
language  | string | Yes | The language for the translation
dictionary  | string for searching in the default translations object, or directly an object | Yes | The object or path to object containing translations
values  | object { string : any } | No | Variables to inject in the text

> Returns the text translated in the provided language.

## Contribution
Since this project is open-source, pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)