import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import DefaultButton from '../../issueDetail/presentational/DefaultButton';

const styles = {
  inputForm:{
      display:'flex',
      flexDirection:'row',
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

export default function LabelInputForm({ labelName, description,color,saveText,onClick}) {
    return(
      <div css={styles.inputForm}>
        <div css={styles.inputs}>
          <div css={styles.labelNameInput}>
            LabeName
            <textarea value={labelName}></textarea>
          </div>
          <div css={styles.labelDescriptionInput}>
            Description
            <textarea value={description}></textarea>
          </div>
        </div>
        <div css={styles.buttons}>
          <DefaultButton text='cancel' extraStyle={styles.cancelButton}></DefaultButton>
          <DefaultButton text={saveText} extraStyle={styles.createLabelButton} onClick={onClick}></DefaultButton>
        </div>
      </div>
    )
}

