import React from 'react';
import { PropTypes } from 'prop-types';
import DefaultButton from '../../issueDetail/presentational/DefaultButton';
import LabelPreview from './LabelPreview';
import ColorRefreshButton from './ColorRefreshButton';
import ColorChangeInput from './ColorChangeInput';

const styles = {
  inputForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '150px',
    backgroundColor: 'lightgrey',
    padding: '15px',
  },
  createLabelButton: {
    height: '40px',
    backgroundColor: 'green',
  },
  cancelButton: {
    height: '40px',
  },
  labelNameInput: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5px',
  },
  labelDescriptionInput: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5px',
  },
  buttons: {
    margin: '10px',
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
  },
};

export default function LabelInputForm({
  labelName,
  description,
  color,
  saveText,
  onClick,
  onChangeName,
  onChangeDescription,
  onChangeColor,
  onSave,
  onCancel,
}) {
  return (
    <div css={styles.inputForm}>
      <div>
        {!labelName
          ? <LabelPreview name="Label preview" color={color} />
          : <LabelPreview name={labelName} color={color} />}
      </div>
      <div css={styles.inputs}>
        <div css={styles.labelNameInput}>
          LabeName
          <textarea value={labelName} onChange={onChangeName} />
        </div>
        <div css={styles.labelDescriptionInput}>
          Description
          <textarea value={description} onChange={onChangeDescription} />
        </div>
        <div>
          Color
          <ColorRefreshButton backgroundColor={color} onClick={onClick} />
          <ColorChangeInput value={color} onChange={onChangeColor} />
        </div>
      </div>
      <div css={styles.buttons}>
        <DefaultButton text="cancel" onClick={onCancel} extraStyle={styles.cancelButton} />
        <DefaultButton text={saveText} extraStyle={styles.createLabelButton} onClick={onSave} />
      </div>
    </div>
  );
}

LabelInputForm.propTypes = {
  labelName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  saveText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
