import React from "react";
import useAuth from "../../hooks/useAuth";
import { Grid } from "semantic-ui-react";
import Feed from "../../components/Home/Feed/Feed";
import UsersNotFolloweds from "../../components/Home/UsersNotFolloweds/UsersNotFolloweds";
function Home() {
  const { auth } = useAuth();

  return (
    <Grid className="home">
      <Grid.Column className="home__left" width={8}>
        <Feed />
      </Grid.Column>
      <Grid.Column className="home__right" width={5}>
        <UsersNotFolloweds />
      </Grid.Column>
    </Grid>
  );
}

export default Home;
