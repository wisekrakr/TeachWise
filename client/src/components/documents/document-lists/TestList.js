import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Collapse, Card, CardBody } from "reactstrap";

import { getChaptersByItem } from "../../../actions/DocumentState";

const TestList = ({
  getChaptersByItem,
  item: { item },
  document: { chapters, loading }
}) => {
  const [collapseId, setCollapseId] = useState();

  const toggleCollapse = collapseId => () => {
    setCollapseId(prevState => ({
      collapseId: prevState.collapseId !== collapseId ? collapseId : ""
    }));
  };

  //   useEffect(() => {
  //     getChaptersByItem(item._id);
  //   }, [getChaptersByItem, item._id]);

  return (
    !loading && (
      <Container>
        <Container className="mt-5">
          <Card className="mt-3">
            <header onClick={toggleCollapse("collapse1")}>
              Collapsible Group Item #1
              <i
                className={
                  collapseId === "collapse1"
                    ? "fa fa-angle-down rotate-icon"
                    : "fa fa-angle-down"
                }
              />
            </header>
            <Collapse id="collapse1" isOpen={collapseId}>
              <CardBody>
                Pariatur cliche reprehenderit, enim eiusmod high life accusamus
                terry richardson ad squid. 3 wolf moon officia aute, non
                cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a
                bird on it squid single-origin coffee nulla assumenda shoreditch
                et. Nihil anim keffiyeh helvetica, craft beer labore wes
                anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                butcher vice lomo. Leggings occaecat craft beer farm-to-table,
                raw denim aesthetic synth nesciunt you probably haven&apos;t
                heard of them accusamus labore sustainable VHS.
              </CardBody>
            </Collapse>
          </Card>
        </Container>
      </Container>
    )
  );
};

TestList.prototypes = {
  getChaptersByItem: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  document: state.document,
  item: state.item
});

export default connect(mapStateToProps, { getChaptersByItem })(TestList);
