import React, {Component} from 'react';
import Card, {CardHeader, CardMedia, CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';
import StackGrid from 'react-stack-grid';
import NewsAPI from 'newsapi';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import {
  save,
} from '../../redux/actions/user';
import { Redirect } from 'react-router';

const newsapi = new NewsAPI('fa363c5ec01c43de92be1401661e3e8e');

class Source extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      articles: []
    })
  }

  getStories() {
    newsapi.v2.everything({
      sources: this.props.match.params['id'],
      language: 'en',
      sortBy: 'relevancy',
      page: 2
    }).then(response => {
      this.setState({
        articles: response.articles
      })
    });
  }

  componentDidMount() {
    console.log(this.props.currentUser);
    this.getStories();
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
          {this.state.articles.map((article, x) => (
            <Card key={x}>
              <img src={article.urlToImage} width={w}/>
              <Typography gutterBottom variant="headline" component="h2">
                {article.title}
              </Typography>
              <Typography component="p">
                {article.description}
              </Typography>
              <CardActions>
                <Button size="small" color="primary" onClick={() => {
                  this.props.save(this.props.currentUser._id, article);
                }}>
                  Save
                </Button>
                <Button size="small" color="primary" onClick={() => {
                  window.location.href = article.url;
                }}>
                  Read More
                </Button>
              </CardActions>
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
    dispatch,
    save: (userId, article) => {
      dispatch(save(userId, article))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Source);
