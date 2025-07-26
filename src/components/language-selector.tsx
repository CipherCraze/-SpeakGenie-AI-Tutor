import React, { useState } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../lib/speech';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  className?: string;
}

export default function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange, 
  className = "" 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const handleLanguageSelect = (language: SupportedLanguage) => {
    onLanguageChange(language.code);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Language Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Languages className="h-4 w-4 text-gray-600" />
        <span className="text-lg">{selectedLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-700">
          {selectedLanguage.name}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 mb-2 px-2">
              Select Voice Language
            </div>
            {SUPPORTED_LANGUAGES.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${
                  currentLanguage === language.code ? 'bg-blue-50 border border-blue-200' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-800">
                    {language.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    AI responses will be spoken in this language
                  </div>
                </div>
                {currentLanguage === language.code && (
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Info Section */}
          <div className="border-t border-gray-100 p-3">
            <div className="text-xs text-gray-500">
              <div className="font-medium mb-1">How it works:</div>
              <div>• You speak in English</div>
              <div>• Genie responds in your selected language</div>
              <div>• Practice understanding both languages!</div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
