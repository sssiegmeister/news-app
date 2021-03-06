import React, {Component} from 'react';
import Card, {CardHeader, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import StackGrid from 'react-stack-grid';
import NewsAPI from 'newsapi';
import Typography from 'material-ui/Typography';
import Source from '../Source/Source';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

const newsapi = new NewsAPI('fa363c5ec01c43de92be1401661e3e8e');

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      sources: []
    })
  }

  getSources() {
    newsapi.v2.sources({
      category: 'technology',
      language: 'en',
      country: 'us'
    }).then(response => {
      this.setState({
        sources: response.sources
      })
    });
  }

  componentDidMount() {
    this.getSources();
  }

  componentDidUpdate(prevProps, prevState) {
    this.grid.updateLayout();
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <Redirect to='/login'/>
      );
    }
    const w = 300;
    return (
      <div>
        <StackGrid
          columnWidth={w}
          gutterWidth={20}
          gutterHeight={20}
          monitorImagesLoaded={true}
          gridRef={grid => this.grid = grid}
        >
          {this.state.sources.map((source, x) => (
              <Card key={x}>
                <CardHeader
                  title={
                    <Button onClick={() => this.props.history.push('/articles/' + source.name)}>
                      {source.name}
                    </Button>
                  }
                />
                <Typography component="p">
                  {source.description}
                </Typography>
              </Card>
          ))}
        </StackGrid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { currentUser, isFetchingCurrentUser, errorFetchingCurrentUser } = state;
  return {
    currentUser,
    isFetchingCurrentUser,
    errorFetchingCurrentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
