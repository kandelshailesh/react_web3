import React from 'react';
import { Col } from 'antd';

import { Field } from 'formik';
import { DatePicker } from 'formik-antd';
import { TextField, Select as MatSelect } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import TextField1 from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';

export const NumberFormat1 = ({ values }) => {
  return (
    <NumberFormat
      customInput={TextField1}
      // value={values.phone}
      format="+1 (###) ###-####"
      allowEmptyFormatting
      mask="_"
      name="phone"
    />
  );
};
export const generateForm = (formField, { values: formValues, setFieldValue }) => {
  return formField.map((values, index) => {
    switch (values.type) {
      case 'text':
        if (values.name === 'phone') {
          return (
            <Col key={index} xs={24} xl={12}>
              <label>{values.label}</label>
              <p>
                <Field name={values.name} placeholder="" type="text">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <NumberFormat
                        onValueChange={val => {
                          setFieldValue('phone', val.formattedValue);
                        }}
                        customInput={TextField1}
                        value={formValues.phone}
                        format="+1 (###) ###-####"
                        allowEmptyFormatting
                        mask="_"
                        name="phone"
                      />
                      {/* <input type="text" placeholder="Email" {...field} /> */}
                      {meta.touched && meta.error && <div className="errormsg">{meta.error}</div>}
                    </div>
                  )}
                </Field>
              </p>
            </Col>
          );
        } else {
          return (
            <Col key={index} xs={24} xl={12}>
              <label>{values.label}</label>
              <p>
                <Field component={TextField} name={values.name} placeholder="" type="text"></Field>
              </p>
            </Col>
          );
        }
      case 'email':
        return (
          <Col key={index} xs={24} xl={12}>
            <label>{values.label}</label>
            <p>
              <Field component={TextField} name={values.name} placeholder="" type="email"></Field>
            </p>
          </Col>
        );
      case 'password':
        return (
          <Col key={index} xs={24} xl={12}>
            <label>{values.label}</label>
            <p>
              <Field
                component={TextField}
                name={values.name}
                placeholder=""
                type="password"
                autoComplete="off"
              ></Field>
            </p>
          </Col>
        );
      case 'select':
        return (
          <Col key={index} xs={24} xl={12}>
            <label>{values.label}</label>
            <p>
              <Field component={MatSelect} name={values.name} placeholder="" type="text">
                {values.options.map((result, i) => {
                  return (
                    <MenuItem key={i} value={result.value}>
                      {result.name}
                    </MenuItem>
                  );
                })}
              </Field>
            </p>
          </Col>
        );
      case 'datepicker':
        return (
          <Col key={index} xs={24} xl={12}>
            <label>{values.label}</label>
            <p>
              <Field component={TextField} name={values.name} placeholder="" type="date"></Field>
            </p>
          </Col>
        );
    }
  });
};
