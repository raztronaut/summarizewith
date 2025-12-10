import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'summarize-with-ai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                theme?: string;
                compact?: boolean;
                services?: string;
                class?: string;
            }, HTMLElement>;
        }
    }
}
