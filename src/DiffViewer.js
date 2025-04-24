// The DiffViewer component compares two input values (oldValue and newValue) and displays the differences.
// It allows toggling between a unified view (side-by-side) and a split view (line-by-line), and dynamically updates
// the comparison results based on the selected view mode. It also includes controls to trigger the comparison and
// switch between view modes.


import React, { useState } from 'react';
import { computeLineInformation } from './DiffUtils';
import { Table } from "@chakra-ui/react";
import './Styles/DiffViewer.css';
import { DiffControls } from './DiffControls';
import { UnifiedLine } from './UnifiedLine';
import { SplitLine } from './SplitLine';

const DiffViewer = ({ oldValue, newValue, viewMode, handleViewModeChange }) => {
  const [lines, setLines] = useState([]);


  // Triggers the comparison between oldValue and newValue, and updates the 'lines' state with the computed results
  const handleCompare = () => {
    const result = computeLineInformation(oldValue, newValue);
    setLines(result.lineInformation);
  };

  return (
// Renders the DiffControls component, which allows the user to select the view mode and trigger the comparison

// Conditionally renders the lines based on the selected view mode (split or unified)
// If 'unified' view is selected, it renders UnifiedLine, otherwise, it renders SplitLine
    <div className="diff-wrapper">
      <DiffControls
        viewMode={viewMode}
        handleViewModeChange={handleViewModeChange}
        handleCompare={handleCompare}
      />
      <Table.Root className="diff-container" variant>
        <Table.Body>
          {lines.map((info, index) =>
            viewMode === 'unified' ? (
              <React.Fragment key={index}>
                <UnifiedLine {...info} index={index} />
              </React.Fragment>
            ) : (
              <SplitLine {...info} index={index} key={index} />
            )
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default DiffViewer;
