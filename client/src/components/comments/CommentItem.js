import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardSubtitle,
  CardBody,
  CardFooter,
  Spinner
} from "reactstrap";

import itemContext from "../../contexts/items/itemContext";
import { textTruncate } from "../../helpers/TextHelper";

const CommentItem = ({ item, user_comment }) => {
  const context = useContext(itemContext);
  const { deleteUserComment } = context;

  const { _id, title, comment, user, date } = user_comment;

  function onDelete(e) {
    console.log("bliep");
    e.preventDefault();
    deleteUserComment(item._id, _id);
  }

  return (
    <div className="comment" style={{ height: "100%" }}>
      <div className="comment-header">
        {textTruncate(user, 15)}
        <img
          className="custom-img"
          // src={avatar}
          alt=""
        />
      </div>
      <div className="comment-body">
        {comment.split("\n").map((text, i) => {
          return (
            <p key={i} data={text}>
              {text}
            </p>
          );
        })}
      </div>
      <Moment format="DD/MM/YYYY" className="text-dark float-left">
        {date}
      </Moment>
      <div className="comment-footer">
        <Button
          className="btn card-delete btn-sm"
          key={_id}
          onClick={deleteUserComment(item._id, _id)}
        >
          <i className="fas fa-times mr-2" />
          Delete
        </Button>
      </div>
    </div>

    // <Card className="card bg-dark comment">
    //   <Link to={`/api/profile/${user._id}`}>
    //     <CardHeader
    //       tag="h3"
    //       className="custom-header text-light font-weight-bolder"
    //     >
    //       {/* {textTruncate(user.name, 30)} */}
    //       <img
    //         className="custom-img"
    //         // src={avatar}
    //         alt=""
    //       />
    //     </CardHeader>{" "}
    //     {/* <CardSubtitle>{user.name}</CardSubtitle> */}
    //   </Link>
    //   <CardBody>
    //     <ListGroup className="mb-3">
    //       <h6 className="text-light">{textTruncate(title, 20)}</h6>
    //       <ListGroupItem className="list-item">
    //         {comment !== undefined ? (
    //           comment.split("\n").map((text, i) => {
    //             return (
    //               <p key={i} data={text}>
    //                 {text}
    //               </p>
    //             );
    //           })
    //         ) : (
    //           <Spinner
    //             color="primary"
    //             style={{ width: "3rem", height: "3rem" }}
    //           >
    //             Please wait... Loading Comment...
    //           </Spinner>
    //         )}
    //       </ListGroupItem>
    //       <ListGroupItem className="list-item comment-date">
    //         <i className="fas fa-clock mr-2" />
    //         Posted on : <Moment format="DD/MM/YYYY">{date}</Moment>
    //       </ListGroupItem>
    //     </ListGroup>

    //     <CardFooter key={_id}>
    //       <Button
    //         className="btn btn-danger btn-sm"
    //         key={_id}
    //         onClick={deleteUserComment(item._id, _id)}
    //       >
    //         <i className="fas fa-times mr-2" />
    //         Delete
    //       </Button>
    //     </CardFooter>
    //   </CardBody>
    // </Card>
  );
};

export default CommentItem;
