import React from 'react';

/**
 * Renders the Polarus application logo.
 * This component points to an image file located in the public root directory.
 */
export const PolarusLogo: React.FC<{ className?: string }> = ({ className = 'h-12 w-12' }) => (
    <img
        src="/polarus-logo.png" // Assumes you have a logo file named 'polarus-logo.svg' in the root.
        alt="Polarus Logo"
        className={className}
    />
);