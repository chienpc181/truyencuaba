'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import OverlayPanel from '@/components/OverlayPanel';
import { MdTranslate } from "react-icons/md";

function ParagraphWithTranslation_EN({ item }: { item: { en: string, vi: string } }) {
    const [overlayPosition, setOverlayPosition] = useState<{ top: number; left: number } | null>(null);
    const [overlayContent, setOverlayContent] = useState<string | null>(null);
    const buttonRef = useRef<(HTMLButtonElement | null)>();

    const setButtonRef = useCallback(() => (el: HTMLButtonElement | null) => {
        buttonRef.current = el;
    }, []);

    const showOverlayPanel = (item: { en: string, vi: string }) => {
        const buttonElement = buttonRef.current;
        if (buttonElement) {
            const paragraph = buttonElement.parentElement;
            if (paragraph) {
                const rect = paragraph.getBoundingClientRect();
                setOverlayPosition({
                    top: rect.bottom + window.scrollY + 8,
                    left: rect.left + window.scrollX,
                });
                setOverlayContent(item.vi);
            }
        }
    };
    const hideOverlayPanel = () => {
        setOverlayPosition(null);
        setOverlayContent(null);
    };
    return (
        <>
            <p>
                <span dangerouslySetInnerHTML={parseContentToHTML(item.en)} />
                <button
                    className="btn btn-translate float-right translate-x-2"
                    ref={setButtonRef()}
                    onClick={() => showOverlayPanel(item)}
                >
                    <MdTranslate />
                </button>
            </p>
            {overlayPosition && overlayContent && (
                <OverlayPanel position={overlayPosition} onClose={hideOverlayPanel}>
                    <p className='text-gray-800' dangerouslySetInnerHTML={parseContentToHTML(overlayContent)} />
                </OverlayPanel>
            )}
        </>
    )
}

const parseContentToHTML = (content: string) => {
    // Replace [text] with <strong>text</strong>
    const parsedContent = content.replace(/\[(.*?)\]/g, '<strong>$1</strong>');
    return { __html: parsedContent }; // Return an object with the key `__html` for dangerouslySetInnerHTML
};

function ParagraphWithTranslation_VI({ item }: { item: { en: string, vi: string } }) {
    const [overlayPosition, setOverlayPosition] = useState<{ top: number; left: number } | null>(null);
    const [overlayContent, setOverlayContent] = useState<string | null>(null);
    const buttonRef = useRef<(HTMLButtonElement | null)>();

    const setButtonRef = useCallback(() => (el: HTMLButtonElement | null) => {
        buttonRef.current = el;
    }, []);

    const showOverlayPanel = (item: { en: string, vi: string }) => {
        const buttonElement = buttonRef.current;
        if (buttonElement) {
            const paragraph = buttonElement.parentElement;
            if (paragraph) {
                const rect = paragraph.getBoundingClientRect();
                setOverlayPosition({
                    top: rect.bottom + window.scrollY + 8,
                    left: rect.left + window.scrollX,
                });
                setOverlayContent(item.en);
            }
        }
    };
    const hideOverlayPanel = () => {
        setOverlayPosition(null);
        setOverlayContent(null);
    };
    return (
        <>
            <p>
                <span dangerouslySetInnerHTML={parseContentToHTML(item.vi)} />
                <button
                    className="btn btn-translate float-right translate-x-2"
                    ref={setButtonRef()}
                    onClick={() => showOverlayPanel(item)}
                >
                    <MdTranslate />
                </button>
            </p>

            {overlayPosition && overlayContent && (
                <OverlayPanel position={overlayPosition} onClose={hideOverlayPanel}>
                    <p className='text-gray-800' dangerouslySetInnerHTML={parseContentToHTML(overlayContent)} />
                </OverlayPanel>
            )}
        </>

    )
}

export { ParagraphWithTranslation_EN, ParagraphWithTranslation_VI }