import React from 'react';
import { Table } from "@chakra-ui/react";
import { DiffType } from '../Diff_Fn/Char diff/constants';
import { DiffLine } from '../UiView/DiffLine';


// The UnifiedLine component is responsible for rendering a comparison row in the unified diff view.It checks the diff type of both left and right JSON lines (removed, added, or unchanged) and displays the corresponding line for each diff type. The lines are rendered as `Table.Row` components with theassociated diff content inside.

export const UnifiedLine = ({ left, right, index }) => {
    // The component accepts `left`, `right`, and `index` as props, where `left` and `right` represent the two JSON lines being compared, and `index` is the key for each row.
    const lines = [];

    // If the left side is marked as 'removed', display it.
    if (left.type === DiffType.REMOVED) {
        lines.push(
            <Table.Row key={`left-${index}`} className="line">
                <DiffLine {...left} />
            </Table.Row>
        );
    }
    // If the right side is marked as 'added', display it.
    if (right?.type === DiffType.ADDED) {
        lines.push(
            <Table.Row key={`right-${index}`} className="line">
                <DiffLine {...right} />
            </Table.Row>
        );
    }
    // If both sides are unchanged (default), display them.
    if (left.type === DiffType.DEFAULT && right?.type === DiffType.DEFAULT) {
        lines.push(
            <Table.Row key={`default-${index}`} className="line">
                <DiffLine {...left} />
            </Table.Row>
        );
    }

    return lines;
};

