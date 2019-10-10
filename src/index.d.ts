import { LanguageProvider, TransText, AnimatedTransText } from './LanguageProvider';
import React from 'react';

interface LanguageProviderProps {
    defaultLanguage?: string;
    language: string;
}

interface TransTextProps {
    dictionary: Object;
    values?: Object;
}

interface AnimatedTransTextProps {
    dictionary: Object;
    values?: Object;
}

export const LanguageProvider: React.SFC<LanguageProviderProps>;
export const TransText: React.SFC<TransTextProps>;
export const AnimatedTransText: React.SFC<AnimatedTransTextProps>;

