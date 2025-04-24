// The DiffControls component provides buttons to switch between two diff view modes: 
// 'split' and 'unified'. It also includes a 'Compare' button to trigger the comparison
// of the JSON data, with visual feedback to indicate the active view mode (split or unified).


import { Group, Button } from "@chakra-ui/react"

function DiffControls({ viewMode, handleViewModeChange, handleCompare }) {
    return (
        <div className="controls">
            <Button
                className="compare-btn"
                size="xl"
                colorPalette="blue"
                variant="solid"
                onClick={handleCompare}
            >
                Compare
            </Button>
            <Group className="diff-controller" attached>
                <Button
                    className="split-btn"
                    size="xl"
                    colorPalette="blue"
                    variant={viewMode === 'split' ? 'solid' : 'outline'}
                    onClick={() => handleViewModeChange('split')}
                >
                    <svg className="icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="18" />
                        <rect x="14" y="3" width="7" height="18" />
                    </svg>
                    Split View
                </Button>
                <Button
                    className="unified-btn"
                    size="xl"
                    colorPalette="blue"
                    variant={viewMode === 'unified' ? 'solid' : 'outline'}
                    onClick={() => handleViewModeChange('unified')}
                >
                    <svg className="icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v18" />
                        <path d="M3 12h18" />
                    </svg>
                    Unified View
                </Button>
            </Group>
        </div>
    )
}


export { DiffControls };
