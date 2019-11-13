import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "reactstrap";
import itemContext from "../../contexts/items/itemContext";

const StudyItem = ({ item }) => {
  const context = useContext(itemContext);
  const { deleteItem } = context;

  const {
    _id,
    name,
    field_of_study,
    material,
    difficulty,
    date,
    status
  } = item;

  const onDelete = () => {
    deleteItem(_id);
  };

  return (
    <Card className="card bg-dark">
      <Link to={`/api/items/${_id}`}>
        <CardHeader
          tag="h3"
          className="item-header text-light font-weight-bolder"
        >
          {name}
        </CardHeader>{" "}
      </Link>
      <CardBody>
        <ListGroup className="mb-3">
          <ListGroupItem className="list-item">
            <i className="fas fa-clock" /> {status}
          </ListGroupItem>
          <ListGroupItem className="list-item">
            <i className="fas fa-university" /> {field_of_study}
          </ListGroupItem>
          <ListGroupItem className="list-item">
            <i className="fas fa-graduation-cap" /> {difficulty}
          </ListGroupItem>
        </ListGroup>
        <ListGroup className="mb-3">
          <h6 className="text-light">Study Material</h6>
          <ListGroupItem className="list-item">
            <i className="fas fa-book" /> {material}
          </ListGroupItem>
        </ListGroup>
        <CardFooter>
          <Button className="btn btn-danger btn-sm" onClick={onDelete}>
            Delete
          </Button>
          <Moment format="DD/MM/YYYY" className="text-light float-right">
            {date}
          </Moment>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default StudyItem;
