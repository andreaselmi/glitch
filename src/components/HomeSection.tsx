import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";

interface HomeSectionProps {
  title: string;
  subtitle: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({
  title,
  subtitle,
  children,
}) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
      padding: "0 50px",
      "& > div": {
        textAlign: "center",
      },
    },
    childrenContainer: {},
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

  const classes = useStyles();

  //TODO ridurre spazio tra le sezioni

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <Container className={classes.container} maxWidth="md">
      <Grid
        container
        data-aos={desktop ? "fade-left" : "zoom-in"}
        data-aos-delay="100"
        data-aos-duration="1000"
      >
        {children ? (
          <Grid item xs={12} lg={5} className={classes.childrenContainer}>
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
