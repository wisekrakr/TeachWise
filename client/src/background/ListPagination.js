import React from "react";
import PropTypes from "prop-types";
import { PaginationItem, PaginationLink } from "reactstrap";

const ListPagination = ({ totalObjects, objectsPerPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalObjects / objectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return <div></div>;
};

export default ListPagination;
