import React, { useContext } from "react";
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
import itemContext from "../../contexts/itemContext";

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
    status,
    comments
  } = item;

  const onDelete = () => {
    deleteItem(_id);
  };

  const onUpdate = () => {
    console.log(_id);
  };

  return (
    <Card className="card bg-dark">
      <CardHeader tag="h3" className="text-light font-weight-bolder">
        {name}
      </CardHeader>
      <CardBody>
        <ListGroup className="mb-3">
          <ListGroupItem>
            <i className="fas fa-clock" /> {status}
          </ListGroupItem>
          <ListGroupItem>
            <i className="fas fa-university" /> {field_of_study}
          </ListGroupItem>
          <ListGroupItem>
            <i className="fas fa-graduation-cap" /> {difficulty}
          </ListGroupItem>
        </ListGroup>
        <ListGroup className="mb-3">
          <h6 className="text-light">Study Material</h6>
          <ListGroupItem>
            <i className="fas fa-book" /> {material}
          </ListGroupItem>
        </ListGroup>
        <ListGroup className="mb-3">
          <h6 className="text-light">Additional Comments</h6>
          <ListGroupItem>{comments}</ListGroupItem>
        </ListGroup>
        <CardFooter>
          <Button className="btn btn-light btn-sm" onClick={onUpdate}>
            Edit
          </Button>
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
