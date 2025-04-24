import React from 'react';
import { Table } from "@chakra-ui/react";
import { DiffLine } from '../ui-view/DiffLine';


// The SplitLine component is responsible for rendering a comparison row in the split diff view.
// It takes `left` and `right` JSON lines, passes them to `DiffLine` components with a prefix 
// ("L" for left, "R" for right) to differentiate between the two sides.

export const SplitLine = ({ left, right, index }) => (
  <Table.Row key={index} className="line">
    <DiffLine {...left} prefix="L" />
    <DiffLine {...right} prefix="R" />
  </Table.Row>
);
