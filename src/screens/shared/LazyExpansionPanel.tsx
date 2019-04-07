import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type LazyExpansionPanelProps = {
  summaryText: string;
  panelDetailStyles?: React.CSSProperties;
};

export const LazyExpansionPanel: React.FunctionComponent<
  LazyExpansionPanelProps
> = ({ children, summaryText, panelDetailStyles = {} }) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <ExpansionPanel
      onChange={(_, expanded) => {
        setShowDetails(expanded);
      }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        style={{ textTransform: 'capitalize' }}
      >
        {summaryText}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={panelDetailStyles}>
        {showDetails ? children : ''}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
