import React, {Component} from 'react';
import { connect } from 'react-redux';


class Home extends Component {
    render () {
        console.log(this.props);
        // const {posts} = this.props;
        // const postList = posts.length ? (
        //     posts.map(post => {
        //         return (
        //             <div className="post card" key={post.id}>
        //                 <div className="card-content">
        //                     <span className="card-title">{post.title}</span>
        //                     <p>{post.body}</p>
        //                 </div>
        //             </div>
        //         )
        //     })
        // ) : (
        //     <div className="center" >No posts yet</div>
        // );
        return (
            <div className='container'>
                <h4 className='center'>Home</h4>
                {/* {postList} */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
         posts: state.posts
    }
}

export default connect(mapStateToProps) (Home)