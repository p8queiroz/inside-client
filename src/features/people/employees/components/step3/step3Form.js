import React, { Component } from 'react';
import { Form, message } from 'antd';
import PropTypes from 'prop-types';

import {
  getPhone1Input,
  getPhone2Input,
  getPersonalEmailInput,
  getOfficeEmailInput,
} from './step3Entries';
import { getDecoratorManager } from './step3Decorators';
import { LABELS } from './step3Constants';
import { FORM_ITEM_LAYOUT, HORIZONTAL_FORM_LAYOUT } from '../stepFormHelper';
import StepNavigator from '../stepFormNavigator';

const FormItem = Form.Item;

class NewEmployeeStep3Form extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { form } = this.props;

    form.validateFields(error => {
      if (!error) {
        const { currentStep, maxStep } = this.props;

        if (currentStep === maxStep) {
          message.success('Dados salvos com sucesso!');
        } else {
          this.props.nextCallback();
        }
      }
    });
  }

  render() {
    const { getFieldDecorator: fieldDecorator } = this.props.form; //eslint-disable-line
    const decoratorManager = getDecoratorManager(fieldDecorator);

    return (
      <Form layout={HORIZONTAL_FORM_LAYOUT} onSubmit={this.handleOnSubmit}>
        <FormItem {...FORM_ITEM_LAYOUT} label={LABELS.PHONE_1} hasFeedback>
          {decoratorManager.phone1Decorator(getPhone1Input())}
        </FormItem>

        <FormItem {...FORM_ITEM_LAYOUT} label={LABELS.PHONE_2} hasFeedback>
          {decoratorManager.phone2Decorator(getPhone2Input())}
        </FormItem>

        <FormItem
          {...FORM_ITEM_LAYOUT}
          label={LABELS.PERSONAL_EMAIL}
          hasFeedback
        >
          {decoratorManager.personalEmailDecorator(getPersonalEmailInput())}
        </FormItem>

        <FormItem {...FORM_ITEM_LAYOUT} label={LABELS.OFFICE_EMAIL} hasFeedback>
          {decoratorManager.officeEmailDecorator(getOfficeEmailInput())}
        </FormItem>

        <StepNavigator {...this.props} submit={this.handleOnSubmit} />
      </Form>
    );
  }
}

NewEmployeeStep3Form.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  nextCallback: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  maxStep: PropTypes.number.isRequired,
};

export default Form.create()(NewEmployeeStep3Form);
