import React from "react";

//material ui
import { Typography, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface HomeSectionProps {
  title: string;
  subtitle: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",

    "& > div": {
      textAlign: "center",
    },

    marginBottom: 200,
    "@media (max-height:400px)": {
      marginBottom: 75,
    },
    [theme.breakpoints.up("lg")]: {
      marginBottom: 350,
    },
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    "& > h6": {
      paddingTop: 10,
      color: theme.palette.text.secondary,
    },
  },
}));

const HomeSection: React.FC<HomeSectionProps> = ({
  title,
  subtitle,
  children,
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="md">
      <Grid
        container
        data-aos="zoom-in"
        data-aos-delay="100"
        data-aos-duration="1000"
      >
        {children ? (
          <Grid item xs={12} lg={5}>
            {children}
          </Grid>
        ) : null}
        <Grid
          className={children ? classes.textContainer : ""}
          item
          xs={12}
          lg={children ? 7 : 12}
        >
          <Typography variant="h4" color="textPrimary">
            {title}
          </Typography>
          <Typography variant="h6" color="textPrimary">
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeSection;
