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
    width: '1100px',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    margin: '0 auto 20px auto',
    boxSizing: 'border-box',
    border: '2px solid #a6a6c2',
    borderRadius: '5px',
  },
  createLabelButton: {
    height: '40px',
    backgroundColor: 'green',
    color: 'white',
    cursor: 'pointer',
  },
  cancelButton: {
    height: '40px',
    cursor: 'pointer',
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
    margin: '8px 0 8px 25px;',
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    height: '25px',
    fontSize: '16px',
    margin: '10px 0',
    width: '200px',
    marginRight: '15px',
  },
  title: {
    fontWeight: 'bold',
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
          <span css={styles.title}>LabelName</span>
          <input
            type="text"
            value={labelName}
            onChange={onChangeName}
            css={styles.input}
          />
        </div>
        <div css={styles.labelDescriptionInput}>
          <span css={styles.title}>Description</span>
          <input
            type="text"
            value={description}
            onChange={onChangeDescription}
            css={{ ...styles.input, width: '400px' }}
          />
        </div>
        <div>
          <div css={styles.title}>Color</div>
          <ColorRefreshButton backgroundColor={color} onClick={onClick} />
          <ColorChangeInput value={color} onChange={onChangeColor} />
        </div>
        <div css={styles.buttons}>
          <br />
          <DefaultButton text="cancel" onClick={onCancel} extraStyle={styles.cancelButton} />
          <DefaultButton text={saveText} extraStyle={styles.createLabelButton} onClick={onSave} />
        </div>
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
