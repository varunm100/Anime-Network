import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 319,
  },
});

export default function InfoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {props.title}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p"> */}
          {/*   this is some description */}
          {/* </Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions> */}
      {/*   <Button size="small" color="primary"> */}
      {/*     one button */}
      {/*   </Button> */}
      {/*   <Button size="small" color="primary"> */}
      {/*     second button */}
      {/*   </Button> */}
      {/* </CardActions>  */}
    </Card>
  );
}
