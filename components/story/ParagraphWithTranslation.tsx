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
                {item.en}
                <button
                    className="btn btn-translate"
                    ref={setButtonRef()}
                    onClick={() => showOverlayPanel(item)}
                >
                    <MdTranslate />
                </button>
            </p>
            {overlayPosition && overlayContent && (
                <OverlayPanel position={overlayPosition} onClose={hideOverlayPanel}>
                    <p style={{color: 'dimgray'}}>{overlayContent}</p>
                </OverlayPanel>
            )}
        </>

    )
}

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
                {item.vi}
                <button
                    className="btn btn-translate"
                    ref={setButtonRef()}
                    onClick={() => showOverlayPanel(item)}
                >
                    <MdTranslate />
                </button>
            </p>
            {overlayPosition && overlayContent && (
                <OverlayPanel position={overlayPosition} onClose={hideOverlayPanel}>
                    <p style={{color: 'dimgray'}}>{overlayContent}</p>
                </OverlayPanel>
            )}
        </>

    )
}

export {ParagraphWithTranslation_EN, ParagraphWithTranslation_VI}