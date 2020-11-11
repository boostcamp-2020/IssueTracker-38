import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import DefaultButton from '../../issueDetail/presentational/DefaultButton';
import LabelPreview from '../presentational/LabelPreview';
import ColorRefreshButton from '../presentational/ColorRefreshButton';
import ColorChangeInput from '../presentational/ColorChangeInput';

const styles = {
  inputForm:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      width:'100%',
      height:'150px',
      backgroundColor:'lightgrey',
      padding:'15px',
  },
  createLabelButton: {
      height:'40px',
      backgroundColor:'green',
  },
  cancelButton:{
    height:'40px',
  },
  labelNameInput:{
      display:'flex',
      flexDirection:'column',
      margin:'5px',
  },
  labelDescriptionInput:{
      display:'flex',
      flexDirection:'column',
      margin:'5px',
  },
  buttons:{
      margin:'10px',
  },
  inputs:{
      display:'flex',
      flexDirection:'row',
  }
  }

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
}) {
    return(
      <div css={styles.inputForm}>
        <div>
          {!labelName
            ?<LabelPreview name={'Label preview'} color={color} />
            :<LabelPreview name={labelName} color={color} />}
        </div>
        <div css={styles.inputs}>
          <div css={styles.labelNameInput}>
            LabeName
            <textarea value={labelName} onChange={onChangeName}></textarea>
          </div>
          <div css={styles.labelDescriptionInput}>
            Description
            <textarea value={description} onChange={onChangeDescription}></textarea>
          </div>
          <div>
            Color
            <ColorRefreshButton backgroundColor={color} onClick={onClick}/>
            <ColorChangeInput value={color} onChange={onChangeColor}/>
          </div>
        </div>
        <div css={styles.buttons}>
          <DefaultButton text='cancel' extraStyle={styles.cancelButton}></DefaultButton>
          <DefaultButton text={saveText} extraStyle={styles.createLabelButton} onClick={onSave}></DefaultButton>
        </div>
      </div>
    )
}

