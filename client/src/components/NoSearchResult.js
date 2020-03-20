import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

class NoSearchResults extends React.Component {
render() {
  const { classes } = this.props;

  return (
    <Grid container item xs={12}  className="cityCard" id="emptyMessageBox">
      <Card className="cityCardInner  NoSearchResult"  id="emptyMessageInner">
        <h3 className="cardTitleSearch">Your search has no results</h3>
      </Card>
    </Grid>
  );
}
}

export default (NoSearchResults);