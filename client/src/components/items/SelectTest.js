import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getFields } from "../../actions/FieldState";

const SelectTest = ({ getFields, field: { fields, loading } }) => {
  const fieldItems = [];
  const [field, setField] = useState({});

  useEffect(() => {
    getFields();
  }, [getFields]);

  const onChange = event => {
    console.log(event);
    //     setField({
    //       ...field,
    //       [event.target.name]: event.target.value
    //     });
  };

  const fieldGetter = () => {
    fields.map(field => {
      fieldItems.push(field.name.toString());
    });
  };
  fieldGetter();
  return (
    <form action="#">
      <div class="select-box">
        <label for="select-box1" class="label select-box1">
          <span class="label-desc">Choose your country</span>{" "}
        </label>
        <select id="select-box1" class="select">
          <option value="Choice 1">Falkland Islands</option>
          <option value="Choice 2">Germany</option>
          <option value="Choice 3">Neverland</option>
        </select>
      </div>
    </form>
  );
};

SelectTest.propTypes = {
  getFields: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  field: state.field
});

export default connect(mapStateToProps, { getFields })(SelectTest);
