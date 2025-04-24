// The DiffLine component displays a single line of difference between two texts,
// with information on whether the line was added, removed, or unchanged. 
// It shows the line number, a marker indicating whether it's an addition (+), removal (-), 
// or no change (space), and the content of the line with specific styling for added or removed parts.


import React from 'react';
import { Table } from "@chakra-ui/react";
import { DiffType } from '../../model/diff-fn/char-diff/constants';

export const DiffLine = ({ lineNumber, type, value }) => {
    // Checks if the line is marked as 'added' or 'removed' based on the diff type
    const isAdded = type === DiffType.ADDED;
    const isRemoved = type === DiffType.REMOVED;


    // Renders each part of the diff content, applying different styles for added or removed words
    const renderContent = (val) => {
        if (Array.isArray(val)) {
            return val.map((part, idx) => {
                const className =
                    part.type === DiffType.ADDED
                        ? 'word-added'
                        : part.type === DiffType.REMOVED
                            ? 'word-removed'
                            : '';
                return (
                    <span key={idx} className={className}>
                        {part.value}
                    </span>
                );
            });
        }
        return val || '';
    };

    return (
         // Renders the table cells for the diff line:
            // - gutter: Shows line number with appropriate style based on addition/removal
            // - marker: Displays '+' for added lines, '-' for removed lines, or space for unchanged
            // - content: Shows the diff content, applying styles for added or removed words
        <>
            <Table.Cell className={`gutter ${isAdded ? 'diff-added' : ''} ${isRemoved ? 'diff-removed' : ''}`}>
                <pre className="line-number">{lineNumber || ''}</pre>
            </Table.Cell>
            <Table.Cell className={`marker ${isAdded ? 'diff-added' : ''} ${isRemoved ? 'diff-removed' : ''}`}>
                <pre>{isAdded ? '+' : isRemoved ? '-' : ' '}</pre>
            </Table.Cell>
            <Table.Cell className={`content ${isAdded ? 'diff-added' : ''} ${isRemoved ? 'diff-removed' : ''}`}>
                <pre className="content-text">{renderContent(value)}</pre>
            </Table.Cell>
        </>
    );
};
