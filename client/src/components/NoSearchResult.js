import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";


const useStyles = {
  root: {
    maxWidth: 345,
    flexGrow: 1,
    height: '100%',
    width: '100%',
    display: 'flex',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '12px !important'
  },
};

class NoSearchResults extends React.Component {
render() {
  const { classes } = this.props;

  return (
    <Grid container item xs={12}  className="cityCard" id="emptyMessageBox">
      <Card className={`${classes.root}` + " NoSearchResult"} id="emptyMessageInner">
        <h3 className="cardTitleSearch">Your search has no results</h3>
      </Card>
    </Grid>
  );
}
}

export default withStyles(useStyles)(NoSearchResults);