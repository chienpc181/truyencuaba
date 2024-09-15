import React from 'react';
import {ParagraphWithTranslation_EN, ParagraphWithTranslation_VI} from './ParagraphWithTranslation';

type Item = {
  en: string;
  vi: string;
};

type SectionProps = {
  title: string;
  items: Item[];
  type?: 'paragraph' | 'list';
};

function SectionWithTranslation_EN({ title, items, type }: SectionProps) {
  return (
    <section >
      <h2 >{title}</h2>
      {type === 'list' ? (
        <ul >
          {items.map((item, index) => (
            <li key={index}>
              <ParagraphWithTranslation_EN item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div>
          {items.map((item, index) => (
            <ParagraphWithTranslation_EN item={item} key={index} />
          ))}
        </div>
      )}
    </section>
  );
}

function SectionWithTranslation_VI({ title, items, type }: SectionProps) {
  return (
    <section >
      <h2 >{title}</h2>
      {type === 'list' ? (
        <ul >
          {items.map((item, index) => (
            <li key={index}>
              <ParagraphWithTranslation_VI item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div>
          {items.map((item, index) => (
            <ParagraphWithTranslation_VI item={item} key={index} />
          ))}
        </div>
      )}
    </section>
  );
}

export {SectionWithTranslation_EN, SectionWithTranslation_VI}