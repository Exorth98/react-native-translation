import { LanguageProvider, TransText, AnimatedTransText } from './LanguageProvider';
import React from 'react';

type Dictionary = Object | string

interface ILanguageProviderProps {
    defaultLanguage?: string;
    translations?: Object;
    language: string;
}

interface ITransTextProps {
    dictionary: Dictionary;
    values?: Object;
}

interface IAnimatedTransTextProps {
    dictionary: Dictionary;
    values?: Object;
}

export const LanguageProvider: React.SFC<ILanguageProviderProps>;
export const TransText: React.SFC<ITransTextProps>;
export const AnimatedTransText: React.SFC<IAnimatedTransTextProps>;

